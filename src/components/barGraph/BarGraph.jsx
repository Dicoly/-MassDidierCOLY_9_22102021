import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../data/API';
import Format from '../../data/Format';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import './BarGraph.css';

function BarGraph(props) {
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

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="barGraphToolTip">
                    <p>{`${payload[0].value}kg`}</p>
                    <p>{`${payload[1].value / 1000}kCal`}</p>
                </div>
            );
        }
        return null;
    };

    const CustomLegend = (value) => {
        const style = { color: '#74798C', fontSize: '14px' };

        return <span style={style}>{value}</span>;
    };

    if (loading) {
        return <div className="loading">Loading</div>;
    } else if (error) {
        return <div className="error">Erreur</div>;
    } else {
        return (
            <section className="barGraphContent">
                <h4 className="barGraphTitle">Activité quotidienne</h4>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                        width={500}
                        height={300}
                        data={activity}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey={'index'} tickLine={false} />
                        <YAxis
                            tickCount={3}
                            dataKey="calories"
                            axisLine={false}
                            tickLine={false}
                            orientation={'right'}
                        />
                        <Legend
                            align={'right'}
                            verticalAlign={'top'}
                            iconType={'circle'}
                            payload={[
                                { value: 'Poids (kg)', type: 'circle', color: '#282D30' },
                                {
                                    value: 'Calories brûlées (kCal)',
                                    type: 'circle',
                                    color: '#E60000'
                                }
                            ]}
                            wrapperStyle={{
                                paddingBottom: '30px'
                            }}
                            formatter={CustomLegend}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="kilogram"
                            fill="#282D30"
                            radius={[10, 10, 0, 0]}
                            barSize={10}
                        />
                        <Bar
                            dataKey="calories"
                            fill="#E60000"
                            radius={[10, 10, 0, 0]}
                            barSize={10}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </section>
        );
    }
}

BarGraph.propTypes = {
    selectedUser: PropTypes.object.isRequired
};

export default BarGraph;