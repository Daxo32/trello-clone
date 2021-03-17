
import { useEffect, useState } from "react"
import styles from '../styles/modaltask.module.scss'
import { FormInput, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Button, Row, Col } from "shards-react";

function ModalTask(props) {
    const [currentText, setCurrentText] = useState("") //Contains the new text for the task
    const [taskPriority, setTaskPriority] = useState(0)

    useEffect(() => {
        setCurrentText(props.boards[props.board_idx].tasks[props.task_idx].content)
        setTaskPriority(props.boards[props.board_idx].tasks[props.task_idx].priority)
    }, [])

    return (
        <Modal open={props.openFunc} toggle={props.toggleFunc}>
            <ModalHeader>Modifica info task</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <label htmlFor="task-text">Descrizione</label>
                        <FormInput id="task-text" value={currentText} onChange={(evt) => { setCurrentText(evt.target.value) }} />
                    </FormGroup>
                </Form>

                <FormGroup>
                    <label>Priorità</label><br />
                    <Button className={styles.priority_button} outline onClick={() => setTaskPriority(0)} active={taskPriority === 0 ? true : false} theme="info">Normale</Button>
                    <Button className={styles.priority_button} outline onClick={() => setTaskPriority(1)} active={taskPriority === 1 ? true : false} theme="warning">Medio</Button>
                    <Button className={styles.priority_button} outline onClick={() => setTaskPriority(2)} active={taskPriority === 2 ? true : false} theme="danger">Urgente</Button>
                </FormGroup>


            </ModalBody>

            <ModalFooter>
                {/**
                 * OnClick trigger the function that updates the task info
                 */}
                <Button theme="danger" outline onClick={() => { props.deltask(props.board_idx, props.task_idx); props.toggleFunc(false) }}>Elimina task</Button>
                <Button onClick={() => { props.updateTaskFunc(props.board_idx, props.task_idx, currentText, taskPriority); props.toggleFunc(false) }}>Salva</Button>

            </ModalFooter>
        </Modal>
    )
}

export default ModalTask