import React from 'react';
import PropTypes from 'prop-types';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import './LineGraph.css'

/**
 * @component
 * @returns LineGraph component depending of activity duration datas
 */
function LineGraph({datas}) {
    const week = {
        1: 'L',
        2: 'M',
        3: 'M',
        4: 'J',
        5: 'V',
        6: 'S',
        7: 'D'
    };

    /**
     * Format X axis label to display first day letter of week array instead of index
     * @returns Formated Xaxis
     */
    const CustomXaxis = (tick) => {
        return week[tick];
    };

    /**
     * Format tooltip to display duration value
     * @returns Formated div
     */
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

    return (
        <section className="lineGraphContent">
            <h4 className="lineGraphTitle">Durée moyenne des sessions</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width="100%" height={30} data={datas} margin={{ left: -65 }}>
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

LineGraph.propTypes = {
    /**
     * data is an array
     */
    datas: PropTypes.array.isRequired
};

export default LineGraph;
