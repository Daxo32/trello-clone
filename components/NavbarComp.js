
import { useContext } from "react"
import { NavItem, Navbar, NavbarBrand } from "shards-react"
import { mainContext } from '../providers/AuthContext'
import styles from '../styles/navbarcomp.module.scss'
function NavbarComp(props) {

    const context = useContext(mainContext)
    return (
        <Navbar className={styles.navbar} type="dark" theme="dark" expand="md">
            <NavbarBrand href="#">Trello clone</NavbarBrand>
            <div className={styles.navbar__actionsContainer}>
                {context.auth &&
                    <NavItem className={styles.navbar__userDisplayedName}>
                        {context.username}
                    </NavItem>

                }
                {context.auth &&
                    <NavItem onClick={context.doLogout} className={styles.navbar__logout}>
                        Logout
                    </NavItem>
                }
            </div>
        </Navbar>
    )
}

export default NavbarComp