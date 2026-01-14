import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/", label: "About Us" },
    { href: "/service", label: "Service" },
    { href: "/post", label: "Post" },
    { href: "/", label: "Portfolio" },
    { href: "/", label: "Contact Us" },
  ];

  const toggleMobileHeader = () => setIsMobileHeaderOpen(!isMobileHeaderOpen);
  const closeMobileHeader = () => setIsMobileHeaderOpen(false);

  return (
    <>
      <header className="DeskHeader container">
        <div className="mainHeader">
          <div className="logoDiv">Logo</div>
          <div className="NavLinksDiv">
            <ul className="NavUl">
              {links.map((link, index) => (
                <li key={index} className="navLinks">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="BtnDiv">
            <Link href="/dashboard" className="ConsultBtn">
              Open Dashboard
            </Link>
          </div>
          <div className="barDiv">
            <button
              type="button"
              className="BarBtn"
              onClick={toggleMobileHeader}
              aria-label="Toggle Navigation"
            >
              {isMobileHeaderOpen ? (
                /* Close Icon (X) */
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              ) : (
                /* Menu Icon (Hamburger) */
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <header className={`mobileHeader ${isMobileHeaderOpen ? "open" : ""}`}>
        <button className="cut-button" onClick={closeMobileHeader}>
          ×
        </button>
        <div className="mobileLogo">
          <p>Logo</p>
        </div>
        <div className="mobileNavDiv">
          <ul className="NavUl">
            {links.map((link, index) => (
              <li key={index} className="navLinks">
                <Link href={link.href} onClick={closeMobileHeader}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;