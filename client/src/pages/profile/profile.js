import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        // Fetch profile data from backend
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/profile`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await res.json();
                setMessage(data.message);
                setUser(data.user);
            } catch (err) {
                setMessage('Failed to load profile');
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <>
            <h2>Profile Page</h2>
            <p>{message}</p>
            {user && <pre>{JSON.stringify(user,null,2)}</pre>}
        </>
    );
};

export default Profile;