import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./ProfileDropdown";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  // We use a fallback here: if isSidebarOpen is null/undefined, default to faBars
  const toggleIcon = isSidebarOpen ? faTimes : faBars;

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="TopHeader">
      <div className="container-fluid">
        <div className="HeaderRow">
          <div className="HeaderCol">
            <div className="sidebarToggle" onClick={toggleSidebar}>
              {/* FIX: Added a check to ensure toggleIcon exists before rendering */}
              {toggleIcon && (
                <FontAwesomeIcon
                  width={15}
                  title="Toggle Menu"
                  color="#fff"
                  icon={toggleIcon}
                />
              )}
            </div>
            <div className="LinkDiv">
              <ul className="NavUl">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="SearchDiv">
              <input type="search" placeholder="Search here...." />
              <button type="button" className="search">
                {/* Fixed static icon check */}
                <FontAwesomeIcon width={15} icon={faSearch || "search"} />
              </button>
            </div>
            <div className="UserDiv">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;