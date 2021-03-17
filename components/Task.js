import { Badge, Container, Row, Col } from "shards-react";

import { useState } from "react"
import { useEffect } from "react/cjs/react.development";


export default function Task(props) {
    const [priorityTaskTheme, setTaskPriorityTheme] = useState("info")
    const [priorityTaskLabel, setPriorityTaskLabel] = useState("Normale")
    useEffect(() => {
        switch (props.priority) {
            case 0:
                setTaskPriorityTheme("info")
                setPriorityTaskLabel("Normale")
                break
            case 1:
                setTaskPriorityTheme("warning")
                setPriorityTaskLabel("Medio")
                break
            case 2:
                setTaskPriorityTheme("danger")
                setPriorityTaskLabel("Urgente")
                break
            default:
                setTaskPriorityTheme("info")
                setPriorityTaskLabel("Normale")
        }
    })

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <p>{props.text_v}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Badge theme={priorityTaskTheme}>{priorityTaskLabel}</Badge>
                    </Col>
                </Row>
            </Container>
        </div >

    )
}

