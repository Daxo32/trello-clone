import { Container, Row, Col } from "shards-react"
import styles from '../styles/footer.module.scss'
function Footer() {
    return (
        <Container className={styles.footerMainCont}>
            <Row>
                <Col sm="12">
                    <p>
                        &copy; 2020
                        <a target="_blank" href="https://www.linkedin.com/in/davide-canci-638a77140/"> &nbsp;Davide Canci</a>
                        &nbsp;-&nbsp;
                        <a target="_blank" href="https://github.com/Daxo32/autodichi">Source Code</a>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer