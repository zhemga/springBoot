import React, { useState } from "react";
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import Datetime from "react-datetime";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
    const [dateTime, setDay] = React.useState("");
    const { onTimeSelection } = props;

    const initTime = moment().add(1, 'days').set({ h: 8, m: 0 });

    const valid = function (current) {
        return current.isAfter(moment());
    };

    const getTime = function () {
        return dateTime ? moment(dateTime).format("DD/MM/YYYY HH:mm") : initTime.format("DD/MM/YYYY HH:mm");
    };

    return (
        <Form.Group className="mb-3">
            <Datetime
                onClose={() => { onTimeSelection(getTime()) }}
                initialValue={initTime}
                isValidDate={valid}
                dateFormat={"HH:mm"}
                timeFormat={"HH:mm"}
                closeOnSelect={false}
                onChange={setDay}
                timeConstraints={{ hours: { min: 8, max: 19, }, minutes: { step: 15 } }}
                renderInput={(props, openCalendar) => (
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        <Form.Control
                            required
                            type="text"
                            value={getTime()}
                            placeholder="DD/MM/YYYY HH:mm"
                            onFocus={openCalendar}
                        />
                    </InputGroup>
                )} />
        </Form.Group>
    );
}