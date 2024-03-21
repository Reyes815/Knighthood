import React from "react";
import './Popup.css'

function Popup(props) {
    const { trigger, onClose } = props;

    const handleClose = () => {
        onClose(); // Call the onClose function passed from the parent component
    };

    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>YOU LOST</h1>
                <h2>Your score: </h2>
                <button className="try-button" onClick={handleClose}>Try Again</button>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Popup;
