
import { Container } from "shards-react"
import Navbar from '../components/NavbarComp'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.scss'
import BoardsList from "../components/BoardsList"



function Home(props) {

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