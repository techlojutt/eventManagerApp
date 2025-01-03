
import React from 'react';
import { useSelector } from 'react-redux';

function Profile(){
    const user = useSelector((store) => store.authSlice.user);

    return (
        <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7f8fc, #e2e8f0)",
      }}
    >
      <div className="profile-container p-5 bg-white rounded shadow-lg w-50">
        <h2 className="text-center text-primary mb-4">Your Profile</h2>

        {/* Profile Picture */}
        <div className="text-center mb-4">
          <img
            src={user.data.imageURL}
            alt="Profile"
            className="rounded-circle shadow"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* User Information */}
        <div className="mb-3">
          <h4>Name:{user.data.name}</h4>
          <p className="text-muted"> Not Available</p>
        </div>

        <div className="mb-3">
          <h4>Email: {user.data.email}</h4>
          <p className="text-muted"> Not Available</p>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
    );
}


export default Profile;