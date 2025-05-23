import './Cp.css';
import React, { useState } from 'react';

const supportTopics = [
  "Order Status",
  "Vehicle Support",
  "Energy Support",
  "Account & Billing",
  "Charging",
  "Software Updates",
  "Roadside Assistance",
  "Contact Us"
];

const Cp = () => {
  const [active, setActive] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#f7fafd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 0 60px 0",
        position: "relative"
      }}
    >
      <h1
        style={{
          color: "#2196f3",
          fontSize: "2.8rem",
          fontWeight: 800,
          letterSpacing: "2px",
          marginBottom: "36px",
          marginTop: "40px",
          textAlign: "center"
        }}
        className="cp-fadein"
      >
        Customer Support
      </h1>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          alignItems: "center",
          width: "100%"
        }}
      >
        {supportTopics.map((topic, idx) => (
          <li
            key={topic}
            className={`cp-animated-item${active === idx ? " active" : ""}`}
            tabIndex={0}
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: active === idx ? "#fff" : "#2196f3",
              letterSpacing: "1.2px",
              padding: "18px 54px",
              borderRadius: "18px",
              background: active === idx ? "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)" : "#fff",
              boxShadow: active === idx ? "0 6px 32px 0 rgba(33,150,243,0.18)" : "0 2px 16px 0 rgba(33,150,243,0.08)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              border: "none",
              outline: "none",
              transition: "background 0.4s cubic-bezier(.4,0,.2,1), color 0.25s, box-shadow 0.4s cubic-bezier(.4,0,.2,1)",
              animation: `cp-slidein 0.7s cubic-bezier(.4,0,.2,1) both`,
              animationDelay: `${0.15 + idx * 0.08}s`
            }}
            onMouseEnter={() => setActive(idx)}
            onFocus={() => setActive(idx)}
            onMouseLeave={() => setActive(null)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(idx)}
          >
            <span style={{
              position: "relative",
              zIndex: 2,
              transition: "color 0.25s"
            }}>
              {topic}
            </span>
            <span className="cp-underline"></span>
            <span className="cp-ripple"></span>
          </li>
        ))}
      </ul>
      <style>{`
        .cp-fadein {
          animation: cp-fadein 1.1s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes cp-fadein {
          0% { opacity: 0; transform: translateY(-32px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes cp-slidein {
          0% { opacity: 0; transform: translateX(-48px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        .cp-animated-item {
          transition: background 0.4s cubic-bezier(.4,0,.2,1), color 0.25s, box-shadow 0.4s cubic-bezier(.4,0,.2,1);
          position: relative;
        }
        .cp-animated-item .cp-underline {
          display: block;
          position: absolute;
          left: 0;
          bottom: 8px;
          width: 0;
          height: 4px;
          background: linear-gradient(90deg, #2196f3 0%, #21cbf3 100%);
          border-radius: 2px;
          transition: width 0.35s cubic-bezier(.4,0,.2,1);
          z-index: 3;
          content: "";
        }
        .cp-animated-item:hover .cp-underline,
        .cp-animated-item:focus .cp-underline,
        .cp-animated-item.active .cp-underline {
          width: 100%;
        }
        .cp-animated-item:hover,
        .cp-animated-item:focus,
        .cp-animated-item.active {
          color: #fff !important;
          background: linear-gradient(90deg, #2196f3 0%, #21cbf3 100%) !important;
          box-shadow: 0 6px 32px 0 rgba(33,150,243,0.18) !important;
          outline: none;
        }
        /* Ripple effect */
        .cp-ripple {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          background: rgba(33,150,243,0.18);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: width 0.4s, height 0.4s, opacity 0.4s;
          opacity: 0;
          z-index: 1;
        }
        .cp-animated-item:hover .cp-ripple,
        .cp-animated-item:focus .cp-ripple,
        .cp-animated-item.active .cp-ripple {
          width: 220%;
          height: 220%;
          opacity: 1;
          transition: width 0.4s, height 0.4s, opacity 0.4s;
        }
      `}</style>
    </div>
  );
};

export default Cp;