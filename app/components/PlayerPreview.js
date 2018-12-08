let React = require('react');
let PropTypes = require('prop-types');

function PlayerPreview(props){
    return(
        <div>
            <div className="column">
                <img
                    src={props.avatar}
                    alt={`Avatar for${props.username}`}
                    className="avatar"
                />
                <h2 className="username">@{props.username}</h2>
                {props.children}
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

module.exports = PlayerPreview;
