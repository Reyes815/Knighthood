import React, { useEffect, useState } from "react";
import './Popup.css'
import axios from 'axios';

function Popup(props) {
    const { trigger, onClose, time, user_id } = props;
    const [count, setCount] = useState(0);

    const handleClose = () => {
        onClose(); // Call the onClose function passed from the parent component
    };

    const saveScore = async () => {
        try {
            console.log(time + "YAWAAA"+user_id+" YAWAA");
            const response = await axios.post('/api/scores', {
                user_id: user_id,
                score: time // Assuming 'time' is the score
            });
            if (response.data) {
                console.log('Score saved successfully');
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.error('Error saving score:', error);
            console.log('Error details:', error.response.data); // Log error details from the response
            console.log('Error status:', error.response.status); // Log HTTP status code of the error
        }
    };

    useEffect(() => {
        if (trigger && count === 0) {
            setCount(1);
            saveScore(); // Call saveScore when the popup is triggered
        }
    }, [trigger, count]);

    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>CONGRATULATIONS</h1>
                <h2>Your score: {time} points</h2>
                <button className="try-button" onClick={handleClose}>Try Again</button>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Popup;
