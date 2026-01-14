import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfileDropdown = () => {
  const router = useRouter();
  const [showList, setShowList] = useState(false);

  const toggleList = () => setShowList(!showList);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/dashboard/login");
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <div className="ProfileDiv">
      {faUser && (
        <FontAwesomeIcon
          color="#fff"
          width={15}
          icon={faUser}
          onClick={toggleList}
          style={{ cursor: "pointer" }}
        />
      )}

      {showList && (
        <div className="ProfileDropdown">
          <div className="userInfo">
            <p>Signed in as</p>
            <p className="email">user@email.com</p>
          </div>

          <ul>
            <li>
              <Link href="/dashboard/edit-profile">Edit Profile</Link>
            </li>
            <li>
              <Link href="/dashboard/help">Help</Link>
            </li>
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
