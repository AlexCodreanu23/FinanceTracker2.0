import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');
const BASE_URL = __ENV.BASE_URL || 'http://localhost:5035/api';

export let options = {
    scenarios: {
        ramping: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '15s', target: 20 },
                { duration: '30s', target: 50 },
                { duration: '15s', target: 0 },
            ],
            gracefulRampDown: '5s',
        },
    },
    thresholds: {
        'http_req_duration{endpoint:transactions_list}': ['p(90)<200', 'p(95)<300', 'p(99)<500'],
        'errors': ['rate<0.005'],
        'http_reqs': ['rate>30'],
    },
};

export default function () {
    group('Transactions list', () => {
        let res = http.get(`${BASE_URL}/transaction`, {
            tags: { endpoint: 'transactions_list' },
        });

        let ok = check(res, {
            'status 200': (r) => r.status === 200,
            'durata < 1000ms': (r) => r.timings.duration < 1000,
        });

        errorRate.add(ok ? 0 : 1);
    });


    sleep(Math.random() * 2);
}