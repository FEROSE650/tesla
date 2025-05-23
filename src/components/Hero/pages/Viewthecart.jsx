import './Viewthecart.css';

import React, { useEffect, useState } from "react";

const Viewthecart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem("tesla_cart") || "[]");
      setCart(stored);
    } catch {
      setCart([]);
    }
  }, []);

  const handleRemove = (title) => {
    const idx = cart.findIndex(item => item.title === title);
    if (idx === -1) return;
    const updated = [...cart.slice(0, idx), ...cart.slice(idx + 1)];
    setCart(updated);
    window.localStorage.setItem("tesla_cart", JSON.stringify(updated));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#181818",
      color: "#fff",
      padding: "48px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{marginBottom: 32}}>Your Cart</h1>
      {cart.length === 0 ? (
        <div style={{color: "#aaa", fontSize: "1.2rem"}}>No products in cart.</div>
      ) : (
        <ul style={{listStyle: "none", padding: 0, width: 360, maxWidth: "90vw"}}>
          {cart.map((item, idx) => (
            <li key={idx} style={{
              background: "#232526",
              borderRadius: 12,
              marginBottom: 18,
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <span>
                <strong>{item.title}</strong>
                <span style={{marginLeft: 12, color: "#21cbf3"}}>${item.price?.toLocaleString?.() ?? ""}</span>
              </span>
              <button
                style={{
                  background: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 18px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
                onClick={() => handleRemove(item.title)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        style={{
          marginTop: 32,
          background: "#2196f3",
          color: "#fff",
          border: "none",
          borderRadius: "22px",
          padding: "12px 32px",
          fontWeight: 700,
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 2px 16px rgba(33,150,243,0.12)"
        }}
        onClick={() => window.location.href = "/"}
      >
        &#8592; Back to Home
      </button>
    </div>
  );
};

export default Viewthecart;