import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import API from '../../data/API';
import Format from '../../data/Format';
import './RadarGraph.css';

function RadarGraph(props) {
    const { selectedUser } = props;
    const [intensity, setIntensity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        API.getSessionIntensity(selectedUser.id)
            .then((response) => {
                setIntensity(Format.intensityFormat(response));
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedUser]);

    const CustomPolarAngleAxis = (tick) => {
        return intensity.kind[tick].charAt(0).toUpperCase() + intensity.kind[tick].slice(1);
    };

    if (loading) {
        return <div className="loading">Loading</div>;
    } else if (error) {
        return <div className="error">Erreur</div>;
    } else {
        return (
            <div className="radarGraphContent">
                <ResponsiveContainer width="100%" height="90%">
                    <RadarChart cx={'center'} cy={'center'} outerRadius={75} data={intensity.data}>
                        <PolarGrid radialLines={false} />
                        <PolarAngleAxis
                            tickFormatter={CustomPolarAngleAxis}
                            dataKey="kind"
                            stroke="white"
                            tickLine={false}
                            fontSize={12}
                        />
                        <Radar dataKey="value" fill="red" fillOpacity={0.7} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

RadarGraph.propTypes = {
    selectedUser: PropTypes.object.isRequired
};

export default RadarGraph;
