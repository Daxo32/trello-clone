import { useContext, useEffect, useState } from "react"
import { Row, Container, Col, Button } from "shards-react"
import BoardsManager from '../components/BoardsManager'
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

    return (
        <Container fluid className={styles.mainCont}>
            <Navbar />
            <BoardsManager />
        </Container >


    )
}

export default Home