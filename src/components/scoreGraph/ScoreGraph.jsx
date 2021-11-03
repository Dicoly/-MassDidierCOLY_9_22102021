import React from 'react';
import './ScoreGraph.css';
import PropTypes from 'prop-types';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

function ScoreGraph(props) {
    const { score } = props;
    const scorePourcent = score * 100;

    /* Datas for the graph */
    const data = [
        { uv: scorePourcent, fill: '#FF0000' },
        { uv: 100, fill: '#FBFBFB' }
    ];

    /* Return a custom radialBarGraph */
    return (
        <section className="scoreGraphContent">
            <h4 className="scoreGraphTitle">Score</h4>
            <div className="scoreGraphDisplay">
                <ResponsiveContainer width={200} height={200}>
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="100%"
                        data={data}
                        startAngle={90}>
                        <RadialBar
                            minAngle={15}
                            clockWise={true}
                            dataKey="uv"
                            className="radial"
                            cornerRadius={40}
                            background={{ fill: '#FBFBFB' }}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="scoreGraphText">
                    <div className="scoreGraphPurcentage">{scorePourcent}%</div>
                    <div className="scoreGraphSubText">
                        de votre <br></br>objectif
                    </div>
                </div>
            </div>
        </section>
    );
}

ScoreGraph.propTypes = {
    score: PropTypes.number.isRequired
};

export default ScoreGraph;