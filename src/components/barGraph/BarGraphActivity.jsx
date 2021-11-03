import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../data/API';
import Format from '../../data/Format';
import BarGraph from './BarGraph';
//import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
//import './BarGraph.css';

function BarGraphActivity(props) {
    const { selectedUser } = props;
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        API.getActivity(selectedUser.id)
            .then((response) => {
                setActivity(
                    Format.activityFormat(response).map((activity, i) => {
                        return { ...activity, index: i + 1 };
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedUser]);

    
    if (loading) {
        return <div className="loading">Loading</div>;
    } else if (error) {
        return <div className="error">Erreur</div>;
    } else {
        return (
            <BarGraph datas={activity} />
        );
    }
}

BarGraphActivity.propTypes = {
    selectedUser: PropTypes.object.isRequired
};

export default BarGraphActivity;