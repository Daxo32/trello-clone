import { Badge, Container, Row, Col } from "shards-react";
import { HiX } from "react-icons/hi";
export default function Task(props) {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <p>{props.text_v}</p>
                    </Col>
                    <Col sm="2">
                        <HiX onClick={() => { props.deltask(props.index_board, props.index_task) }} size="1.8em" />
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