import { Badge, Container, Row, Col } from "shards-react";
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