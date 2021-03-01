import { useEffect, useState } from "react"
import { Row, Container, Col, Button } from "shards-react"
import Board from '../components/Board'
import Navbar from '../components/NavbarComp'
import styles from '../styles/Home.module.css'


function Home() {

    const [boards, setBoards] = useState([])


    const addNewBoard = () => {
        setBoards(boards.concat(
            {
                id: boards.length > 0 ? boards[boards.length - 1].id + 1 : 0,
                title: "New Section",
                tasks: []
            }
        ))
    }

    const removeBoard = (board_id) => {
        console.log(board_id)
        let temp = boards
        boards.forEach((board, index) => {
            if (board.id == board_id) {
                console.log(index)
                temp.splice(index, 1)
            }
        })
        console.log(temp)
        setBoards([...temp])
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
                                    <Board key={index} title={board.title} id={board.id} tasks={board.tasks} removeBoardFunc={removeBoard} />
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