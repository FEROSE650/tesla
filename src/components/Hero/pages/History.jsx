import './History.css'
import React from 'react';


const cardData = {
  title: "Tesla History",
  description: "Discover the journey of Tesla, from its founding to its innovations in electric vehicles, energy storage, and more.",
  image: "https://www.tesla.com/sites/default/files/about/images/tesla-history.jpg", // Example image
  video: "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/About-Us-Hero-Desktop-Global.mp4"
};

const History = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      background: "#111",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    }}
  >
    <div
      style={{
        width: "90vw",
        maxWidth: 900,
        height: "90vh",
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 4px 32px 0 rgba(33,150,243,0.18)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <video
        src={cardData.video}
        controls
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "50vh",
          objectFit: "cover",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px"
        }}
      />
      <div style={{
        padding: "32px",
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between"
      }}>
        <h2 style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          color: "#111",
          margin: 0,
          marginBottom: "18px"
        }}>{cardData.title}</h2>
        <p style={{
          fontSize: "1.2rem",
          color: "#333",
          marginBottom: "32px"
        }}>{cardData.description}</p>
        <button
          style={{
            background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "28px",
            padding: "16px 48px",
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 2px 16px rgba(33,150,243,0.12)",
            transition: "background 0.18s, box-shadow 0.18s"
          }}
          onClick={() => alert("Added to cart!")}
        >
          Add to Cart
        </button>
      </div>
      <button
        onClick={() => window.location.href = '/'}
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          background: "rgba(33,150,243,0.92)",
          color: "#fff",
          border: "none",
          borderRadius: "24px",
          padding: "12px 32px",
          fontWeight: 700,
          fontSize: "1.1rem",
          cursor: "pointer",
          zIndex: 30,
          boxShadow: "0 2px 16px rgba(24,24,24,0.12)",
          transition: "background 0.18s, box-shadow 0.18s"
        }}
      >
        &#8592; Back to Home
      </button>
    </div>
  </div>
);

export default History;
