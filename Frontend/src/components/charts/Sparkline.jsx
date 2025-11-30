import React, { useEffect, useRef } from "react";

export default function Sparkline({ points = [8,14,6,12,9,15,11] }) {
  const ref = useRef(null);

  useEffect(() => {
    const sp = ref.current;
    if (!sp) return;
    sp.innerHTML = "";
    points.forEach((v, i) => {
      const d = document.createElement("div");
      d.className = "spark-dot";
      d.style.left = `${(i/(points.length-1))*100}%`;
      d.style.bottom = `${v*3}px`;
      sp.appendChild(d);
    });
    const id = setInterval(() => {
      sp.querySelectorAll(".spark-dot").forEach((d) => {
        const base = parseInt(d.style.bottom);
        const delta = (Math.random()>.5 ? 1 : -1) * Math.round(Math.random()*2);
        d.style.bottom = Math.max(10, base + delta) + "px";
      });
    }, 1800);
    return () => clearInterval(id);
  }, [points]);

  return <div className="sparkline" ref={ref} />;
}