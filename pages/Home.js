import { useEffect, useState } from "react"
import { Row, Container, Col } from "shards-react"
import Board from '../components/Board'
import Navbar from '../components/NavbarComp'


function Home() {


    const [tasks_data, setTasks_data] = useState([{ text: "Default" }])
    return (
        <Container fluid>
            <Navbar />
            <Container>
                <br /><br /><br />
                <Row>
                    <Col lg="4" sm="12">
                        <Board key="1" title="Da fare" tasks={[]} />
                    </Col>
                    <Col lg="4" sm="12">
                        <Board key="2" title="Fatto" tasks={[]} />
                    </Col>
                    <Col lg="4" sm="12">
                        <Board key="3" title="Urgente" tasks={[]} />
                    </Col>
                </Row>
            </Container>
        </Container>

    )
}

export default Home