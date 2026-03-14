import React from 'react';

const Home = ({ user }) => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page.</p>
            {user && (
                <div>
                    <h2>User Info</h2>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Home;