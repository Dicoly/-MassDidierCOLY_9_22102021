import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RadarGraph from './RadarGraph';
import API from '../../data/API';
import Format from '../../data/Format';

/**
 * Perform a user intensity of session request to API and display radar graph with data response
 * @component
 */
function RadarGraphPerformance(props) {
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

    if (loading) {
        return <div>Loading</div>;
    } else if (error) {
        return <div>Erreur chargement du RadarGraph</div>;
    } else {
        return (
            <RadarGraph intensity={intensity}/>
        );
    }
}

RadarGraphPerformance.propTypes = {
    /**
   * User selected
   */
    selectedUser: PropTypes.object.isRequired
};

export default RadarGraphPerformance;
