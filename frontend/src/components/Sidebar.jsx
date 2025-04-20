import React from "react";
import "./Sidebar.css";

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export default function Sidebar({ selectedMonth, onChangeMonth }) {
  return (
    <aside className="sidebar">
      {months.map((m, i) => (
        <button
          key={i}
          className={
            "sidebar-month" +
            (i === selectedMonth ? " sidebar-month-active" : "")
          }
          onClick={() => onChangeMonth(i)}
        >
          {m}
        </button>
      ))}
    </aside>
  );
}
