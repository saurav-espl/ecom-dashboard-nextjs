import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  faDashboard,
  faContactBook,
  faCartShopping,
  faCartArrowDown,
  faTimes,
  faRightFromBracket,
  faGear,
  faBookOpenReader,
  faQuestion,
  faUser,
  faUsersBetweenLines,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";

const SideHeader = ({ isOpen, handleCloseSidebar, currentPage }) => {
  const sidebarLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: faDashboard,
    },
    {
      href: "/dashboard/order",
      label: "Orders",
      icon: faContactBook,
    },
    {
      href: "/",
      label: "Products",
      icon: faCartShopping,
      sublinks: [
        { href: "/dashboard/all-products", label: "All Products" },
        { href: "/dashboard/add-products", label: "Add Products" },
        { href: "/dashboard/edit-products", label: "Edit Products" },
      ],
    },
    {
      href: "/",
      label: "Categories",
      icon: faCartArrowDown,
      sublinks: [
        { href: "/dashboard/all-categories", label: "All Categories" },
        { href: "/dashboard/add-categories", label: "Add Categories" },
        { href: "/dashboard/edit-categories", label: "Edit Categories" },
      ],
    },
    { href: "/dashboard/billing", label: "Billing", icon: faMoneyBill1Wave },
    { href: "/dashboard/customer", label: "Customers", icon: faUsersBetweenLines },
  ];

  const AccountLinks = [
    { href: "/dashboard/my-account", label: "My Account", icon: faUser },
    { href: "/dashboard/help", label: "Get Help", icon: faQuestion },
    { href: "/dashboard/report", label: "Report", icon: faBookOpenReader },
  ];

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/dashboard/login");
    } catch (err) {
      console.error("Logout failed");
    }
  };
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const index = sidebarLinks.findIndex(link => link.sublinks && link.sublinks.some(sublink => sublink.href === currentPage));
    if (index !== -1) {
      setActiveDropdown(index);
    }
  }, [currentPage]);

  const handleSublinksToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo">
        <Link href="/">Your Logo</Link>
        <button
          className="close-button"
          width="15"
          onClick={handleCloseSidebar}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <nav>
        <h3 style={{ color: "#fff" }}>Main Menu</h3>
        <ul>
          {sidebarLinks.map((link, index) => (
            <li key={index} className="nav-item">
              {link.sublinks ? (
                <div className="dropdown">
                  <a
                    href="#"
                    className="parent-link"
                    onClick={() => handleSublinksToggle(index)}
                  >
                    <FontAwesomeIcon width={15} icon={link.icon} /> {link.label}
                  </a>
                  <div
                    className={`dropdown-content ${
                      activeDropdown === index ? "show" : ""
                    }`}
                  >
                    {link.sublinks.map((sublink, subIndex) => (
                      <Link key={subIndex} href={sublink.href}>
                        <div>{sublink.label}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={link.href}>
                  <FontAwesomeIcon width={15} icon={link.icon} /> {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <hr width="150" style={{margin: '20px 0'}} />

        <h3 style={{ color: "#fff" }}>Accounts</h3>
        <ul>
          {AccountLinks.map((link, index) => (
            <li key={index} className="nav-item">
              {link.sublinks ? (
                <div className="dropdown">
                  <a
                    href="#"
                    className="parent-link"
                    onClick={() => handleSublinksToggle(index)}
                  >
                    <FontAwesomeIcon width={15} icon={link.icon} /> {link.label}
                  </a>
                  <div
                    className={`dropdown-content ${
                      activeDropdown === index ? "show" : ""
                    }`}
                  >
                    {link.sublinks.map((sublink, subIndex) => (
                      <Link key={subIndex} href={sublink.href}>
                        <div>{sublink.label}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={link.href}>
                  <FontAwesomeIcon width={15} icon={link.icon} /> {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <hr width="150" style={{margin: '20px 0'}} />
        <ul>
          <li className="nav-item">
            <Link href="/"><FontAwesomeIcon width={15} icon={faGear} />Settings</Link>
          </li>
          <li className="nav-item">
            <button
              type="button"
              onClick={handleLogout}
              className="side_logout-btn"
            >
              <FontAwesomeIcon width={15} icon={faRightFromBracket} />
              Logout
            </button>
            {/* <Link href="/"><FontAwesomeIcon width={15} icon={faRightFromBracket} />Log Out</Link> */}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideHeader;
