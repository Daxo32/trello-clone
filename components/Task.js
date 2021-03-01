import { useState } from "react";
import { Badge, Modal, ModalBody, ModalHeader, Button, Row, Container, Col, FormInput, ModalFooter, Form, FormGroup } from "shards-react";
import styles from '../styles/task.module.css'
import { FaTimesCircle } from "react-icons/fa";
export default function Task(props) {

    const [openDialog, toggleDialog] = useState(false)
    //
    const [taskText, setTaskText] = useState(props.text_v)
    const [taskIndex, setTaskIndex] = useState(props.ind)
    //
    const [modalTextTask, setModalTextTask] = useState(props.text_v)

    // const updateTask = () => {
    //     console.log(modalTextTask)
    //     //
    //     setTaskText(modalTextTask)
    //     toggleDialog(!openDialog)
    //     //
    //     //FETCH WITH SERVER FOR UPDATE
    //     console.log("FETCH:")
    //     console.log(taskIndex)
    //     console.log(taskText)
    // }

    return (
        <div>
            <Container>
                <Row>
                    taskIndex: {taskIndex}
                    <Col>
                        <p>{taskText}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Badge theme="warning">tag</Badge>
                    </Col>
                </Row>
            </Container>
            {/* <Modal open={openDialog} toggle={toggleDialog}>
                <ModalHeader>Header</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <label htmlFor="task-text">Text</label>
                            <FormInput id="task-text" value={modalTextTask} onChange={(evt) => setModalTextTask(evt.target.value)} />
                        </FormGroup>
                        <Button onClick={() => { props.updateTaskInfo(taskIndex, modalTextTask)}}>Salva</Button>
                    </Form>
                </ModalBody>
            </Modal> */}
        </div >

    )
}