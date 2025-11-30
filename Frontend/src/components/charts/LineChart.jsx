import React, { useEffect, useRef } from "react";

export default function LineChart({ data = [62,68,71,66,74,78,82], width = 800, height = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle = "rgba(255,255,255,.18)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40,20); ctx.lineTo(40,H-30); ctx.lineTo(W-20,H-30); ctx.stroke();

    const stepX = (W-80)/(data.length-1);
    ctx.strokeStyle = "#7c5cff";
    ctx.lineWidth = 2.5; ctx.beginPath();
    data.forEach((v,i)=>{
      const x = 40 + i*stepX, y = (H-30) - (v/100)*(H-60);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      ctx.fillStyle = "#ff7a59";
      ctx.shadowColor = "rgba(255,122,89,.45)"; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(x,y,3.2,0,Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.stroke();
  }, [data]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ marginTop:8, width:"100%" }} />;
}