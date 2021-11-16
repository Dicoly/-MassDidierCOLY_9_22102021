import React, { useState, useEffect } from 'react';
import Welcome from '../../components/welcome/Welcome';
import API from '../../data/API';
import BarGraphActivity from '../../components/barGraph/BarGraphActivity';
import LineGraphAverage from '../../components/lineGraph/LineGraphAverage';
import RadarGraphPerformance from '../../components/radarGraph/RadarGraphPerformance';
import ScoreGraph from '../../components/scoreGraph/ScoreGraph';
import CardInfos from '../../components/cardInfos/CardInfos';
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
            <main className="dashboard">
                <div className="dashboardContent">
                    <Welcome user={userSelect} /> 
                    <BarGraphActivity selectedUser={userSelect} />
                    <div className="littleGraph">
                        <LineGraphAverage selectedUser={userSelect} />
                        <RadarGraphPerformance selectedUser={userSelect} />
                        <ScoreGraph score={userSelect.todayScore} />
                    </div>
                </div>
                <aside className="dashboardCardInfos">
                    {Object.keys(userSelect.keyData).map((countCategory) => (
                        <CardInfos
                            countValue={userSelect.keyData[countCategory]}
                            key={countCategory}
                            countCategory={countCategory}
                        />
                    ))}
                </aside> 
            </main>
        );
    }
}

export default Dashboard;