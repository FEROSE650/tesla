import React from 'react';

const discoverItems = [
  "Resources",
  "Demo Drive",
  "Insurance",
  "American Heroes",
  "Learn",
  "Video Guides",
  "Customer Stories",
  "Events",
  "Workshops"
];

const Discover = () => (
  <div
    style={{
      minHeight: "100vh",
      width: "100vw",
      background: "#fff",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "column",
      paddingLeft: "8vw",
      position: "relative",
      overflow: "hidden"
    }}
  >
    {/* Animated background gradient */}
    <div className="discover-bg-anim" />
    <div
      style={{
        marginTop: "40px",
        marginBottom: "40px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "18px"
      }}
    >
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "#2196f3", marginBottom: "8px" }}>
        Location Services
      </div>
      <div style={{ fontSize: "1.4rem", fontWeight: 600, color: "#222" }}>
        Find Us
      </div>
      <div style={{ fontSize: "1.4rem", fontWeight: 600, color: "#222" }}>
        Find a Collision Center
      </div>
      <div style={{ fontSize: "1.4rem", fontWeight: 600, color: "#222" }}>
        Find a Certified Installer
      </div>
    </div>
    <h1
      style={{
        color: "black",
        fontSize: "3rem",
        fontWeight: 800,
        letterSpacing: "2px",
        marginBottom: "40px",
        textAlign: "left",
        width: "100%"
      }}
      className="discover-fadein"
    >
      Resources
    </h1>
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "flex-start"
      }}
    >
      {discoverItems.map((item, idx) => (
        <li
          key={item}
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "black",
            letterSpacing: "1.5px",
            padding: "18px 48px",
            borderRadius: "18px",
            background: "transparent",
            boxShadow: "none",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s cubic-bezier(.4,0,.2,1), color 0.25s",
            animation: `discover-slidein 0.7s cubic-bezier(.4,0,.2,1) both`,
            animationDelay: `${0.15 + idx * 0.07}s`
          }}
          className="discover-underline-item"
          tabIndex={0}
        >
          <span
            style={{
              position: "relative",
              zIndex: 2,
              transition: "color 0.25s"
            }}
          >
            {item}
            <span className="discover-underline"></span>
          </span>
          {/* Animated ripple effect on hover */}
          <span className="discover-ripple"></span>
        </li>
      ))}
    </ul>
    <style>{`
      .discover-bg-anim {
        position: fixed;
        top: -30vh;
        left: -30vw;
        width: 160vw;
        height: 160vh;
        z-index: 0;
        pointer-events: none;
        background: radial-gradient(circle at 30% 30%, #2196f3 0%, #fff 60%, #fff 100%);
        opacity: 0.12;
        animation: discover-bg-move 12s linear infinite alternate;
      }
      @keyframes discover-bg-move {
        0% { background-position: 30% 30%; }
        100% { background-position: 70% 70%; }
      }
      .discover-fadein {
        animation: discover-fadein 1.1s cubic-bezier(.4,0,.2,1) both;
      }
      @keyframes discover-fadein {
        0% { opacity: 0; transform: translateY(-32px);}
        100% { opacity: 1; transform: translateY(0);}
      }
      @keyframes discover-slidein {
        0% { opacity: 0; transform: translateX(-48px);}
        100% { opacity: 1; transform: translateX(0);}
      }
      .discover-underline-item {
        transition: background 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s cubic-bezier(.4,0,.2,1), color 0.25s;
        background: transparent !important;
        box-shadow: none !important;
        position: relative;
        overflow: visible;
      }
      .discover-underline {
        display: block;
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 0;
        height: 4px;
        background: linear-gradient(90deg, #2196f3 0%, #21cbf3 100%);
        border-radius: 2px;
        transition: width 0.35s cubic-bezier(.4,0,.2,1);
        z-index: 3;
        content: "";
      }
      .discover-underline-item:hover .discover-underline,
      .discover-underline-item:focus .discover-underline {
        width: 100%;
      }
      .discover-underline-item:hover,
      .discover-underline-item:focus {
        color: #21cbf3;
        box-shadow: 0 6px 32px 0 rgba(33,150,243,0.18);
        background: rgba(33,150,243,0.08);
        outline: none;
      }
      /* Ripple effect */
      .discover-ripple {
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
      .discover-underline-item:hover .discover-ripple,
      .discover-underline-item:focus .discover-ripple {
        width: 220%;
        height: 220%;
        opacity: 1;
        transition: width 0.4s, height 0.4s, opacity 0.4s;
      }
    `}</style>
  </div>
);

export default Discover;
