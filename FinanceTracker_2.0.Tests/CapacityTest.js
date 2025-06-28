import http from 'k6/http';

export let options = {
    scenarios: {
        capacity: {
            executor: 'constant-arrival-rate',
            rate: 100,             
            timeUnit: '1s',
            duration: '2m',
            preAllocatedVUs: 50,   
            maxVUs: 200,
        },
    },
    thresholds: {
        'http_req_duration': ['p(95)<300'],
    },
};

export default function () {
    http.get('http://localhost:5035/api/transaction');
}
