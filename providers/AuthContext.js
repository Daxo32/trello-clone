import { createContext, useEffect, useState } from "react"
import firebase from '../firebase'


const mainContext = createContext()

function AuthProvider(props) {

    const [isAuth, updateIsAuth] = useState(false)
    const [userName, setUserName] = useState("...")
    const [loading, updateLoading] = useState(true)

    const provider = new firebase.auth.GoogleAuthProvider()

    useEffect(() => {
        //Ok lets fetch with firebase and see if the user is logged or not!
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName)
                updateIsAuth(true)
                updateLoading(false) //Stop the loading spinner
            } else {
                updateIsAuth(false)
                updateLoading(false) //Stop the loading spinner
            }
        });

    }, [])

    const login = () => {
        firebase.auth().signInWithPopup(provider).then(result => {
            console.log(result)
            localStorage.setItem('userLogged', JSON.stringify(result))
            updateIsAuth(true)
        })
    }

    const logout = () => {
        firebase.auth().signOut().then(() => {
            console.log("out")
            updateIsAuth(false)
        })
    }

    return (
        <mainContext.Provider
            value={{
                auth: isAuth,
                username: userName,
                doLogin: login,
                doLogout: logout
            }}
        >
            {//If is still loggin in show the spinenr
                loading
                    ? "Loading"
                    : props.children

            }
        </mainContext.Provider>
    )
}

export default AuthProvider
export { mainContext }

