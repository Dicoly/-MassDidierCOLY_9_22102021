import React from 'react';
import PropTypes from 'prop-types';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import './BarGraph.css';

/**
 * @component
 * @returns BarGraph component depending of activity datas
 */

function BarGraph({datas}) {

    /**
     * Format tooltip to display particular values
     * @param {object}  tooltip  {active , payload} 
     * @returns Formated div
     */
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

    /**
     * Format legend style
     * @param {string} value actual legend text 
     * @returns Formated span
     */
    const CustomLegend = (value) => {
        const style = { color: '#74798C', fontSize: '14px' };

        return <span style={style}>{value}</span>;
    };

    return (
        <section className="barGraphContent">
            <h4 className="barGraphTitle">Activité quotidienne</h4>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    width={500}
                    height={300}
                    data={datas}
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

BarGraph.propTypes = {
    /**
     * data is an array
     */
    datas: PropTypes.array.isRequired
};

export default BarGraph;