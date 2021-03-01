import { useEffect, useState } from "react"
import styles from '../styles/board.module.css'
import { Card, CardBody, CardHeader, CardFooter, FormInput } from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditText } from 'react-edit-text';
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
        //FETCH TO API TO RETRIEVE THE TASKS FOR THE BOARD
    }, [])

    const onDragEnds = (result) => {
        if (!result.destination) return
        let local = Array.from(tasks)
        //Ok remove the element from the update the value of the destination position
        let [new_item] = local.splice(result.source.index, 1)

        local.splice(result.destination.index, 0, new_item)
        updateTasks(local)
        //FETCH
        //TODO fetch to API

    }

    const handleEnter = (event) => {
        console.log(tasks[0])
        if (event.keyCode == 13) {
            tasks.push({ text: inputData })
            updateTasks([...tasks])
            //FETCH
            //TODO fetch to API

        }
    }

    const updateTask = (task_index, task_text) => {
        console.log(task_index)
        console.log(task_text)
        let temp = tasks
        temp[task_index] = ({ text: task_text })
        updateTasks([...tasks])
        //UPDATE TASK INFO 
        //FETCH
        //TODO fetch to API
    }

    //Set the current task hooks and opens the modal
    const openDialog_func = (idx, txt) => {
        setModalTextTask(txt)
        setModalIndexTask(idx)
        toggleDialog(!openDialog)
    }
    //

    return (
        <Card className={styles.panel}>
            <CardHeader className={styles.card_header}>
                <h5>
                    <EditText
                        name="textbox1"
                        value={boardTitle}
                        onChange={setBoardTitle}
                    />
                </h5>
                {/* <h5>{props.id}</h5> */}
            </CardHeader>
            <CardBody className={styles.card_body}>
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
                <FormInput size="sm" placeholder="Inserisci task" onChange={(evt) => setInputData(evt.target.value)} className="mb-2" onKeyDown={handleEnter} />
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