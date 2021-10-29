import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../data/API';
import Format from '../../data/Format';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import './LineGraph.css'


function LineGraph(props) {
    const { selectedUser } = props;
    const [duration, setDuration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const week = {
        1: 'L',
        2: 'M',
        3: 'M',
        4: 'J',
        5: 'V',
        6: 'S',
        7: 'D'
    };

    useEffect(() => {
        API.getSessionDuration(selectedUser.id)
            .then((response) => {
                setDuration(Format.durationFormat(response));
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedUser]);

    const CustomXaxis = (tick) => {
        return week[tick];
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="lineGraphToolTip">
                    <p>{`${payload[0].value}min`}</p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return <div className="loading">Loading</div>;
    } else if (error) {
        return <div className="error">Erreur</div>;
    } else {
        return (
            <section className="lineGraphShape">
                <h4 className="lineGraphTitle">Durée moyenne des sessions</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width="100%" height={30} data={duration} margin={{ left: -65 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                        <XAxis
                            tickFormatter={CustomXaxis}
                            dataKey="day"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            stroke="white"
                            padding={{ left: 15, right: 10 }}
                        />
                        <YAxis
                            domain={['dataMin-25', 'dataMax+40']}
                            axisLine={false}
                            tick={false}
                            label={{ value: 'index', position: 'insideLeft', dy: -150 }}
                        />
                        <Tooltip content={CustomTooltip} />
                        <Line
                            type="natural"
                            dataKey="sessionLength"
                            stroke="white"
                            activeDot={{ r: 4 }}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        );
    }
}

LineGraph.propTypes = {
    selectedUser: PropTypes.object.isRequired
};

export default LineGraph;
