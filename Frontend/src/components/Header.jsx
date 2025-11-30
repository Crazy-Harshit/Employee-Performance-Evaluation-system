import React from "react";

export default function Header({ role, setRole, onSearch, onNewGoal }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="logo" aria-hidden="true"></div>
          <div>
            <div className="title">Performance Evaluation System</div>
            <div className="kbd">Manager & Employee dashboards</div>
          </div>
        </div>
        <div className="header-actions">
          <div className="segmented" role="tablist" aria-label="Role switch">
            <button
              className={role === "manager" ? "active" : ""}
              aria-selected={role === "manager"}
              onClick={() => setRole("manager")}
            >
              Manager (M)
            </button>
            <button
              className={role === "employee" ? "active" : ""}
              aria-selected={role === "employee"}
              onClick={() => setRole("employee")}
            >
              Employee (E)
            </button>
          </div>
          <button className="btn" onClick={onSearch}><span>Search (/)</span></button>
          <button className="btn primary" onClick={onNewGoal}><span>New Goal (N)</span></button>
        </div>
      </div>
    </header>
  );
}