import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');
export let options = {
    vus: 50,            
    duration: '30s',    

    thresholds: {
        'http_req_duration{endpoint:transactions_list}': ['p(95)<300'],
        'errors': ['rate<0.01'],
    },
};

const BASE_URL = 'http://localhost:5035/api'; 

export default function () {
    let getResp = http.get(`${BASE_URL}/transaction`, {
        tags: { endpoint: 'transactions_list' },
    });

    let getSuccess = check(getResp, {
        'GET /transaction status 200': (r) => r.status === 200,
        'GET /transaction timp < 1000ms': (r) => r.timings.duration < 1000,
    });

    errorRate.add(getSuccess ? 0 : 1);

    sleep(Math.random() * 2);
}
