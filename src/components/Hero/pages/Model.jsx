import './Model.css'
import React, { useState, useEffect, useRef } from 'react';

// Example slides (replace with your own images/text as needed)
const slides = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Tesla_Model_S_%28Facelift_ab_04-2016%29_%28cropped%29.jpg",
    alt: "Tesla Model S",
    caption: "Model S"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Tesla_Model_Y_1X7A6211.jpg",
    alt: "Tesla Model Y",
    caption: "Model Y"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/92/2017_Tesla_Model_X_100D_Front.jpg",
    alt: "Tesla Model X",
    caption: "Model X"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg",
    alt: "Tesla Model 3",
    caption: "Model 3"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg",
    alt: "Tesla Cybertruck",
    caption: "Cybertruck"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Tesla_Roadster_2011.jpg",
    alt: "Tesla Roadster (1st Gen)",
    caption: "Roadster (1st Gen)"
  },
  {
    src: "https://www.tesla.com/sites/default/files/images/roadster/roadster-social.jpg",
    alt: "Tesla Roadster (2nd Gen)",
    caption: "Roadster (2nd Gen)"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Tesla_Semi_Truck.jpg",
    alt: "Tesla Semi",
    caption: "Semi"
  },
  {
    src: "https://www.tesla.com/sites/default/files/powerwall/hero/D_PW_Hero_2880x1800.jpg",
    alt: "Tesla Powerwall",
    caption: "Powerwall"
  },
  {
    src: "https://www.tesla.com/sites/default/files/megapack/megapack-hero-desktop.jpg",
    alt: "Tesla Megapack",
    caption: "Megapack"
  },
  {
    src: "https://www.tesla.com/sites/default/files/solarroof/v3/design/solar-roof_design_D.jpg",
    alt: "Tesla Solar Roof",
    caption: "Solar Roof"
  },
  {
    src: "https://www.tesla.com/sites/default/files/solarpanels/hero/solar-panels-hero-desktop.jpg",
    alt: "Tesla Solar Panels",
    caption: "Solar Panels"
  }
];

const boringSlides = [
  {
    src: "https://www.boringcompany.com/static/images/loop/loop-1.jpg",
    alt: "Boring Company Tunnel 1",
    caption: "Boring Tunnel - Las Vegas Loop"
  },
  {
    src: "https://www.boringcompany.com/static/images/loop/loop-2.jpg",
    alt: "Boring Company Tunnel 2",
    caption: "Boring Tunnel - Construction"
  },
  {
    src: "https://www.boringcompany.com/static/images/loop/loop-3.jpg",
    alt: "Boring Company Tunnel 3",
    caption: "Boring Tunnel - Interior"
  },
  {
    src: "https://www.boringcompany.com/static/images/loop/loop-4.jpg",
    alt: "Boring Company Tunnel 4",
    caption: "Boring Tunnel - Vehicles"
  }
];

const cardData = [
  {
    title: "Model S",
    description: "Luxury electric sedan with impressive range and performance.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Tesla_Model_S_%28Facelift_ab_04-2016%29_%28cropped%29.jpg",
    price: 89999
  },
  {
    title: "Model 3",
    description: "Affordable electric car with advanced technology.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg",
    price: 42999
  },
  {
    title: "Model X",
    description: "SUV with falcon wing doors and all-wheel drive.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/92/2017_Tesla_Model_X_100D_Front.jpg",
    price: 99999
  },
  {
    title: "Model Y",
    description: "Versatile electric SUV for families and adventure.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Tesla_Model_Y_1X7A6211.jpg",
    price: 53999
  },
  {
    title: "Cybertruck",
    description: "Futuristic electric pickup truck with ultra-hard exoskeleton.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg",
    price: 69999
  },
  {
    title: "Roadster",
    description: "High-performance sports car redefining speed.",
    image: "https://www.tesla.com/sites/default/files/images/roadster/roadster-social.jpg",
    price: 199999
  }
];

