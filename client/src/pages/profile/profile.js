import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch profile data from backend
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile', {
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
        <div>
            <h2>Profile Page</h2>
            <p>{message}</p>
            <div>
                <strong>Username:</strong> {user.username}<br />
                <strong>Email:</strong> {user.email}
                {/* Add more user fields as needed */}
            </div>
        </div>
    );
};

export default Profile;