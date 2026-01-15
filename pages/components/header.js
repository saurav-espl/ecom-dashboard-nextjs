import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

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
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                /* Menu Icon (Hamburger) */
                <FontAwesomeIcon icon={faBars} />
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