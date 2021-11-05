import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import energy from '../../assets/energy.svg';
import protein from '../../assets/protein.svg';
import lipid from '../../assets/lipid.svg';
import glucide from '../../assets/glucide.svg';
import './CardInfos.css'


function CardInfos(props) {
    const { countCategory, countValue } = props;

    /* Custom parameters */
    let imgData;
    let valueData;
    let textData;
    let colorTag;

    /* Determine for each category a set of specific value to display */
    switch (countCategory) {
        case 'calorieCount':
            imgData = energy;
            valueData = countValue / 1000 + 'kCal';
            textData = 'Calories';
            colorTag = '#FF000007';
            break;
        case 'proteinCount':
            imgData = protein;
            valueData = countValue + 'g';
            textData = 'Proteines';
            colorTag = '#4AB8FF10';
            break;
        case 'carbohydrateCount':
            imgData = glucide;
            valueData = countValue + 'g';
            textData = 'Glucides';
            colorTag = '#F9CE2310';
            break;
        case 'lipidCount':
            imgData = lipid;
            valueData = countValue + 'g';
            textData = 'Lipides';
            colorTag = '#FD518110';
            break;
        default:
            return null
    }

    /* Return a complete tag in each case */
    return (
        <div className="cardInfosContent">
            <CardImg className="cardInfosImg" background={colorTag}>
                <img className="cardInfosIcon" src={imgData} alt={imgData}/>
            </CardImg>
            <div>
                <div className="cardInfosNumber">{valueData}</div>
                <div className="cardInfosText">{textData}</div>
            </div>
        </div>
    );
}

CardInfos.propTypes = {
    countCategory: PropTypes.string.isRequired,
    countValue: PropTypes.number.isRequired
};

const CardImg = styled.div`
    background-color: ${(props) => props.background};
`;

export default CardInfos;