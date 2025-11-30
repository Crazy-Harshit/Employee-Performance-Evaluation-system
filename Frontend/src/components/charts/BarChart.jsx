import React, { useEffect, useRef } from "react";

export default function BarChart({ values = [40, 60, 70, 80, 100, 120, 90] }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    const gap = 12; const w = 36;
    values.forEach((h, i) => {
      const b = document.createElement("div");
      b.className = "bar";
      b.style.left = `${i*(w+gap)}px`;
      b.style.height = `${h}px`;
      el.appendChild(b);
    });
    const id = setInterval(() => {
      el.querySelectorAll(".bar").forEach((b) => {
        const h = parseInt(b.style.height);
        const delta = (Math.random() > .5 ? 1 : -1) * Math.round(Math.random()*6);
        b.style.height = Math.max(60, h + delta) + "px";
      });
    }, 1800);
    return () => clearInterval(id);
  }, [values]);

  return <div className="chart" ref={ref} />;
}