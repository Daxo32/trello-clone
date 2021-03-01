import { useState } from "react";
import { Badge, Container, Row, Col } from "shards-react";
import styles from '../styles/task.module.css'
export default function Task(props) {
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
                        <Badge theme="warning">tag</Badge>
                    </Col>
                </Row>
            </Container>
        </div >

    )
}