import '../styles/globals.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import Home from '../pages/Home'

function MyApp({ Component, pageProps }) {
  return <Home {...pageProps} />
}

export default MyApp
