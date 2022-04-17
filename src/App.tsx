import './App.css'
import AutoStart from './examples/AutoStart'
import Basic from './examples/Basic'
import Scroll from './examples/Scroll'
import packageJson from '../package.json'
import { ReactComponent as GithubSvg } from './assets/github.svg'

const App = () => {

  return <div style={{ display: "flex", flexDirection: "column" }}>

    <a
      style={{ display: "flex", margin: "auto", marginTop: 50 }}
      href={packageJson.repository.url}>
      {packageJson.name} on <GithubSvg height={16} fill="white" style={{ margin: "auto", marginLeft: 4 }} /> Github  →</a>

    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: 30, paddingBottom: 30, maxWidth: 1600, marginLeft: "auto", marginRight: "auto" }}>

      {window.location.pathname === "/" &&
        <>
          <Basic style={{ margin: 30 }} />
          <AutoStart style={{ margin: 30 }} />
          <Scroll style={{ margin: 30 }} />
        </>
      }

      {window.location.pathname === "/basic" &&
        <Basic style={{ marginTop: 30 }} />
      }

      {window.location.pathname === "/autoStart" &&
        <AutoStart style={{ marginTop: 30 }} />
      }

      {window.location.pathname === "/scroll" &&
        <Scroll style={{ marginTop: 30 }} />
      }
    </div>
  </div>
}

export default App
