import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../data/API';
import Format from '../../data/Format';
import LineGraph from './LineGraph';

/**
 * Perform a user duration of activity request to API and display line graph with data response
 * @component
 */
function LineGraphAverage(props) {
    const { selectedUser } = props;
    const [duration, setDuration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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

    if (loading) {
        return <div className="loading">Loading</div>;
    } else if (error) {
        return <div className="error">Erreur</div>;
    } else {
        return (
            <LineGraph datas={duration}/>
        );
    }
}

LineGraphAverage.propTypes = {
    /**
    * User selected
    */
    selectedUser: PropTypes.object.isRequired
};

export default LineGraphAverage;
