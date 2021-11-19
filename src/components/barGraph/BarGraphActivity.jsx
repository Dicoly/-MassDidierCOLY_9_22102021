import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../data/API';
import Format from '../../data/Format';
import BarGraph from './BarGraph';

/**
 * Perform a user activity request to API and display bar graph with data response
 * @component
 */
function BarGraphActivity(props) {
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

    
    if (loading) {
        return <div>Loading</div>;
    } else if (error) {
        return <div>Erreur chargement du BarGraph</div>;
    } else {
        return (
            <BarGraph datas={activity} />
        );
    }
}

BarGraphActivity.propTypes = {
    /**
    * User selected
    */
    selectedUser: PropTypes.object.isRequired
};

export default BarGraphActivity;