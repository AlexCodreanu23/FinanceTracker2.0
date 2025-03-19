import React, { useEffect, useState } from "react";
import { fetchReports } from "../services/api";

const ReportsPage = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports().then((data) => {
            console.log("Reports: ", data);
            setReports(data);
        }).catch((err) => console.error(err));
    },[]);

    return (
        <div>
            <h1>Reports</h1>
            {reports.length === 0 ? (
                <p>No reports available or the reports are loading..</p>
            ) : (
                <ul>
                    {reports.map((tx) =>(
                        <li key = {tx.id}> {tx.amountSpent} - {tx.month_year} - {tx.userId} </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default ReportsPage;