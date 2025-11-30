import React, { useMemo, useState } from "react";
import BarChart from "../components/charts/BarChart.jsx";
import Sparkline from "../components/charts/Sparkline.jsx";

export default function ManagerDashboard({
  evalData, setEvalData,
  feedbackData, setFeedbackData,
  goals, setGoals,
  memberData, roleData,
  openGoalModal, showToast,
  assignRole,
  activeSection, setActiveSection,
  addEvaluation, updateFeedback,
  createUser, createManager, createEmployee,
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDept, setNewDept] = useState("General");
  const [newRole, setNewRole] = useState("employee");

  const filteredEval = useMemo(() => {
    const f = evalData.filter(x =>
      x.name.toLowerCase().includes(search.toLowerCase()) ||
      x.criteria.toLowerCase().includes(search.toLowerCase()));
    const sorted = [...f].sort((a,b)=>{
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "criteria") return a.criteria.localeCompare(b.criteria);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
    return sorted;
  }, [evalData, search, sortBy]);

  const sections = {
    "sec-eval": (
      <div className="card" style={{gridColumn:"span 12"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
          <div className="panel-title">Performance evaluation</div>
          <div style={{display:"flex", gap:8}}>
            <input className="input" id="evalSearch" placeholder="Search employee or criteria…" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <select className="select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="name">Sort by name</option>
              <option value="rating">Sort by rating</option>
              <option value="criteria">Sort by criteria</option>
            </select>
          </div>
        </div>
        <table aria-label="Evaluation table">
          <thead>
            <tr><th>#</th><th>Employee</th><th>Criteria</th><th>Rating</th><th>Actions</th></tr>
          </thead>
          <tbody>
          {filteredEval.map((row, idx)=>(
            <tr key={row.id}
              onMouseEnter={(e)=> e.currentTarget.style.transform="scale(1.005)"}
              onMouseLeave={(e)=> e.currentTarget.style.transform="scale(1)"}
            >
              <td>{idx+1}</td>
              <td><span className="avatar" title={row.name}>{row.name.split(" ").map(x=>x[0]).join("")}</span>{row.name}</td>
              <td>{row.criteria}</td>
              <td><strong>{row.rating}/10</strong></td>
              <td>
                <button className="btn" onClick={()=>{
                  openGoalModal(row.name, `Improve ${row.criteria.toLowerCase()} by 10%`);
                }}>Evaluate</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="hint">Tip: Hover a row to preview details. Click “Evaluate” to open the evaluator modal.</div>
      </div>
    ),
    "sec-goals": (
      <div className="card" style={{gridColumn:"span 6"}}>
        <div className="panel-title">Goal setting</div>
        <div style={{display:"flex", gap:12, marginTop:8}}>
          <button className="btn primary" onClick={()=>openGoalModal()}>Set new goal</button>
          <div className="tag">Active goals</div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:12, marginTop:12}}>
          {goals.map((goal)=>(
            <div className="card" key={goal.id}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div className="panel-title">{goal.description || goal.title}</div>
                <span className="role-pill">{goal.priority}</span>
              </div>
              <div className="hint">Target: {goal.targetDate || goal.date}</div>
              <Sparkline points={[8,12,7,11,9,14,12]} />
              <div style={{display:"flex", gap:8, marginTop:8}}>
                <button className="btn" onClick={()=>openGoalModal(goal.employee, goal.description, goal.targetDate, goal.priority)}>Edit</button>
                <button className="btn" onClick={async ()=>{
                  await api.deleteGoal(goal.id);
                  const updated = await api.getGoals();
                  setGoals(updated);
                  showToast("Goal deleted");
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    "sec-feedback": (
      <div className="card" style={{gridColumn:"span 6"}}>
        <div className="panel-title">Feedback provision</div>
        <table aria-label="Feedback table" style={{marginTop:8}}>
          <thead>
            <tr><th>#</th><th>Employee</th><th>Comments</th><th>Rating</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {feedbackData.map((row, idx)=>(
              <tr key={row.id}>
                <td>{idx+1}</td>
                <td>{row.name}</td>
                <td className="comment" style={{cursor:"pointer"}}
                  onClick={(e)=> e.currentTarget.style.whiteSpace = e.currentTarget.style.whiteSpace==="normal" ? "nowrap" : "normal"}>
                  {row.comments}
                </td>
                <td>{ "★".repeat(row.rating) + "☆".repeat(10-row.rating) }</td>
                <td>
                  <button className="btn" onClick={()=>openGoalModal(row.name, "Follow-up improvement plan")}>Plan</button>
                  <button className="btn" onClick={async ()=>{
                    await updateFeedback(row.id, { rating: Math.min(10, row.rating+1) });
                  }}>+ Star</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="hint">Click on a comment to expand. Use stars to set rating quickly.</div>
      </div>
    ),
    "sec-reports": (
      <div className="card" style={{gridColumn:"span 7"}}>
        <div className="panel-title">Performance reports</div>
        <BarChart values={[40,60,70,80,100,120,90]} />
        <div style={{marginTop:10}}>
          <Sparkline points={[8,14,6,12,9,15,11]} />
        </div>
        <div style={{display:"flex", gap:8, marginTop:12}}>
          <button className="btn">View reports</button>
          <div className="tag">Auto-refresh</div>
        </div>
      </div>
    ),
    "sec-team": (
      <div className="card" style={{gridColumn:"span 5"}}>
        <div className="panel-title">Team management</div>
        <div style={{display:"flex", gap:12, marginTop:8}}>
          <input placeholder="Full name" value={newName} onChange={(e)=>setNewName(e.target.value)} className="input" />
          <input placeholder="Email" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} className="input" />
          <select value={newDept} onChange={(e)=>setNewDept(e.target.value)} className="select">
            <option>Engineering</option><option>Design</option><option>Marketing</option><option>HR</option><option>Sales</option><option>General</option>
          </select>
          <select value={newRole} onChange={(e)=>setNewRole(e.target.value)} className="select">
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
          <button className="btn" onClick={async ()=>{
            if (!newName.trim()) return showToast('Please enter a name');
            await createUser({ name: newName, email: newEmail, department: newDept, role: newRole });
            setNewName(''); setNewEmail(''); setNewDept('General'); setNewRole('employee');
          }}>Add</button>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:12}}>
          <div>
            <div className="tag">Members</div>
            <div id="teamMembers" style={{marginTop:10, display:"grid", gap:10}}>
              {memberData.map((m)=>(
                <div className="card" key={m.id}
                  onDragStart={(e)=> e.dataTransfer.setData("text/plain", m.id)}
                >
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                    <span className="avatar">{m.initials}</span>
                    <div>
                      <div style={{fontWeight:700}}>{m.name}</div>
                      <div className="hint">Drag to assign role</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="tag">Roles</div>
              <div id="teamRoles" style={{marginTop:10, display:"grid", gap:10}}>
              {roleData.map((r)=>(
                <div className="card" key={r.id}
                  onDragOver={(e)=> e.preventDefault()}
                  onDrop={async (e)=>{
                    const id = +e.dataTransfer.getData("text/plain");
                    await assignRole(id, r.label);
                    const tag = e.currentTarget.querySelector(".assigned");
                    const count = parseInt(tag.dataset.count || "0", 10) + 1;
                    tag.dataset.count = String(count);
                    tag.textContent = `${count} assigned`;
                  }}
                >
                  <div style={{display:"flex", alignItems:"center", gap:10, justifyContent:"space-between"}}>
                    <div><span className="role-pill">{r.label}</span></div>
                    <div className="tag assigned" data-count="0">0 assigned</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="panel" id="managerView">
      <div className="panel-header">
        <div className="panel-title">Manager dashboard</div>
        <div className="tabs">
          {["sec-eval","sec-goals","sec-feedback","sec-reports","sec-team"].map((id)=>(
            <div key={id}
              className={`tab ${activeSection===id ? "active":""}`}
              onClick={()=>setActiveSection(id)}
            >
              {id.replace("sec-","").replace(/^\w/, c=>c.toUpperCase())}
            </div>
          ))}
        </div>
      </div>

      <div className="panel-body">
        <div className="panel-grid" id="managerSections">
          {Object.entries(sections).map(([id, node])=>(
            <React.Fragment key={id}>
              {activeSection===id ? node : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}