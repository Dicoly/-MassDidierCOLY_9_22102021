import React from 'react';
import PropTypes from 'prop-types';
import './Welcome.css'


function Welcome(props) {
    const { user } = props;

    let message;

    if (user.keyData.calorieCount < 2000) {
        message = 'Vous pouvez encore le faire, un petit effort 💪';
    } else {
        message = 'Félicitation ! Vous avez explosé vos objectifs hier 👏';
    }

    return (
        <section className="welCome">
            <h1 className="welcomeTitle">
                Bonjour <span className="welcomeName">{user.userInfos.firstName}</span>
            </h1>
            <p className="welcomeMessage">{message}</p>
        </section>
    );
}

Welcome.propTypes = {
    user: PropTypes.object.isRequired
};

export default Welcome;