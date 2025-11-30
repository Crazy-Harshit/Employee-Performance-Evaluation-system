import React from "react";

const items = [
  { id: "sec-eval", icon: "E", label: "Performance Evaluation" },
  { id: "sec-goals", icon: "G", label: "Goal Setting" },
  { id: "sec-feedback", icon: "F", label: "Feedback Provision" },
  { id: "sec-reports", icon: "R", label: "Performance Reports" },
  { id: "sec-team", icon: "T", label: "Team Management" },
];

export default function SideNav({ activeSection, setActiveSection }) {
  return (
    <aside className="nav" id="sideNav">
      <div className="panel-header">
        <div className="panel-title">Sections</div>
        <div className="tag"><span>Quick access</span></div>
      </div>
      {items.map((i) => (
        <div
          key={i.id}
          className={`nav-item ${activeSection === i.id ? "active" : ""}`}
          onClick={() => setActiveSection(i.id)}
        >
          <div className="icon">{i.icon}</div>
          <span>{i.label}</span>
        </div>
      ))}
    </aside>
  );
}