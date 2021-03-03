import { createContext, useEffect, useState } from "react"
import firebase from '../firebase'
const mainContext = createContext()


function AuthProvider(props) {

    const [isAuth, updateIsAuth] = useState(false)
    const [authToken, updateAuthToken] = useState("DefaultToken")

    const provider = new firebase.auth.GoogleAuthProvider()

    useEffect(() => {
        //Ok lets fetch with firebase and see if the user is logged or not!
        firebase.auth().onAuthStateChanged((user) => [
            console.log(user)
        ])
    }, [])

    const login = () => {
        firebase.auth().signInWithPopup(provider).then(result => {
            console.log(result)
        })
    }

    return (
        <mainContext.Provider
            value={{
                auth: isAuth,
                userToken: authToken,
                doLogin: login
            }}
        >
            {props.children}
        </mainContext.Provider>
    )
}

export default AuthProvider
export { mainContext }

