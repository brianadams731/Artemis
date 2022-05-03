import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// import styles from "../styles/Dropdown.scss";

const Dropdown = () => {

    const [isChosen, setIsChosen] = useState(false);
    return(
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsChosen(!isChosen)}>
                Select priority
            </div>
            {isChosen && (
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        Critical
                    </div>
                    <div className="dropdown-item">
                        High
                    </div>
                    <div className="dropdown-item">
                        Medium
                    </div>
                    <div className="dropdown-item">
                        Low
                    </div>
                </div>
            )}
        </div>
    )

} 

export { Dropdown }