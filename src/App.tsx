import './App.css'
import packageJson from '../package.json'
import { ReactComponent as GithubSvg } from './assets/github.svg'

const App = () => {

  return <div style={{ display: "flex", flexDirection: "column" }}>

    <a
      style={{ display: "flex", margin: "auto", marginTop: 50 }}
      href={packageJson.repository.url}>
      {packageJson.name} on <GithubSvg height={16} fill="white" style={{ margin: "auto", marginLeft: 4 }} /> Github  →
    </a>

    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: 30, paddingBottom: 30, maxWidth: 1600, marginLeft: "auto", marginRight: "auto" }}>

      <h1>Basic Example</h1>
      <iframe src="https://codesandbox.io/embed/white-wind-it1t40?fontsize=14&hidenavigation=1&theme=dark"
        style={{ width: "100%", height: "500px", border: "1px solid #292B32", borderRadius: "4px", overflow: "hidden" }}
        title="white-wind-it1t40"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>

      <h1 style={{ marginTop: 60 }}>Autostart Loop Example</h1>
      <iframe src="https://codesandbox.io/embed/intelligent-sun-1kr0tb?fontsize=14&hidenavigation=1&theme=dark"
        style={{ width: "100%", height: "500px", border: "1px solid #292B32", borderRadius: "4px", overflow: "hidden" }}
        title="intelligent-sun-1kr0tb"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>


      <h1 style={{ marginTop: 60 }}>Scroll Example</h1>
      <iframe src="https://codesandbox.io/embed/summer-snowflake-5svkje?fontsize=14&hidenavigation=1&theme=dark"
        style={{ width: "100%", height: "500px", border: "1px solid #292B32", borderRadius: "4px", overflow: "hidden" }}
        title="summer-snowflake-5svkje"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  </div>
}

export default App
