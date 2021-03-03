import { useContext, useEffect, useState } from "react"
import { Row, Container, Col, Button } from "shards-react"
import Board from '../components/Board'
import Navbar from '../components/NavbarComp'
import styles from '../styles/Home.module.scss'
import { mainContext } from '../providers/AuthContext'

function Home() {
    const [boards, setBoards] = useState([])

    const context = useContext(mainContext)

    useEffect(() => {
        //Fetch the boards
        console.log(context.userToken)
    }, [])

    const addNewBoard = () => {
        setBoards(boards.concat(
            {
                id: boards.length > 0 ? boards[boards.length - 1].id + 1 : 0,
                title: "Nuova Sezione",
                tasks: []
            }
        ))
        //Fetch with the backend to push the update
        //TO-DO
    }

    //Removes a board by the board_id
    const removeBoard = (board_id) => {
        console.log(board_id)
        let temp = boards
        temp.forEach((board, index) => {
            if (board.id == board_id) {
                console.log(index)
                temp.splice(index, 1)
            }
        })
        console.log(temp)
        setBoards([...temp])
        //Fetch with the backend to push the update
        //TO-DO
    }

    //Fetches the board info by board_id 
    const updateBoard = (board_id, board_title, board_tasks) => {
        console.log(board_id, board_title, board_tasks)
        let temp = boards
        temp.forEach((board, index) => {
            if (board.id == board_id) {
                temp[index] = {
                    id: board_id,
                    title: board_title,
                    tasks: board_tasks
                }
            }
        })
        console.log(temp)
        setBoards([...temp])
        //Fetch with the backend to push the update
        //TO-DO
    }

    return (
        <Container fluid className={styles.mainCont}>
            <Navbar />
            <Container fluid className={styles.mainCont__boardsContainer}>
                <Row className={styles.mainCont__mainRow}>
                    {boards
                        ? boards.map((board, index) => {
                            return (
                                <Col sm="12" md="6" lg="3" key={index}>
                                    <Board key={board.id} title={board.title} id={board.id} tasks={board.tasks} removeBoardFunc={removeBoard} updateBoardFunc={updateBoard} />
                                </Col>)

                        })
                        : "Loading..."
                    }
                    <Col>
                        <div className={styles.mainCont__addBoard}>
                            <Button onClick={() => addNewBoard()}>Nuova sezione</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container >


    )
}

export default Home