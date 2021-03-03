
import { mainContext } from '../providers/AuthContext'
import { useContext } from "react"
import { Container, Card, Row, Col } from "shards-react"
import styles from '../styles/login.module.scss'
function Login() {
    const context = useContext(mainContext)
    return (
        <Container>
            <Row>
                <Col>
                    <Card className={styles.mainLoginCont}>
                        <img className={styles.mainLoginCont__googleImg} src="http://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=http%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fnexus2cee_Search-Thumb-150x150.png&w=150&h=150&zc=3" />
                        <h5>Effettua il login tramite Google</h5>
                        <button onClick={context.doLogin} className={styles.mainLoginCont__loginButton}>Accedi</button>
                    </Card>
                </Col>
            </Row>

        </Container>



    )
}

export default Login