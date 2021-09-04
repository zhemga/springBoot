import React, { useState } from "react";
import { Button, Modal, Form } from '@themesberg/react-bootstrap';
import DatePicker from "./DatePicker"

export default (props) => {
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const { doctorName, doctorEmail, hospitalName } = props;

    const createAdmission = function () {
        console.log("d");
    };

    return (
        <React.Fragment>
            <Button variant="primary" className="pt-0 pb-0" onClick={() => setShowDefault(true)}>Make Admission</Button>

            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h5">Confirm Admission</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Form onSubmit={createAdmission}>
                    <Modal.Body>
                        <p className="h6">Admission Data:</p>
                        <span className="h6">Doctor: </span> {doctorName}<br />
                        <span className="h6">Email: </span> {doctorEmail}<br />
                        <span className="h6">Hospital: </span> {hospitalName}<br />
                        <p className="h6 mt-2">Select Date: </p>
                        <DatePicker />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit">
                            Make
                        </Button>
                        <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

