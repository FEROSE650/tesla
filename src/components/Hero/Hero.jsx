import './Hero.css'
import arrow_btn from '../../assets/arrow_btn.png'
import play_icon from '../../assets/play_icon.png'
import pause_icon from '../../assets/pause_icon.png'
import React, { useEffect, useRef, useState } from 'react'

const teslaSlides = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Tesla_Model_S_%28Facelift_ab_04-2016%29_%28cropped%29.jpg",
    alt: "Tesla Model S"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Tesla_Model_Y_1X7A6211.jpg",
    alt: "Tesla Model Y"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/92/2017_Tesla_Model_X_100D_Front.jpg",
    alt: "Tesla Model X"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg",
    alt: "Tesla Model 3"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg",
    alt: "Tesla Cybertruck"
  }
];

const multiSlides = [
  [
    {
      src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Megapack-Desktop.jpg",
      alt: "Tesla Model S"
    },
    {
      src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Solar-Roof-Desktop.png",
      alt: "Tesla Model Y"
    },
    {
      src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Powerwall-Desktop.png",
      alt: "Tesla Model X"
    }
  ],
  [
    {
      src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Solar-Panels-Desktop.png",
      alt: "Tesla Model 3"
    },
    {
      src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Model-S-Desktop.png",
      alt: "Tesla Cybertruck"
    },
    {
      src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Model-X-Desktop.png",
      alt: "Tesla Roadster"
    }
  ],
  [
    {
      src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Grid-American-Heroes.png",
      alt: "Tesla Semi"
    },
    {
      src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Grid-Compare.png",
      alt: "Tesla Powerwall"
    },
    {
      src: "https://media.kvue.com/assets/KVUE/images/cecc887c-9782-4b3d-b7e8-363677e599f0/cecc887c-9782-4b3d-b7e8-363677e599f0_1920x1080.jpg",
      alt: "Tesla Solar"
    }
  ]
];

const elonSlides = [
  {
    src: "https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg",
    alt: "Elon Musk 1"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/49/Elon_Musk_2015.jpg",
    alt: "Elon Musk 2"
  },
  {
    src: "https://media.npr.org/assets/img/2022/06/01/ap22146727679490-542a0a880e81240e8240db2a8bbbca670bd4c1c1.jpg?s=1100&c=50&f=jpeg",
    alt: "Elon Musk 3"
  }
];

