import React from 'react';
import { useSelector } from 'react-redux';
import './profile.css'

function Profile() {
    const user = useSelector((store) => store.authSlice.user);

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2 className="profile-title">Your Profile</h2>

                {/* Profile Picture Section */}
                <div className="profile-picture-container">
                    <img
                        src={user.data.imageURL}
                        alt="Profile"
                        className="profile-picture"
                    />
                </div>

                {/* User Information */}
                <div className="profile-info">
                    <div className="info-group">
                        <label>Name</label>
                        <h4>{user.data.name || 'Not Available'}</h4>
                    </div>

                    <div className="info-group">
                        <label>Email</label>
                        <h4>{user.data.email || 'Not Available'}</h4>
                    </div>
                </div>

                <button className="edit-button">
                    <i className="fas fa-edit"></i> Edit Profile
                </button>
            </div>
        </div>
    );
}

export default Profile;