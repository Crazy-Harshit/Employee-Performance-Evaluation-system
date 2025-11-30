import React, { useEffect, useRef } from "react";

export default function Toast({ show, onHide, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (show && ref.current) {
      ref.current.style.display = "block";
      const t = setTimeout(() => {
        ref.current.style.display = "none";
        onHide?.();
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [show, onHide]);

  return (
    <div className="toast" id="toast" ref={ref}>
      {children}
    </div>
  );
}