import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faLock,
  faEye,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Edit_Profile = () => {
  const [type, setType] = useState("password");
  return (
    <main className="form_container">
      <div className="formDiv">
        <form className="edit_form">
          <h2 className="page-title">Edit Profile</h2>
          <div className="edd">
            <div className="edit_field">
              <div className="flex-column">
                <label>Full Name</label>
              </div>
              <div className="inputForm">
                {/* Added safety check for faUser */}
                {faUser && <FontAwesomeIcon width={15} icon={faUser} />}
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your Full Name"
                />
              </div>
            </div>
            <div className="edit_field">
              <div className="flex-column">
                <label>Email </label>
              </div>
              <div className="inputForm">
                {/* Added safety check for faAt */}
                {faAt && <FontAwesomeIcon width={15} icon={faAt} />}
                <input
                  type="email"
                  className="input"
                  placeholder="Enter your Email"
                />
              </div>
            </div>
            <div className="edit_field">
              <div className="flex-column">
                <label>Phone Number</label>
              </div>
              <div className="inputForm">
                {/* Added safety check for faPhone */}
                {faPhone && <FontAwesomeIcon width={15} icon={faPhone} />}
                <input
                  type="tel" // Fixed type from email to tel
                  className="input"
                  placeholder="Enter your Phone Number"
                />
              </div>
            </div>
            <div className="edit_field">
              <div className="flex-column">
                <label>Current Password</label>
              </div>
              <div className="inputForm">
                {/* Added safety check for faLock */}
                {faLock && <FontAwesomeIcon width={15} icon={faLock} />}
                <input
                  type={type}
                  className="input"
                  placeholder="****************"
                />
                {/* Added safety check for faEye */}
                {faEye && <FontAwesomeIcon width={15} icon={faEye} onClick={() => { if (type == "password") setType("text"); else setType("password") }} />}
              </div>
            </div>
            <div className="edit_field">
              <div className="flex-column">
                <label>New Password</label>
              </div>
              <div className="inputForm">
                {faLock && <FontAwesomeIcon width={15} icon={faLock} />}
                <input
                  type="password"
                  className="input"
                  placeholder="****************"
                />
                {faEye && <FontAwesomeIcon width={15} icon={faEye} />}
              </div>
            </div>
            <div className="edit_field">
              <div className="flex-column">
                <label>Confirm Password</label>
              </div>
              <div className="inputForm">
                {faLock && <FontAwesomeIcon width={15} icon={faLock} />}
                <input
                  type="password"
                  className="input"
                  placeholder="****************"
                />
                {faEye && <FontAwesomeIcon width={15} icon={faEye} />}
              </div>
            </div>
          </div>
          <button type="submit" className="button-submit">Update Profile</button>
        </form>
      </div>
    </main>
  );
};

export default Edit_Profile;