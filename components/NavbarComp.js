
import { useContext } from "react"
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Container, Row, Col } from "shards-react"
import { mainContext } from '../providers/AuthContext'
import styles from '../styles/navbarcomp.module.scss'
function NavbarComp(props) {

    const context = useContext(mainContext)
    return (
        <Navbar className={styles.navbar} type="dark" theme="dark" expand="md">
            <NavbarBrand href="#">Trello clone</NavbarBrand>
            <div className={styles.navbar__actionsContainer}>
                <NavItem className={styles.navbar__userDisplayedName}>
                    {context.username}
                </NavItem>

                <NavItem onClick={context.doLogout} className={styles.navbar__logout}>
                    Logout
                </NavItem>
            </div>







        </Navbar>
    )
}

export default NavbarComp