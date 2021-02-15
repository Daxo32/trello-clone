import { useEffect, useState } from "react"
import { Row, Container, Col, Button } from "shards-react"
import Board from '../components/Board'
import Navbar from '../components/NavbarComp'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from '../styles/Home.module.css'


function Home() {

    const [boards, setBoards] = useState([])


    const addNewBoard = () => {
        console.log(boards)
        setBoards(boards.concat(
            {
                id: 0,
                title: "New Section",
                tasks: []
            }
        ))
    }

    return (
        <Container fluid className={styles.main_cont}>
            <Navbar />
            <Container fluid className={styles.boards_container}>
                <Row className={styles.main_row}>
                    {boards
                        ? boards.map((board, index) => {
                            return (
                                <Col sm="12" md="6" lg="3" key={index}>
                                    <Board key={index} title={board.title} tasks={board.tasks} />
                                </Col>)

                        })
                        : "Loading..."
                    }
                    <Col>
                        <div className={styles.add_board}>
                            <Button onClick={() => addNewBoard()}>ADD</Button>
                        </div>
                    </Col>

                </Row>

            </Container>
        </Container>


    )
}

export default Home