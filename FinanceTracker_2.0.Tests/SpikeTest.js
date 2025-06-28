import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    scenarios: {
        spike: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '1m', target: 10 },   
                { duration: '30s', target: 200 },
                { duration: '1m', target: 10 },   
            ],
            gracefulRampDown: '10s',
        },
    },
    thresholds: {
        'http_req_duration': ['p(95)<1000'],
        'http_req_failed': ['rate<0.1'],  
    },
};

export default function () {
    http.get('http://localhost:5035/api/transaction');
    sleep(1);
}