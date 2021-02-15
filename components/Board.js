import { useEffect, useState } from "react"
import styles from '../styles/board.module.css'
import { Card, CardBody, CardHeader, Badge, CardFooter, FormInput } from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


function Board(props) {
    const [boardTitle, setBoardTitle] = useState(props.title)//Next fetch with a DB for title too
    const [tasks, updateTasks] = useState(props.tasks)//Next fetch with a DB for tasks
    const [inputData, setInputData] = useState() //New task

    const onDragEnds = (result) => {
        if (!result.destination) return
        let local = Array.from(tasks)
        //Ok remove the element from the update the value of the destination position
        let [new_item] = local.splice(result.source.index, 1)
        console.log(new_item)
        local.splice(result.destination.index, 0, new_item)
        updateTasks(local)
    }

    const handleEnter = (event) => {
        if (event.keyCode == 13) {
            tasks.push({ text: inputData })
            updateTasks([...tasks])
            console.log(tasks)
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
                <p>
                    {"Testo il save: " + boardTitle}
                </p>
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
                                                <Card key={index} className={styles.task_card}
                                                    innerRef={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <CardBody key={index} className={styles.card_body}>
                                                        <p>{text}</p>
                                                        <Badge theme="warning">tag</Badge>
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
                <FormInput size="sm" placeholder="Inserisci" onChange={(evt) => setInputData(evt.target.value)} className="mb-2" onKeyDown={handleEnter} />
            </CardFooter>
        </Card>
    )
}

export default Board