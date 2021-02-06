import { useEffect, useState } from "react"
import { Row, Container, Col } from "shards-react";
import Board from '../components/Board'

function Home() {
    const [tasks_data, setTasks_data] = useState([
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
    ])
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Board title="first" tasks={tasks_data} />
                </Col>

            </Row>
        </Container>
    )
}

export default Home