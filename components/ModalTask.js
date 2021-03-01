
import { useEffect, useState } from "react"
import { FormInput, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Button } from "shards-react";

function ModalTask(props) {
    const [currentText, setCurrentText] = useState(props.task_text) //Contains the new text for the task

    useEffect(() => {
        setCurrentText(props.task_text)
    }, [props.task_text])

    return (
        <Modal open={props.openFunc} toggle={props.toggleFunc}>
            <ModalHeader>Modifica info task</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <label htmlFor="task-text">Descrizione</label>
                        <FormInput id="task-text" value={currentText} onChange={(evt) => setCurrentText(evt.target.value)} />
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                {/**
                 * OnClick trigger the function that updates the task info
                 */}
                <Button onClick={() => { props.updateTaskFunc(props.task_idx, currentText); props.toggleFunc(false) }}>Salva</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalTask