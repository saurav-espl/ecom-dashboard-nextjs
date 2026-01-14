import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faAt,
    faPhone,
    faLocationDot,
    faLock,
    faEye,
    faEyeSlash,
    faSave,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";

const MyAccount = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    // User data state
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Fetch user data on component mount
    useEffect(() => {
        // In a real app, you would fetch this from your API
        const fetchUserData = async () => {
            try {
                const res = await fetch("/api/users");
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                }
            } catch (err) {
                console.error("Failed to fetch user data");
            }
        };

        // Mock data for demo - remove in production
        setUserData({
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 234 567 8900",
            address: "123 Main St, New York, NY 10001",
        });
    }, []);

    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    const handleUserInfoSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!userData.name || !userData.email) {
            setError("Name and email are required");
            return;
        }

        try {
            const res = await fetch("/api/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Profile updated successfully!");
                setIsEditing(false);
                // Update localStorage or context if you're using it
            } else {
                setError(data.message || "Update failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { currentPassword, newPassword, confirmPassword } = passwordData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All password fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await fetch("/api/users/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Password changed successfully!");
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                setError(data.message || "Password change failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <>
            <Layout>
                <section className="dashContent">
                    <div className="pageHeader">
                        <h1 className="pageTitle">My Account</h1>
                        {!isEditing && (
                            <button
                                className="editBtn"
                                onClick={() => setIsEditing(true)}
                            >
                                <FontAwesomeIcon icon={faEdit} /> Edit Profile
                            </button>
                        )}
                    </div>

                    <div className="accountContainer">
                        {/* User Information Section */}
                        <div className="accountSection">
                            <h2 className="sectionTitle">Personal Information</h2>

                            <form className="accountForm" onSubmit={handleUserInfoSubmit}>
                                <div className="formGroup">
                                    <label className="formLabel">
                                        <FontAwesomeIcon icon={faUser} /> Full Name
                                    </label>
                                    <div className="inputForm">
                                        <input
                                            type="text"
                                            name="name"
                                            className="input"
                                            value={userData.name}
                                            onChange={handleUserDataChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="formGroup">
                                    <label className="formLabel">
                                        <FontAwesomeIcon icon={faAt} /> Email Address
                                    </label>
                                    <div className="inputForm">
                                        <input
                                            type="email"
                                            name="email"
                                            className="input"
                                            value={userData.email}
                                            onChange={handleUserDataChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="formGroup">
                                    <label className="formLabel">
                                        <FontAwesomeIcon icon={faPhone} /> Phone Number
                                    </label>
                                    <div className="inputForm">
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="input"
                                            value={userData.phone}
                                            onChange={handleUserDataChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <div className="formGroup">
                                    <label className="formLabel">
                                        <FontAwesomeIcon icon={faLocationDot} /> Address
                                    </label>
                                    <div className="inputForm">
                                        <textarea
                                            name="address"
                                            className="input textarea"
                                            value={userData.address}
                                            onChange={handleUserDataChange}
                                            disabled={!isEditing}
                                            rows="3"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="formActions">
                                        <button
                                            type="button"
                                            className="btnCancel"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="button-submit">
                                            <FontAwesomeIcon icon={faSave} /> Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Change Password Section */}
                        <div className="accountSection">
                            <h2 className="sectionTitle">Change Password</h2>

                            <form className="accountForm" onSubmit={handlePasswordSubmit}>
                                <div className="formGroup">
                                    <label className="formLabel">
                                        <FontAwesomeIcon icon={faLock} /> Current Password
                                    </label>
                                    <div className="inputForm">
                                        <FontAwesomeIcon icon={faLock} />
                                        <input
                                            type={passwordType}
                                            name="currentPassword"
                                            className="input"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter current password"
                                        />
                                        <FontAwesomeIcon
                                            icon={passwordType === "password" ? faEye : faEyeSlash}
                                            className="eyeIcon"
                                            onClick={() => setPasswordType(
                                                passwordType === "password" ? "text" : "password"
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="formGroup">
                                    <label className="formLabel">
                                        <FontAwesomeIcon icon={faLock} /> New Password
                                    </label>
                                    <div className="inputForm">
                                        <FontAwesomeIcon icon={faLock} />
                                        <input
                                            type="password"
                                            name="newPassword"
                                            className="input"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                </div>

                                <div className="formGroup">
                                    <label className="formLabel">
                                        <FontAwesomeIcon icon={faLock} /> Confirm New Password
                                    </label>
                                    <div className="inputForm">
                                        <FontAwesomeIcon icon={faLock} />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            className="input"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>

                                <div className="formActions">
                                    <button type="submit" className="button-submit">
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Messages */}
                        {error && (
                            <div className="message error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="message success">
                                {success}
                            </div>
                        )}
                    </div>
                </section>
            </Layout>

            <style jsx>{`
            .pageHeader {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
            }

            .pageTitle {
                color: #333;
                font-size: 28px;
                margin: 0;
            }

            .editBtn {
                background: #000000;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: background 0.3s;
                font-family: inherit;
            }

            .editBtn:hover {
                background: #1A1A1A;
            }

            .accountContainer {
                display: grid;
                gap: 30px;
            }

            .accountSection {
                background: white;
                border-radius: 12px;
                padding: 25px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }

            .sectionTitle {
                color: #000000;
                font-size: 20px;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #e5e7eb;
            }

            .accountForm {
                display: grid;
                gap: 20px;
            }

            .formGroup {
                display: grid;
                gap: 8px;
            }

            .formLabel {
                font-weight: 500;
                color: #555;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .inputForm {
                display: flex;
                align-items: center;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 12px 15px;
                gap: 10px;
            }

            .inputForm:focus-within {
                border-color: #000000;
                background: white;
            }

            .input {
                border: none;
                background: none;
                outline: none;
                width: 100%;
                font-size: 15px;
                color: #333;
            }

            .input:disabled {
                color: #666;
                background: none;
                cursor: not-allowed;
            }

            .textarea {
                resize: vertical;
                font-family: inherit;
            }

            .formActions {
                display: flex;
                gap: 15px;
                margin-top: 10px;
            }

            .btnCancel {
                background: #ef4444;
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 15px;
                transition: background 0.3s;
                margin: 20px 0 10px 0;
                font-family: inherit;
            }

            .btnCancel:hover {
                background: #dc2626;
            }

            // .button-submit {
            //     background: #000000;
            //     color: white;
            //     border: none;
            //     padding: 12px 25px;
            //     border-radius: 8px;
            //     cursor: pointer;
            //     font-size: 15px;
            //     display: flex;
            //     align-items: center;
            //     gap: 8px;
            //     transition: background 0.3s;
            // }

            .button-submit:hover {
                background: #1A1A1A;
            }

            .message {
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
                font-weight: 500;
            }

            .error {
                background: #fee2e2;
                color: #dc2626;
                border: 1px solid #fecaca;
            }

            .success {
                background: #d1fae5;
                color: #059669;
                border: 1px solid #a7f3d0;
            }

            .eyeIcon {
                cursor: pointer;
                color: #666;
            }

            @media (max-width: 768px) {
                .dashContent {
                    padding: 15px;
                }

                .pageHeader {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }

                .accountSection {
                    padding: 20px;
                }

                .formActions {
                    flex-direction: column;
                }

                .btnCancel,
                .button-submit {
                    width: 100%;
                    justify-content: center;
                }
            }
        `}</style>
        </>
    );
};

export default MyAccount;