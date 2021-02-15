import { useEffect, useState } from "react"
import styles from '../styles/board.module.css'
import { Card, CardBody, CardHeader, CardFooter, FormInput } from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditText } from 'react-edit-text';
import Task from '../components/Task'
import 'react-edit-text/dist/index.css';


function Board(props) {
    const [boardTitle, setBoardTitle] = useState(props.title)
    const [tasks, updateTasks] = useState(props.tasks)//Next fetch with a DB for tasks
    const [inputData, setInputData] = useState() //New task

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
        if (event.keyCode == 13) {
            tasks.push({ text: inputData })
            updateTasks([...tasks])
            //FETCH
            //TODO fetch to API

        }
    }


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
                <h5>{props.id}</h5>
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
                                                <Card key={"drag-" + text} className={styles.task_card}
                                                    innerRef={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <CardBody key={index} className={styles.card_body}>
                                                        <Task key={index} text_v={text} />
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
        </Card>
    )
}

export default Board