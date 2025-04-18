import React, { useEffect, useState } from "react";
import { fetchUserTransactions } from "../services/api";

export default function UserTransactionsPage({ user }) {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    fetchUserTransactions(user.id)
      .then(data => setTxs(data))
      .catch(err => setError(err.message || "Error loading"))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          My Transactions
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          {loading && (
            <div className="p-6 text-center text-gray-500">Loading…</div>
          )}
          {error && (
            <div className="p-6 text-center text-red-500">Error: {error}</div>
          )}
          {!loading && !error && txs.length === 0 && (
            <div className="p-6 text-center text-gray-600">
              No transactions found.
            </div>
          )}
          {!loading && !error && txs.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {txs.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right 
                      {tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}">
                      ${tx.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
