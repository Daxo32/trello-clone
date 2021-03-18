import { createContext, useEffect, useState } from "react"
import firebase from '../firebase'


const mainContext = createContext()

function AuthProvider(props) {

    const [isAuth, updateIsAuth] = useState(false)
    const [userName, setUserName] = useState("")
    const [userToken, setUserToken] = useState("")
    const [loading, updateLoading] = useState(true)

    const provider = new firebase.auth.GoogleAuthProvider()

    useEffect(() => {
        //Ok lets fetch with firebase and see if the user is logged or not!
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((idToken) => {
                    setUserName(user.displayName)
                    setUserToken(idToken)
                    updateIsAuth(true)
                    updateLoading(false) //Stop the loading spinner
                    console.log(idToken)
                })

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
        firebase.auth().signOut()
            .then(() => {
                console.log(userName + "logged out correctly")
                updateIsAuth(false)
                setUserName("")
                setUserToken("")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <mainContext.Provider
            value={{
                auth: isAuth,
                username: userName,
                authToken: userToken,
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