const Model = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const containerRef = useRef(null);
  const [boringIndex, setBoringIndex] = useState(0);
  const boringIntervalRef = useRef(null);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("tesla_cart") || "[]");
    } catch {
      return [];
    }
  });
  const [quantities, setQuantities] = useState(() =>
    cardData.reduce((acc, card) => {
      acc[card.title] = 1;
      return acc;
    }, {})
  );

  const handleAddToCart = (card) => {
    const qty = quantities[card.title] || 1;
    setCart(prev => {
      const updated = [...prev, ...Array(qty).fill(card)];
      window.localStorage.setItem("tesla_cart", JSON.stringify(updated));
      return updated;
    });
    alert(`${card.title} (${qty}) added to cart!`);
  };

  const handleRemoveFromCart = (card) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.title === card.title);
      if (idx === -1) return prev;
      const updated = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      window.localStorage.setItem("tesla_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const handleIncrease = (title) => {
    setQuantities(q => ({
      ...q,
      [title]: Math.min((q[title] || 1) + 1, 99)
    }));
  };

  const handleDecrease = (title) => {
    setQuantities(q => ({
      ...q,
      [title]: Math.max((q[title] || 1) - 1, 1)
    }));
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setIndex(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    boringIntervalRef.current = setInterval(() => {
      setBoringIndex(prev => (prev + 1) % boringSlides.length);
    }, 4500);
    return () => clearInterval(boringIntervalRef.current);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setIndex(prev => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === "ArrowRight") {
        setDirection(1);
        setIndex(prev => (prev + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Swipe navigation for touch devices
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) {
      setDirection(-1);
      setIndex(prev => (prev - 1 + slides.length) % slides.length);
    } else if (deltaX < -50) {
      setDirection(1);
      setIndex(prev => (prev + 1) % slides.length);
    }
    touchStartX.current = null;
  };

  // Smooth scroll effect for slide transitions
  // Instead of opacity, use translateX for smoothest sliding
  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        position: "relative",
        background: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
      }}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Tesla Slider - full screen */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          top: 0,
          left: 0,
          zIndex: 1,
          overflow: "hidden"
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${slides.length * 100}vw`,
            height: "100%",
            transform: `translateX(-${index * 100}vw)`,
            transition: "transform 1.2s cubic-bezier(.77,0,.18,1)",
            willChange: "transform"
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                width: "100vw",
                height: "100%",
                flexShrink: 0,
                position: "relative"
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              {/* Caption */}
              {index === i && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 60,
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "#fff",
                      fontSize: "2.2rem",
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textShadow: "0 2px 16px #000",
                      textAlign: "center",
                      zIndex: 10,
                      background: "rgba(0,0,0,0.25)",
                      borderRadius: "18px",
                      padding: "18px 36px",
                      transition: "background 0.4s cubic-bezier(.4,0,.2,1)"
                    }}
                  >
                    {slide.caption}
                  </div>
                  <button
                    style={{
                      position: "absolute",
                      top: 32,
                      right: 32,
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: 44,
                      height: 44,
                      fontSize: 22,
                      cursor: "pointer",
                      zIndex: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      transition: "background 0.3s, transform 0.25s cubic-bezier(.4,0,.2,1)",
                    }}
                    title={`More info about ${slide.caption}`}
                    onClick={e => {
                      e.stopPropagation();
                      // Animate button on click
                      const btn = e.currentTarget;
                      btn.style.transform = "scale(1.15)";
                      setTimeout(() => {
                        btn.style.transform = "scale(1)";
                      }, 180);
                      setTimeout(() => {
                        alert(`More information about ${slide.caption}`);
                      }, 220);
                    }}
                    onMouseDown={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                    onMouseUp={e => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
                  >
                    <span style={{
                      display: "block",
                      fontWeight: 700,
                      fontSize: 24,
                      transition: "color 0.3s"
                    }}>i</span>
                  </button>
                  <a
                    href="https://www.tesla.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: "absolute",
                      top: 32,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1.18rem",
                      border: "none",
                      borderRadius: "32px",
                      padding: "16px 54px",
                      cursor: "pointer",
                      boxShadow: "0 4px 32px 0 rgba(33,150,243,0.18), 0 1.5px 8px 0 rgba(33,203,243,0.10)",
                      textDecoration: "none",
                      zIndex: 20,
                      letterSpacing: "1.2px",
                      transition: "background 0.18s, box-shadow 0.18s, transform 0.15s",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
                    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" style={{marginRight: 10, verticalAlign: "middle"}}>
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Order Now
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
        {/* Navigation arrows */}
        <button
          aria-label="Previous Slide"
          onClick={() => { setDirection(-1); setIndex((index - 1 + slides.length) % slides.length); }}
          style={{
            position: "absolute",
            top: "50%",
            left: 24,
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            border: "none",
            borderRadius: "50%",
            width: 48,
            height: 48,
            color: "#fff",
            fontSize: 32,
            cursor: "pointer",
            zIndex: 20,
            outline: "none"
          }}
        >&lt;</button>
        <button
          aria-label="Next Slide"
          onClick={() => { setDirection(1); setIndex((index + 1) % slides.length); }}
          style={{
            position: "absolute",
            top: "50%",
            right: 24,
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            border: "none",
            borderRadius: "50%",
            width: 48,
            height: 48,
            color: "#fff",
            fontSize: 32,
            cursor: "pointer",
            zIndex: 20,
            outline: "none"
          }}
        >&gt;</button>
        {/* Dots */}
        <div style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 16,
          zIndex: 10
        }}>
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: index === i ? "#fff" : "rgba(255,255,255,0.4)",
                opacity: index === i ? 1 : 0.7,
                cursor: "pointer",
                border: index === i ? "3px solid #fff" : "2px solid #fff",
                boxShadow: index === i ? "0 0 8px #fff" : "none",
                transition: "all 0.2s"
              }}
            />
          ))}
        </div>
      </div>
      {/* Cards Section - now after the slider */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "36px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 48,
          marginBottom: 48,
          width: "100%",
          zIndex: 2,
          position: "relative"
        }}
      >
        {cardData.map((card, idx) => {
          const inCart = cart.some(item => item.title === card.title);
          return (
            <div
              key={card.title}
              style={{
                background: "#181818",
                borderRadius: "22px",
                boxShadow: "0 4px 32px 0 rgba(33,150,243,0.13)",
                width: 320,
                maxWidth: "90vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden",
                position: "relative",
                transition: "transform 0.22s cubic-bezier(.4,0,.2,1)",
              }}
              className="tesla-card"
            >
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderTopLeftRadius: "22px",
                  borderTopRightRadius: "22px"
                }}
              />
              <div style={{
                padding: "24px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: 1
              }}>
                <h2 style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#fff",
                  margin: 0,
                  marginBottom: "10px"
                }}>{card.title}</h2>
                <p style={{
                  fontSize: "1rem",
                  color: "#b0b0b0",
                  marginBottom: "10px"
                }}>{card.description}</p>
                <div style={{
                  fontSize: "1.1rem",
                  color: "#21cbf3",
                  fontWeight: 700,
                  marginBottom: "18px"
                }}>
                  ${card.price.toLocaleString()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <button
                    style={{
                      background: "#222",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      fontSize: 22,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginRight: 8
                    }}
                    onClick={() => handleDecrease(card.title)}
                  >-</button>
                  <span style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    minWidth: 24,
                    textAlign: "center"
                  }}>{quantities[card.title]}</span>
                  <button
                    style={{
                      background: "#2196f3",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      fontSize: 22,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginLeft: 8
                    }}
                    onClick={() => handleIncrease(card.title)}
                  >+</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {!inCart ? (
                    <button
                      style={{
                        background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "22px",
                        padding: "12px 32px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 2px 16px rgba(33,150,243,0.12)",
                        transition: "background 0.18s, box-shadow 0.18s"
                      }}
                      onClick={() => handleAddToCart(card)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      style={{
                        background: "linear-gradient(90deg, #f44336 0%, #e53935 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "22px",
                        padding: "12px 32px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 2px 16px rgba(244,67,54,0.12)",
                        transition: "background 0.18s, box-shadow 0.18s"
                      }}
                      onClick={() => handleRemoveFromCart(card)}
                    >
                      Remove from Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Cart display */}
      <div
        style={{
          position: "fixed",
          top: 32,
          right: 32,
          background: "#181818",
          color: "#fff",
          borderRadius: "18px",
          padding: "18px 32px",
          zIndex: 40,
          minWidth: 180,
          boxShadow: "0 2px 16px rgba(33,150,243,0.18)",
          fontWeight: 600,
          fontSize: "1.1rem"
        }}
      >
        <div style={{marginBottom: 8, fontWeight: 700, fontSize: "1.2rem"}}>Cart</div>
        {cart.length === 0 ? (
          <div style={{color: "#aaa"}}>No products added</div>
        ) : (
          <ul style={{padding: 0, margin: 0, listStyle: "none"}}>
            {cart.map((item, idx) => (
              <li key={idx} style={{marginBottom: 6}}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className="btn btn-light"
          style={{marginTop: 12}}
          onClick={() => window.location.href = "/viewthecart"}
        >VIEW THE CART</button>
      </div>
      {/* Back to Home Button */}
      <button
        onClick={() => window.location.href = '/'}
        style={{
          position: "fixed",
          top: 32,
          left: 32,
          background: "#f8f9fa", // Bootstrap default light/neutral background
          color: "#212529",      // Bootstrap default text color
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
  );
};

export default Model;
