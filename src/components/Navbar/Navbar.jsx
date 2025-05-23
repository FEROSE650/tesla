import './Navbar.css'
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const dragStartX = useRef(null);
  const location = useLocation();

  // Read cart from localStorage if on /model page, else empty
  const cart =
    location.pathname === "/model"
      ? JSON.parse(window.localStorage.getItem("tesla_cart") || "[]")
      : [];

  // Drag handlers for navbar
  const handleNavbarDragStart = (e) => {
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  };

  const handleNavbarDrag = (e) => {
    if (dragStartX.current === null) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    // If dragged right more than 40px, open menu
    if (clientX - dragStartX.current > 40 && !menuOpen) {
      setMenuOpen(true);
      dragStartX.current = null;
    }
  };

  const handleNavbarDragEnd = () => {
    dragStartX.current = null;
  };

  // Helper to close all dropdowns except the one being opened
  const handleDropdownToggle = (dropdownSetter, currentState) => {
    setDropdownOpen(false);
    setAboutDropdownOpen(false);
    setShopDropdownOpen(false);
    setContactDropdownOpen(false);
    dropdownSetter(!currentState);
  };

  return (
    <nav
      className="navbar new-navbar-theme"
      onMouseDown={handleNavbarDragStart}
      onMouseMove={handleNavbarDrag}
      onMouseUp={handleNavbarDragEnd}
      onTouchStart={handleNavbarDragStart}
      onTouchMove={handleNavbarDrag}
      onTouchEnd={handleNavbarDragEnd}
    >
      <div className="navbar-logo neon-glow">DOLA</div>
      <div className="navbar-icons">
        {/* Language icon */}
        <button className="navbar-icon-btn" title="Change Language">
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/159/998/non_2x/choose-or-change-language-icon-illustration-business-concept-globe-world-communication-pictogram-vector.jpg"
            alt="Language"
            className="navbar-icon-img"
            style={{ width: 22, height: 22, filter: 'invert(1)' }}
          />
        </button>
        {/* Region/Globe icon */}
        <button className="navbar-icon-btn" title="Change Region">
          <img
            src="https://media.istockphoto.com/id/1193451471/vector/map-pin-vector-glyph-icon.jpg?s=612x612&w=0&k=20&c=wuWVeHuthNAXzjOO5_VY9SUOd-6cxwpVH8VVfh6Y7Lc="
            alt="Region"
            className="navbar-icon-img"
            style={{ width: 22, height: 22, filter: 'invert(1)' }}
          />
        </button>
        {/* Create Account/User icon */}
        <button className="navbar-icon-btn" title="Create Account">
          <img
            src="https://static.vecteezy.com/system/resources/previews/045/681/489/non_2x/account-icon-symbol-design-illustration-vector.jpg"
            alt="Account"
            className="navbar-icon-img"
            style={{ width: 22, height: 22, filter: 'invert(1)' }}
          />
        </button>
        {/* Add to Cart Icon */}
        <button
          className="navbar-icon-btn"
          title="View Cart"
          style={{ position: "relative" }}
          onClick={() => {
            if (location.pathname !== "/model") {
              window.location.href = "/model";
            }
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="Cart"
            className="navbar-icon-img"
            style={{ width: 26, height: 26, filter: 'invert(1)' }}
          />
          {cart.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                background: "#21cbf3",
                color: "#111",
                borderRadius: "50%",
                width: 20,
                height: 20,
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #fff",
                zIndex: 2
              }}
            >
              {cart.length}
            </span>
          )}
        </button>
      </div>
      <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li
          onMouseEnter={() => {
            setDropdownOpen(false);
            setAboutDropdownOpen(false);
            setShopDropdownOpen(false);
            setContactDropdownOpen(false);
          }}
          onFocus={() => {
            setDropdownOpen(false);
            setAboutDropdownOpen(false);
            setShopDropdownOpen(false);
            setContactDropdownOpen(false);
          }}
        >
          <a href="#">Home</a>
        </li>
        <li
          className="dropdown"
          onMouseEnter={() => {
            setDropdownOpen(true);
            setAboutDropdownOpen(false);
            setShopDropdownOpen(false);
            setContactDropdownOpen(false);
          }}
          onFocus={() => {
            setDropdownOpen(true);
            setAboutDropdownOpen(false);
            setShopDropdownOpen(false);
            setContactDropdownOpen(false);
          }}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              handleDropdownToggle(setDropdownOpen, dropdownOpen);
            }}
          >
            Models
          </a>
          <ul
            className={`dropdown-menu animated${dropdownOpen ? ' show' : ''}${dropdownOpen && window.innerWidth <= 700 ? ' fullscreen' : ''}`}
            style={
              dropdownOpen
                ? {
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '32px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '50vh',
                    background: ' rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',

                    zIndex: 2000,
                    borderRadius: 0,
                    boxShadow: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '48px 32px',
                    overflowY: 'auto'
                  }
                : {
                    display: 'none'
                  }
            }
          >
            <li>
              <a href="/model">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Tesla_Model_S_%28Facelift_ab_04-2016%29_%28cropped%29.jpg" alt="Model S" style={{width:100, height:100, objectFit:'cover', borderRadius:'3px', marginRight:8, verticalAlign:'middle',animation:"",}} />
                ORDER NOW
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg" alt="Model 3" style={{width:100, height:100, objectFit:'cover', borderRadius:'3px', marginRight:8, verticalAlign:'middle'}} />
                Model 3
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/92/2017_Tesla_Model_X_100D_Front.jpg" alt="Model X" style={{width:100, height:100, objectFit:'cover', borderRadius:'3px', marginRight:8, verticalAlign:'middle'}} />
                Model X
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Tesla_Model_Y_1X7A6211.jpg" alt="Model Y" style={{width:100, height:100, objectFit:'cover', borderRadius:'3px', marginRight:8, verticalAlign:'middle'}} />
                Model Y
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg" alt="Cybertruck" style={{width:100, height:100, objectFit:'cover', borderRadius:'3px', marginRight:8, verticalAlign:'middle'}} />
                Cybertruck
              </a>
            </li>
            <li>
              <a href="https://www.tesla.com/compare">Compare All Models</a>
            </li>
            <li>
              <a href="https://www.tesla.com/drive">Test Drive</a>
            </li>
          </ul>
        </li>
        <li
          className="dropdown"
          onMouseEnter={() => {
            setDropdownOpen(false);
            setAboutDropdownOpen(true);
            setShopDropdownOpen(false);
            setContactDropdownOpen(false);
          }}
          onFocus={() => {
            setDropdownOpen(false);
            setAboutDropdownOpen(true);
            setShopDropdownOpen(false);
            setContactDropdownOpen(false);
          }}
          onMouseLeave={() => setAboutDropdownOpen(false)}
        >
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              handleDropdownToggle(setAboutDropdownOpen, aboutDropdownOpen);
            }}
          >
            About
          </a>
          <ul
            className={`dropdown-menu about-animated${aboutDropdownOpen ? ' show' : ''}${aboutDropdownOpen && window.innerWidth <= 700 ? ' fullscreen' : ''}`}
            style={
              aboutDropdownOpen
                ? {
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '32px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '50vh',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 2000,
                    borderRadius: 0,
                    boxShadow: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '48px 32px',
                    overflowY: 'auto'
                  }
                : {
                    display: 'none'
                  }
            }
          >
            <li>
              <a href="/history">Tesla History</a>
            </li>
            <li><a href="#">Mission & Vision</a></li>
            <li><a href="#">Leadership</a></li>
            <li><a href="#">Sustainability</a></li>
          </ul>
        </li>
        <li
          className="dropdown shop-dropdown"
          onMouseEnter={() => {
            setDropdownOpen(false);
            setAboutDropdownOpen(false);
            setShopDropdownOpen(true);
            setContactDropdownOpen(false);
          }}
          onFocus={() => {
            setDropdownOpen(false);
            setAboutDropdownOpen(false);
            setShopDropdownOpen(true);
            setContactDropdownOpen(false);
          }}
          onMouseLeave={() => setShopDropdownOpen(false)}
        >
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              handleDropdownToggle(setShopDropdownOpen, shopDropdownOpen);
            }}
          >
            discover
          </a>
          <ul className={`dropdown-menu best-animated${shopDropdownOpen ? ' show' : ''}${shopDropdownOpen && window.innerWidth <= 700 ? ' fullscreen' : ''}`}
          style={
            shopDropdownOpen
              ? {
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '32px',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '50vh',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 2000,
                  borderRadius: 0,
                  boxShadow: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '48px 32px',
                  overflowY: 'auto'
                }
              : {
                  display: 'none'
                }
                }>
            <li>
              <a href="/discover">
                <img src="https://www.spigen.com/cdn/shop/products/title_web_teslasx_ezfit_ag_01_24e79800-135f-4505-8619-8b29334ded0d.jpg?v=1696960561" alt="Accessories" style={{width:100, height:100, objectFit:'cover', borderRadius:'6px', marginRight:8, verticalAlign:'middle'}} />
                Accessories
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://www.pilotenergystorage.com/wp-content/uploads/2023/02/portable-ev-charger-for-tesla.jpg" alt="Charging" style={{width:100, height:100, objectFit:'cover', borderRadius:'6px', marginRight:8, verticalAlign:'middle'}} />
                Charging
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://superbikestore.in/cdn/shop/products/51Unx7c-z8S._AC_SL1200__1.jpg?v=1625135903" alt="Apparel" style={{width:100, height:100, objectFit:'cover', borderRadius:'6px', marginRight:8, verticalAlign:'middle'}} />
                Apparel
              </a>
            </li>
            <li>
              <a href="#">
                <img src="https://www.teslarati.com/wp-content/uploads/2018/08/Tesla-S3X-Semi-fleet-press-photo-e1548882286108.jpg" alt="Lifestyle" style={{width:100, height:100, objectFit:'cover', borderRadius:'6px', marginRight:8, verticalAlign:'middle'}} />
                Lifestyle
              </a>
            </li>
            <li>
              <a href="#">Gift Cards</a>
            </li>
            <li>
              <a href="#">Find a Store</a>
            </li>
          </ul>
        </li>
        <li
          className="dropdown"
          onMouseEnter={() => {
            setDropdownOpen(false);
            setAboutDropdownOpen(false);
            setShopDropdownOpen(false);
            setContactDropdownOpen(true);
          }}
          onFocus={() => {
            setDropdownOpen(false);
            setAboutDropdownOpen(false);
            setShopDropdownOpen(false);
            setContactDropdownOpen(true);
          }}
          onMouseLeave={() => setContactDropdownOpen(false)}
        >
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              handleDropdownToggle(setContactDropdownOpen, contactDropdownOpen);
            }}
          >
            Contact
          </a>
          <ul className={`dropdown-menu best-animated${contactDropdownOpen ? ' show' : ''}${contactDropdownOpen && window.innerWidth <= 700 ? ' fullscreen' : ''}`}
          style={
            contactDropdownOpen
              ? {
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '32px',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '50vh',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 2000,
                  borderRadius: 0,
                  boxShadow: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '48px 32px',
                  overflowY: 'auto'
                }
              : {
                  display: 'none'
                }
          }>
            <li><a href="/cp">CUSTOMER SUPPORT</a></li>
            <li><a href="#">CAREERS</a></li>
            <li><a href="#">PRESS</a></li>
            <li><a href="#">INVESTOR RELATIONS</a></li>
            <li><a href="#">PARTNERS</a></li>
          </ul>
        </li>
      </ul>
      <button className="make-yours-btn neon-btn">Make Yours</button>
    </nav>
  );
};

export default Navbar


