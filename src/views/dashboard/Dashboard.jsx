import React, { useState, useEffect } from 'react';
import Welcome from '../../components/welcome/Welcome';
import API from '../../data/API';
import BarGraph from '../../components/barGraph/BarGraph';
import './Dashboard.css';

function Dashboard() {
    const [userSelect, setUserSelect] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        API.getInitialUser()
            .then((response) => {
                setUserSelect(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading</div>;
    } else if (error) {
        return <div className="error">Erreur</div>;
    } else {
        return (
            <main className="dashboardContent">
                <Welcome user={userSelect} /> 
                <BarGraph selectedUser={userSelect} /> 
            </main>
        );
    }
}

export default Dashboard;