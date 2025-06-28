import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 20,
    duration: '10m',            
    thresholds: {
        'http_req_duration': ['avg<300', 'p(95)<500'],
        'memory_usage': ['value<500MB'], 
    },
};

export default function () {
    http.get('http://localhost:5035/api/transaction');
    sleep(2);  
}
