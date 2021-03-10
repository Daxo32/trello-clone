
import '../styles/globals.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import Home from '../pages/Home'
import AuthProvider from '../providers/AuthContext'




function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Home {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
