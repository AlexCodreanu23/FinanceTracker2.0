import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// 1. Definim metrica de erori
export let errorRate = new Rate('errors');

// 2. Configurarea scenariului de test
export let options = {
    vus: 50,             // 50 de utilizatori virtuali simultan
    duration: '30s',     // timp total de 30 de secunde

    thresholds: {
        // cel puțin 95% dintre cererile GET să aibă < 300ms
        'http_req_duration{endpoint:transactions_list}': ['p(95)<300'],
        // rata de erori să fie sub 1%
        'errors': ['rate<0.01'],
    },
};

const BASE_URL = 'http://localhost:5035/api'; // ajustează portul dacă e nevoie

export default function () {
    // Testăm doar GET /api/transaction
    let getResp = http.get(`${BASE_URL}/transaction`, {
        tags: { endpoint: 'transactions_list' },
    });

    let getSuccess = check(getResp, {
        'GET /transaction status 200': (r) => r.status === 200,
        'GET /transaction timp < 1000ms': (r) => r.timings.duration < 1000,
    });

    errorRate.add(getSuccess ? 0 : 1);

    // Pauză scurtă pentru a simula comportamentul unui utilizator real
    sleep(Math.random() * 2);
}
