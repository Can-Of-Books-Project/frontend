import React from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { addBook, getUserBooks, updateBook } from '../API/books_api'

import { useAuth0 } from '@auth0/auth0-react'

export default function BookFormModal(props) {
    const [show, setShow] = React.useState(false);
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [status, setStatus] = React.useState('LIFE-CHANGING')
    const [img, setImg] = React.useState('')
    const { type, pk } = props

    const {user} = useAuth0()
    const email = user.email

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = async (event) => {
        event.preventDefault();

        type === 'Add' ? 
        await addBook(title, description, status, img, email)
        :
        await updateBook(title, description, status, img, pk);

        await getUserBooks(email).then(data => {
            props.handelNewData(data)
            handleClose()
        })
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {type === 'Add' ? "Add" : "Update"}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{type === 'Add' ? "Book Details" : "Update Book's Details"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control required onChange={evt => setTitle(evt.target.value)} name="title" type="text" placeholder="Text" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                description
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control required onChange={evt => setDescription(evt.target.value)} name="description" type="text" placeholder="description" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Image URL
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control onChange={evt => setImg(evt.target.value)} name="img" type="text" placeholder="Image URL - Skipp it for default image" />
                            </Col>
                        </Form.Group>

                        <fieldset>
                            <Form.Group onChange={evt => setStatus(evt.target.value)} as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={2}>
                                    Status
                                </Form.Label>
                                <Col required sm={10}>
                                    <Form.Check
                                        checked
                                        type="radio"
                                        label="LIFE-CHANGING"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        value='LIFE-CHANGING'
                                        onChange={evt => setStatus(evt.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="FAVORITE FIVE"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        value='FAVORITE FIVE'
                                        onChange={evt => setStatus(evt.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="RECOMMENDED TO ME"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios3"
                                        value="RECOMMENDED TO ME"
                                        onChange={evt => setStatus(evt.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit"> {type === 'Add' ? "Add" : "Update"}</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

