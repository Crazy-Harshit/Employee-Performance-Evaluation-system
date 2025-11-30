import React, { useEffect, useRef, useState } from "react";

export default function Modal({ open, title, onClose, prefill, employees = [], onSave }) {
  const backdropRef = useRef(null);
  const [employee, setEmployee] = useState(prefill.name || "");
  const [description, setDescription] = useState(prefill.desc || "");
  const [targetDate, setTargetDate] = useState(prefill.date || "");
  const [priority, setPriority] = useState(prefill.priority || "Medium");

  useEffect(() => {
    if (open && backdropRef.current) backdropRef.current.style.display = "grid";
    else if (backdropRef.current) backdropRef.current.style.display = "none";
  }, [open]);

  useEffect(() => {
    setEmployee(prefill.name || "");
    setDescription(prefill.desc || "");
    setTargetDate(prefill.date || "");
    setPriority(prefill.priority || "Medium");
  }, [prefill]);

  const onReset = () => {
    setDescription(""); setTargetDate(""); setPriority("Medium");
  };

  const handleSave = () => {
    const ok = onSave?.({ employee, description, targetDate, priority });
    if (ok) onReset();
  };

  return (
    <div className="modal-backdrop" ref={backdropRef} aria-hidden={!open}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="panel-header">
          <div id="modalTitle" className="panel-title">{title}</div>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        <div className="panel-body">
          <div style={{ display:"grid", gap:10 }}>
            <div>
              <div className="tag">Employee</div>
              <select className="select" value={employee} onChange={(e)=>setEmployee(e.target.value)}>
                <option value="">Select employee</option>
                {employees.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <div className="tag">Description</div>
              <input className="input" value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="e.g., Improve productivity by 15%" />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:10 }}>
              <div>
                <div className="tag">Target date</div>
                <input className="input" type="date" value={targetDate}
                  onChange={(e)=>setTargetDate(e.target.value)} />
              </div>
              <div>
                <div className="tag">Priority</div>
                <select className="select" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                  <option>High</option><option>Medium</option><option>Low</option>
                </select>
              </div>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:8 }}>
              <button className="btn primary" onClick={handleSave}>Save goal</button>
              <button className="btn" onClick={onReset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}