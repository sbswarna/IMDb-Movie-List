import React, { useState } from "react";

const Rating = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const { handleToggleRating, rank } = props;

    function handleHover() {
        setIsHovered(true);
    }

    function handleOut() {
        setIsHovered(false);
    }

    function getClassName() {
        const { isRated } = props;
        let className = isRated ? "bi bi-star-fill" : "bi bi-star";
        className += isHovered ? " text-primary" : "";
        return className;
    }

    return (
        <>
            <i
                onMouseOver={handleHover}
                onMouseOut={handleOut}
                onClick={() => handleToggleRating(rank)}
                className={getClassName()}
            ></i>
        </>
    );
};

export default Rating;