const Hero = ({heroData, setHeroCount, heroCount, setPlayStatus, playStatus}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideInterval = useRef(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [dragPos, setDragPos] = useState({ x: 24, y: 24 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [multiIndexes, setMultiIndexes] = useState([0, 0, 0]);
  const multiIntervals = useRef([null, null, null]);
  const [elonIndex, setElonIndex] = useState(0);
  const elonInterval = useRef(null);
  const [navbarOpen, setNavbarOpen] = useState(false); // Add this state

  // Example: Listen for navbar open/close events (replace with your logic)
  useEffect(() => {
    // Replace with your navbar logic or prop
    const handleNavbar = (e) => {
      setNavbarOpen(e.detail === true);
    };
    window.addEventListener('tesla-navbar-toggle', handleNavbar);
    return () => window.removeEventListener('tesla-navbar-toggle', handleNavbar);
  }, []);

  // Drag handlers
  const handleDragStart = (e) => {
    setDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    dragOffset.current = {
      x: clientX - dragPos.x,
      y: clientY - dragPos.y
    };
    document.body.style.userSelect = 'none';
  };

  const handleDrag = (e) => {
    if (!dragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    setDragPos({
      x: Math.max(0, Math.min(window.innerWidth - 320, clientX - dragOffset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - 320, clientY - dragOffset.current.y))
    });
  };

  const handleDragEnd = () => {
    setDragging(false);
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('touchend', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
    // eslint-disable-next-line
  }, [dragging]);

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % teslaSlides.length);
    }, 3500);
    return () => clearInterval(slideInterval.current);
  }, []);

  useEffect(() => {
    multiIntervals.current.forEach((interval, idx) => {
      if (interval) clearInterval(interval);
      multiIntervals.current[idx] = setInterval(() => {
        setMultiIndexes(prev => {
          const updated = [...prev];
          updated[idx] = (updated[idx] + 1) % multiSlides[idx].length;
          return updated;
        });
      }, 3000 + idx * 500);
    });
    return () => {
      multiIntervals.current.forEach(interval => clearInterval(interval));
    };
  }, []);

  useEffect(() => {
    elonInterval.current = setInterval(() => {
      setElonIndex(prev => (prev + 1) % elonSlides.length);
    }, 4000);
    return () => clearInterval(elonInterval.current);
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { from: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { from: 'bot', text: "Thank you for your message. We'll get back to you soon!" }
      ]);
    }, 800);
  };

  return (
    <div className="container-fluid hero" style={{ minHeight: "100vh", width: "100vw", boxSizing: "border-box", padding: 0 }}>
      <div className="hero-text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      {/* Centered action buttons */}
      <div className="hero-center-actions">
        <a
          href="https://www.tesla.com/model3/design"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-action-btn order-btn"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          Order Now
        </a>
        <a
          href="https://www.tesla.com/model3"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-action-btn learn-btn"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          Learn More
        </a>
        <a
          href="https://www.youtube.com/watch?v=ycPr5-27vSI"
          target="_blank"
          rel="noopener noreferrer"
          className="ceo-voice-btn"
          style={{
            background: "linear-gradient(red, 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "28px",
            padding: "16px 36px",
            marginLeft: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 16px rgba(24,24,24,0.12)",
            transition: "transform 0.18s, box-shadow 0.18s",
            textDecoration: "none",
            display: "inline-block"
          }}
        >
          OTHERS
        </a>
      </div>
      <div className="hero-explore" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <p>MAKE THE FUTURE</p>
          {/* See the video button (also shown here) */}
          {!navbarOpen && (
            <div className="hero-play" style={{ flexDirection: "row", alignItems: "center" }}>
              <img
                onClick={() => setPlayStatus(!playStatus)}
                src={playStatus ? pause_icon : play_icon}
                alt=""
                style={{ marginRight: 8, cursor: "pointer" }}
              />
              <span style={{ margin: 0, fontSize: "1rem" }}>see the video</span>
            </div>
          )}
        </div>
        <img src={arrow_btn} alt=""/>
      </div>
      <div className="hero-dot-play">
        <ul className='hero-dots'>
          <li onClick={()=>setHeroCount(0)} className={heroCount===0 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={()=>setHeroCount(1)} className={heroCount===1 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={()=>setHeroCount(2)} className={heroCount===2 ? "hero-dot orange" : "hero-dot"}></li>
        </ul>
        {/* Removed hero-play from here */}
      </div>
      <div className="tesla-slider">
        <img
          src={teslaSlides[slideIndex].src}
          alt={teslaSlides[slideIndex].alt}
          className="tesla-slide-img"
        />
        <div className="tesla-slider-dots">
          {teslaSlides.map((slide, idx) => (
            <span
              key={idx}
              className={`tesla-slider-dot${slideIndex === idx ? " active" : ""}`}
              onClick={() => setSlideIndex(idx)}
            ></span>
          ))}
        </div>
      </div>
      <img
        className='hero-logo'
        src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Supercharger-Map-Fallback-Desktop.jpg"
        width="1281"
        height="750"
        alt=""
      />
      <div className="hero-map-container animate-on-scroll" style={{ width: "100%", minHeight: 350, marginTop: 32 }}>
        <iframe
          title="Tesla Google Map"
          src="https://maps.google.com/maps?q=Tesla&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "16px", minHeight: "350px", width: "100%", display: "block" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      {/* Music player at the bottom, above terms and credit */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", margin: "12px 0 0 0" }}>
        <audio
          id="tesla-music-audio"
          controls
          style={{ width: 320, background: "#232526", borderRadius: 8 }}
        >
          <source src="" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="schedule-drive-container" style={{ position: "relative" }}>
        <div
          className="chatbot-container"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '100%',
            transform: 'translateX(-50%)',
            marginBottom: 16,
            zIndex: 9999,
            cursor: dragging ? 'grabbing' : 'grab',
            width: 320,
            minWidth: 260,
            maxWidth: 380,
            minHeight: 180,
            height: 'auto'
            // removed background override
          }}
        >
          <div
            className="chatbot-header"
            style={{ cursor: 'grab', fontSize: "1.08rem", padding: "14px" }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            Tesla Assistant
          </div>
          <div className="chatbot-messages" style={{ padding: "12px", maxHeight: 140, fontSize: "1rem" }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.from === 'bot' ? 'bot' : 'user'}`}
                style={{ padding: "10px 16px", borderRadius: "12px", fontSize: "1rem" }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form
            className="chatbot-input-row"
            style={{ padding: "10px", gap: "8px" }}
            onSubmit={handleChatSubmit}
          >
            <input
              className="chatbot-input"
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              autoComplete="off"
              style={{ padding: "10px 12px", fontSize: "1rem" }}
            />
            <button className="chatbot-send-btn" type="submit" disabled={!chatInput.trim()} style={{ padding: "0 18px", fontSize: "1rem" }}>Send</button>
          </form>
        </div>
        <button className="schedule-drive-btn">
          Schedule a Drive Today
        </button>
      </div>
      <div className="tesla-multi-slider-row">
        {multiSlides.map((slides, sliderIdx) => (
          <div className="tesla-multi-slider" key={sliderIdx}>
            <img
              src={slides[multiIndexes[sliderIdx]].src}
              alt={
                slides[multiIndexes[sliderIdx]].alt +
                ". Tesla product displayed in a clean, modern setting, highlighting advanced technology and sustainability"
              }
              className="tesla-multi-slide-img"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div className="tesla-multi-slider-dots">
              {slides.map((slide, idx) => (
                <span
                  key={idx}
                  className={`tesla-multi-slider-dot${multiIndexes[sliderIdx] === idx ? " active" : ""}`}
                  onClick={() =>
                    setMultiIndexes(prev => {
                      const updated = [...prev];
                      updated[sliderIdx] = idx;
                      return updated;
                    })
                  }
                ></span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Elon Musk slider */}
      <div className="elon-slider-row">
        <div className="elon-slider">
          <img
            src={elonSlides[elonIndex].src}
            alt={
              elonSlides[elonIndex].alt +
              ". Elon Musk smiling or speaking at a public event, background suggests a professional or conference environment, mood is innovative and inspiring"
            }
            className="elon-slide-img"
            style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "10px" }}
          />
          <div className="elon-slider-dots">
            {elonSlides.map((slide, idx) => (
              <span
                key={idx}
                className={`elon-slider-dot${elonIndex === idx ? " active" : ""}`}
                onClick={() => setElonIndex(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-acc" style={{ marginTop: 24 }}>
        <u>TERMS AND CONDITION</u>
      </div>
      <div className="hero-acc" style={{ marginTop: 8 }}>
        For Long-Range Rear-Wheel Drive models with 19 inch wheels.
      </div>
      <footer className="post-credit">
        Designed &amp; Developed by <strong>THE UNKNOWN GUY</strong> &copy; {new Date().getFullYear()}
        <div className="social-links">
          <a href="https://twitter.com/tesla" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter logo, link to Tesla Twitter profile" style={{width:24, height:24, margin:'0 8px', filter:'invert(1)'}} />
          </a>
          <a href="https://facebook.com/TeslaMotors" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook logo, link to Tesla Facebook page" style={{width:24, height:24, margin:'0 8px', filter:'invert(1)'}} />
          </a>
          <a href="https://instagram.com/teslamotors" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram logo, link to Tesla Instagram profile" style={{width:24, height:24, margin:'0 8px', filter:'invert(1)'}} />
          </a>
          <a href="https://www.youtube.com/user/TeslaMotors" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg" alt="YouTube logo, link to Tesla YouTube channel" style={{width:24, height:24, margin:'0 8px', filter:'invert(1)'}} />
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "60px", marginTop: "24px" }}>
          <div className="card" style={{width: "30rem"}}>
            <img src="https://www.financialexpress.com/wp-content/uploads/2024/04/Tesla-Reuters.jpg" className="card-img-top" alt="Tesla promotional card, content not specified" />
          </div>
          <div style={{ marginBottom: "30px", marginTop: "300px" }}>
            <div className="card2" style={{width: "30rem"}}>
              <img src="https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/7fb18c90d03def716b8014f04b58345d.jpg" className="card-img-top" alt="Tesla promotional card, content not specified" />
            </div>
          </div>
        </div>
      </footer>
      <div className="federal-credit-info">
        Before the Federal Tax Credit, Model Y Long Range Rear-Wheel Drive starts at 46630 dollars. Price includes Destination and Order Fees but exclude taxes and other fees. Subject to change. Vehicle shown has upgrades that will increase the price. The 7500 dollar Federal Tax Credit is available to eligible buyers and subject to MSRP caps. Not all vehicles, customers or finance options will be eligible. Before the Federal Tax Credit, Model Y Long Range Rear-Wheel Drive starts at 46630 dollars. Price includes Destination and Order Fees but exclude taxes and other fees. Subject to change. Vehicle shown has upgrades that will increase the price. The 7500 dollar Federal Tax Credit is available to eligible buyers and subject to MSRP caps. Not all vehicles, customers or finance options will be eligible.
      </div>
      <div className="hero-bottom-info">
        Tesla © 2025<br />
        Privacy & Legal<br />
        Vehicle Recalls<br />
        Contact<br />
        News<br />
        Get Updates<br />
        Locations<br />
        Learn
      </div>
    </div>
  )
}

export default Hero