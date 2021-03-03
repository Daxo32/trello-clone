import { useContext, useEffect } from "react"
import { Container } from "shards-react"
import BoardsManager from '../components/BoardsManager'
import Navbar from '../components/NavbarComp'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.scss'
import { mainContext } from '../providers/AuthContext'

function Home() {

    const context = useContext(mainContext)

    useEffect(() => {
        //Fetch the boards
        console.log(context.userToken)
    }, [])

    return (
        <Container fluid className={styles.mainCont}>
            <Navbar />
            <BoardsManager />
            <Footer />
        </Container >


    )
}

export default Home