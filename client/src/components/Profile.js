import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css'; // Make sure to import the CSS file for styles

const Profile = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [name, setName] = useState();

    useEffect(() => {
        const { username } = params;
        setName(username);
        console.log(username);
        axios.post("http://localhost:5000/info", { name: username })
            .then(result => {
                console.log(result);
                if (result.data.status === "Success") {
                    const userInfo = { name: result.data.name, email: result.data.email };
                    setUser(userInfo);
                } else {
                    alert("User doesn't exist");
                }
            })
            .catch(err => console.log(err));
    }, [params]);

    const goBack = () => {
        navigate('/'); // Navigate to the home page or main app
    };

    return (
        <div className="profile-page">
            
            <h1 className="profile-heading">Profile</h1>
            <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button className="back-btn" onClick={goBack}>Go Back</button>
        </div>
    );
};

export default Profile;
