import { useEffect, useState } from "react"
import styles from '../styles/board.module.css'
import { Row, Container, Col, Card, CardBody, CardHeader, element } from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


function Board(props) {
    const tasks = [
        {
            text: 'gary',
            id: 1
        },
        {
            text: 'jhon',
            id: 2
        },
        {
            text: 'red',
            id: 3
        }
    ]

    return (
        <Card>
            <CardHeader><h1>{props.title}</h1></CardHeader>
            <CardBody>
                <DragDropContext>
                    <Droppable droppableId="characters">
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map(({ text, id }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={"draggable-" + id} index={index}>
                                            {(provided) => (
                                                <Card
                                                    innerRef={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <CardBody>
                                                        <h4>{text}</h4>
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
        </Card>
    )
}

export default Board