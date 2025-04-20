import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../components/DashboardPage.css";


export default function DashboardPage() {
  const [month, setMonth] = useState(new Date().getMonth());

  return (
    <div className="dashboard">
      <Sidebar
        selectedMonth={month}
        onChangeMonth={setMonth}
      />
    </div>
  );
}
