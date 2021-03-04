import { useContext, useEffect } from "react"
import { Container } from "shards-react"
import Navbar from '../components/NavbarComp'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.scss'
import { mainContext } from '../providers/AuthContext'
import BoardsList from "../components/BoardsList"

function Home() {

    const context = useContext(mainContext)

    useEffect(() => {
        console.log(context.userToken)
    }, [])

    return (
        <Container fluid className={styles.mainCont}>
            <Navbar />
            <Container className={styles.mainBoardsContainer} fluid>
                <BoardsList />
            </Container>
            <Footer />
        </Container >
    )
}

export default Home