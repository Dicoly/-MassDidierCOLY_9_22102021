import React from 'react';
import PropTypes from 'prop-types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './RadarGraph.css';

/**
 * @component
 * @returns RadarGraph component depending of intensity datas
 */
function RadarGraph({intensity}) {

    /**
     * Put first letter of each tick in uppercase, speed becomes Speed
     * @returns user activity intensity sessions
     */
    const CustomPolarAngleAxis = (tick) => {
        return intensity.kind[tick].charAt(0).toUpperCase() + intensity.kind[tick].slice(1);
    };

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

RadarGraph.propTypes = {
    /**
     * intensity is data to fill the graph
     */
    intensity: PropTypes.object.isRequired
};

export default RadarGraph;
