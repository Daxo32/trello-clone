import { useState } from "react";
import { Badge, Modal, ModalBody, ModalHeader, Button, Row, Container, Col, FormInput, ModalFooter } from "shards-react";
import { FaRegEdit } from "react-icons/fa";
export default function Task(props) {

    const [openDialog, toggleDialog] = useState(false)
    const [taskText, setTaskText] = useState(props.text_v)

    //
    const [modalTextTask, setModalTextTask] = useState("")

    const updateTask = () => {
        console.log(modalTextTask)
        //
        setTaskText(modalTextTask)
        toggleDialog(!openDialog)
        //
        //FETCH WITH SERVER FOR UPDATE
    }

    return (
        <div>
            <Container onClick={() => toggleDialog(!openDialog)}>
                <Row>
                    <p>{taskText}</p>
                </Row>
                <Row>
                    <Col>
                        <Badge theme="warning">tag</Badge>
                    </Col>
                </Row>
            </Container>

            <Modal open={openDialog} toggle={() => toggleDialog(!openDialog)}>
                <ModalHeader>Modifica task</ModalHeader>
                <ModalBody>
                    <FormInput size="sm" defaultValue={taskText} onChange={(evt) => setModalTextTask(evt.target.value)} className="mb-2" />
                    <Badge theme="primary">Normale</Badge><br />
                    <Badge theme="warning">Medio</Badge><br />
                    <Badge theme="danger">Urgente</Badge><br />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => { updateTask() }}>Salva</Button>
                </ModalFooter>
            </Modal>
        </div >

    )
}