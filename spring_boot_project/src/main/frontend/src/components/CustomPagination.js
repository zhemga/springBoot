import React, { useState } from "react";
import { Col, Card, Pagination } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
    const [activeItem, setActiveItem] = React.useState(1);
    const { onChangeNumber, totalPages, size = "md", withIcons = false } = props;

    const onPrevItem = () => {
        const prevActiveItem = activeItem === 1 ? activeItem : activeItem - 1;
        setActiveItem(prevActiveItem);
        onChangeNumber(prevActiveItem);
    };

    const onNextItem = (totalPages) => {
        const nextActiveItem = activeItem === totalPages ? activeItem : activeItem + 1;
        setActiveItem(nextActiveItem);
        onChangeNumber(nextActiveItem);
    };

    const items = [];
    for (let number = 1; number <= totalPages; number++) {
        const isItemActive = activeItem === number;

        const handlePaginationChange = () => {
            setActiveItem(number);
            onChangeNumber(number);
        };

        items.push(
            <Pagination.Item active={isItemActive} key={number} onClick={handlePaginationChange}>
                {number}
            </Pagination.Item>
        );
    };

    return (
        <Pagination size={size} className="mt-3">
            <Pagination.Prev disabled={activeItem <= 1} onClick={onPrevItem}>
                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleLeft} /> : "Previous"}
            </Pagination.Prev>
            {items}
            <Pagination.Next disabled={activeItem >= totalPages} onClick={() => onNextItem(totalPages)}>
                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleRight} /> : "Next"}
            </Pagination.Next>
        </Pagination>
    );
};