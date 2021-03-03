
import { mainContext } from '../providers/AuthContext'
import { useContext } from "react"
function Login() {
    const context = useContext(mainContext)
    return <div onClick={context.doLogin}>Fai login D:</div>
}

export default Login