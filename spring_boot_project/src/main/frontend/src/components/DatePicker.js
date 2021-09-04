import React, { useState } from "react";
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import Datetime from "react-datetime";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
    const [day, setDay] = React.useState("");

    const valid = function (current) {
        return current.isAfter(moment());
    };

    return (
        <Form.Group className="mb-3">
            <Datetime
                isValidDate={valid}
                timeFormat={false}
                closeOnSelect={false}
                onChange={setDay}
                renderInput={(props, openCalendar) => (
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        <Form.Control
                            required
                            type="text"
                            value={day ? moment(day).format("DD/MM/YYYY") : ""}
                            placeholder="dd/mm/yyyy"
                            onFocus={openCalendar}
                            onChange={() => { }} />
                    </InputGroup>
                )} />
        </Form.Group>
    );
}