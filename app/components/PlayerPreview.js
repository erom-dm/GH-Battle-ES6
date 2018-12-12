import React from 'react'
import PropTypes from 'prop-types'

function PlayerPreview({avatar, username, children}){
    return(
        <div>
            <div className="column">
                <img
                    src={avatar}
                    alt={`Avatar for${username}`}
                    className="avatar"
                />
                <h2 className="username">@{username}</h2>
                {children}
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default PlayerPreview;
