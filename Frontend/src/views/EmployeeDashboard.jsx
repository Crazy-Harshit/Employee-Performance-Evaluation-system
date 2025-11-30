import React from "react";
import LineChart from "../components/charts/LineChart.jsx";

export default function EmployeeDashboard({ feedbackData, goals, openGoalModal, showToast }) {
  const progressGoals = [
    { title:"Learn Spring Boot", progress: .62 },
    { title:"Improve communication", progress: .45 },
    { title:"Optimize queries", progress: .78 },
    { title:"Enhance collaboration", progress: .56 },
    { title:"Refactor modules", progress: .39 },
    { title:"Automate tests", progress: .71 },
  ];

  return (
    <div className="panel" id="employeeView">
      <div className="panel-header">
        <div className="panel-title">Employee dashboard</div>
        <div className="tabs">
          <div className="tab active">Tracking</div>
          <div className="tab">Feedback history</div>
          <div className="tab">Personal goals</div>
          <div className="tab">Reports</div>
        </div>
      </div>
      <div className="panel-body">
        <div className="panel-grid" id="employeeSections">
          
          <div className="card" style={{gridColumn:"span 7"}}>
            <div className="panel-title">Performance tracking</div>
            <LineChart data={[62,68,71,66,74,78,82]} />
            <div className="hint">Live trend updates simulate weekly performance data.</div>
          </div>

          
          <div className="card" style={{gridColumn:"span 5"}}>
            <div className="panel-title">Feedback history</div>
            <div className="timeline" style={{marginTop:8}}>
              {feedbackData.map((f)=>(
                <div className="t-item card" key={f.id}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div><strong>{f.name}</strong> — {f.comments}</div>
                    <div>{"★".repeat(f.rating) + "☆".repeat(10-f.rating)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="card" style={{gridColumn:"span 6"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div className="panel-title">Personal goals</div>
              <button className="btn primary" onClick={()=>openGoalModal("John Doe")}>Add goal</button>
            </div>
            <div style={{marginTop:10, display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12}}>
              {progressGoals.map((g, idx)=>{
                const pct = Math.round(g.progress*100);
                return (
                  <div className="card" key={idx}>
                    <div className="panel-title">{g.title}</div>
                    <div style={{marginTop:8, display:"flex", alignItems:"center", gap:12}}>
                      <div className="ring" style={{"--value": `${pct}%`}}>
                        <div className="ring-inner">{pct}%</div>
                      </div>
                      <div>
                        <div className="hint">Progress ring updates as you complete tasks.</div>
                        <button className="btn" onClick={()=>showToast("Goal updated")}>Update</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          
          <div className="card" style={{gridColumn:"span 6"}}>
            <div className="panel-title">Reports</div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginTop:10}}>
              <div className="card">
                <div className="tag">Productivity</div>
                <div className="ring" style={{"--value":"72%"}}><div className="ring-inner">72%</div></div>
              </div>
              <div className="card">
                <div className="tag">Quality</div>
                <div className="ring" style={{"--value":"64%"}}><div className="ring-inner">64%</div></div>
              </div>
              <div className="card">
                <div className="tag">Collaboration</div>
                <div className="ring" style={{"--value":"81%"}}><div className="ring-inner">81%</div></div>
              </div>
            </div>
            <div className="hint">Hover rings for glow. Values are demo data; bind to your API.</div>
          </div>
        </div>
      </div>
    </div>
  );
}