
import { Container } from "shards-react"
import Navbar from '../components/NavbarComp'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.scss'
import BoardsList from "../components/BoardsList"
import withAuth from "../components/withAuth"
import { useEffect } from "react/cjs/react.development"



function Home(props) {
    useEffect(() => {
        console.log(props)
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

export default withAuth(Home)