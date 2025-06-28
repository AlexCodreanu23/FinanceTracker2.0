import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    scenarios: {
        stress: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 50 },   
                { duration: '30s', target: 100 }, 
                { duration: '30s', target: 150 }, 
                { duration: '30s', target: 0 },  
            ],
            gracefulRampDown: '10s',
        },
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],
        'http_req_failed': ['rate<0.05'], 
    },
};

export default function () {
    let res = http.get('http://localhost:5035/api/transaction');
    check(res, { 'status 200': (r) => r.status === 200 });
    sleep(0.5);
}
