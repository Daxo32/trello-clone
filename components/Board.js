import { useEffect, useState } from "react"
import styles from '../styles/board.module.scss'
import { Card, CardBody, CardHeader, CardFooter, FormInput, Button, Container, Row, Col } from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditText } from 'react-edit-text';
import { HiX } from "react-icons/hi";
import Task from '../components/Task'
import ModalTask from '../components/ModalTask'
import 'react-edit-text/dist/index.css';


function Board(props) {
    const [boardTitle, setBoardTitle] = useState(props.title)
    const [tasks, updateTasks] = useState(props.tasks)//Next fetch with a DB for tasks
    const [inputData, setInputData] = useState() //New task text

    //Flag Hook to open the dialog
    const [openDialog, toggleDialog] = useState(false)
    //
    //Info about the clicked task
    const [modalTextTask, setModalTextTask] = useState("")
    const [modalIndexTask, setModalIndexTask] = useState("")
    ///

    useEffect(() => {

    }, [])

    const onDragEnds = (result) => {
        if (!result.destination) return
        let local = Array.from(tasks)
        //Ok remove the element from the update the value of the destination position
        let [new_item] = local.splice(result.source.index, 1)

        local.splice(result.destination.index, 0, new_item)
        updateTasks(local)

        //Backpropagate the updated
        props.updateBoardFunc(props.id, boardTitle, tasks)

    }

    const handleEnter = (event) => {
        console.log(tasks[0])
        if (event.keyCode == 13) {
            tasks.push({ text: inputData })
            updateTasks([...tasks])

            //Backpropagate the update
            props.updateBoardFunc(props.id, boardTitle, tasks)
        }
    }

    const updateTask = (task_index, task_text) => {
        console.log(task_index)
        console.log(task_text)
        let temp = tasks
        temp[task_index] = ({ text: task_text })
        updateTasks([...temp])

        //Backpropagate the update
        props.updateBoardFunc(props.id, boardTitle, tasks)
    }

    //Set the current task hooks and opens the modal
    const openDialog_func = (idx, txt) => {
        setModalTextTask(txt)
        setModalIndexTask(idx)
        toggleDialog(!openDialog)
    }
    //

    //I push the board title update when the user press ENTER on the title tag
    const pushBoardTitleUpdate = (evt) => {
        if (evt.keyCode == 13) { //Update only on ENTER keydown
            //Backpropagate the update
            props.updateBoardFunc(props.id, boardTitle, tasks)
        }
    }

    return (
        <Card className={styles.boardPanel}>
            <CardHeader className={styles.boardPanel__header}>
                <Container fluid>
                    <Row className={styles.boardPanel__header__mainRow}>
                        <Col sm="10" md="10" lg="10">
                            <h5 onKeyDown={pushBoardTitleUpdate}>
                                <EditText
                                    name="textbox1"
                                    value={boardTitle}
                                    onChange={setBoardTitle}
                                />
                            </h5>
                        </Col>
                        <Col sm="2" md="2" lg="2">
                            <HiX className={styles.boardPanel__header__closeCross} size="1.8em" onClick={() => props.removeBoardFunc(props.id)} />
                        </Col>
                    </Row>
                </Container>
            </CardHeader>
            <CardBody className={styles.boardPanel__body}>
                <DragDropContext onDragEnd={onDragEnds}>
                    <Droppable droppableId="tasks">
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map(({ text }, index) => {
                                    return (
                                        <Draggable key={index} draggableId={"draggable-" + index} index={index}>
                                            {(provided) => (
                                                <Card onClick={() => { openDialog_func(index, text) }} key={"drag-" + text} className={styles.task_card}
                                                    innerRef={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <CardBody key={index} className={styles.card_body}>
                                                        <Task key={index} ind={index} updateTaskInfo={updateTask} text_v={text} />
                                                    </CardBody>
                                                </Card>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </CardBody>
            <CardFooter>
                <FormInput size="sm" placeholder="Inserisci nuovo task" onChange={(evt) => setInputData(evt.target.value)} className="mb-2" onKeyDown={handleEnter} />
            </CardFooter>

            {/*ModalTask
                - task_text is the text of the task 
                - task_idx is the index of the task inside the board
                - updateTaskFunc is the function that update the taskinfo
            */}
            <ModalTask openFunc={openDialog} toggleFunc={toggleDialog} task_text={modalTextTask} task_idx={modalIndexTask} updateTaskFunc={updateTask} />

        </Card >
    )
}

export default Board