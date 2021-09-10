import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from '@themesberg/react-bootstrap';
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";
import { faMehRollingEyes } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const { userId, disabledButton } = props;
    const history = useHistory();

    const getHospitalsOptions = async function () {
        let selectHospital = document.getElementById("selectHospital" + userId);
        if (selectHospital.childElementCount == 1) {
            const { data: hospitals } = await axios
                .get("http://localhost:8080/api/hospitals/"
                    , {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwtToken")
                        }
                    }
                )
                .catch((error) => {
                });

            hospitals.forEach(el => {
                var node = document.createElement('option');
                node.innerHTML = el.name;
                selectHospital.appendChild(node);
            });
        }
    };

    const getRolesOptions = async function () {
        let defSelect = document.getElementById("defaultSelectRole" + userId);
        if (defSelect != null) {
            let selectRoles = document.getElementById("selectRoles" + userId)

            defSelect.remove();

            const { data: roles } = await axios
                .get("http://localhost:8080/api/roles/"
                    , {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwtToken")
                        }
                    }
                )
                .catch((error) => {
                });

            roles.filter(x => { return x.name != "User" && x.name != "Doctor" && x.name != "Admin"; }).forEach(el => {
                var node = document.createElement('option');
                node.innerHTML = el.name;
                selectRoles.appendChild(node);
            });
        }
    };

    const makeDoctor = function () {
        let userName = document.getElementById("userName" + userId).value;
        let userSurname = document.getElementById("userSurname" + userId).value;
        let selectedHospital = document.getElementById("selectHospital" + userId).value;
        let selectRoles = document.getElementById("selectRoles" + userId);

        let rolesToSend = [];
        rolesToSend.push({id: 0, name: "Doctor"});

        for (var option of selectRoles.options) {
            if (option.selected) {
                rolesToSend.push({id: 0, name: option.value });
            }
        }

        let dataToSend = { id: userId, name: userName, surname: userSurname, hospital: { id: 0, name: selectedHospital }, roles: rolesToSend };

        axios
            .post("http://localhost:8080/api/makeDoctor/", dataToSend,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwtToken")
                    }
                }
            )
            .then((response) => {
                window.location.reload();
            })
            .catch(error => {
                if (error.response.status === 500)
                    history.push(Routes.ServerError.path);
                else if (error.response.status === 404)
                    history.push(Routes.NotFound.path);
            });
    };

    return (
        <React.Fragment>
            <Button variant="secondary" disabled={disabledButton} className="pt-0 pb-0" onClick={() => setShowDefault(true)}>Make Doctor</Button>

            <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="h5">Make Doctor</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                </Modal.Header>
                <Form onSubmit={makeDoctor}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Control id={"userName" + userId} autoComplete="off" type="text" name="userName" required placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control id={"userSurname" + userId} autoComplete="off" type="text" name="userSurname" required placeholder="Surname" />
                        </Form.Group>
                        <Form.Text>Select Hospital:</Form.Text>
                        <Form.Select required id={"selectHospital" + userId} className="mb-3" onClick={getHospitalsOptions}>
                            <option label=" "></option>
                        </Form.Select>
                        <Form.Select multiple required id={"selectRoles" + userId} onMouseEnter={getRolesOptions}>
                            <option id={"defaultSelectRole" + userId} defaultValue>Select Role</option>
                        </Form.Select>
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

