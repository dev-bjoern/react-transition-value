import useTransitionValue from "../../lib/useTransitionValue"
import styles from "./AutoStart.module.css"

const easeOutBack = (x) => {
  const c1 = 1.70158
  const c3 = c1 + 1

  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

const AutoStart = ({ style }) => {

  const [transitionOpacity, setTransitionOpacity] = useTransitionValue(0.5, {
    duration: 1000,
    to: 1,
    autoStart: true,
  })

  const [transitionValue, setTransitionValue, { pause, resume }] = useTransitionValue(0, {
    to: 80,
    duration: 1000,
    autoStart: true,
    easing: easeOutBack,
    onDone({ to }) {
      if (to === 80) {
        setTransitionValue(10)
        setTransitionOpacity(0.5)
      } else {
        setTransitionValue(80)
        setTransitionOpacity(1)
      }
    }
  })

  return <div style={{ ...style }}>
    <h1><a href="/autoStart">Autostart Loop Example</a></h1>
    <div className={styles.container}>
      <div
        className={styles.mover}
        style={{
          top: `${transitionValue}%`,
          opacity: transitionOpacity
        }}>target</div>
    </div>
    <div style={{ marginTop: 20 }}>
      <button onClick={pause}>pause</button>
      {" "}
      <button onClick={resume}>resume</button>
      <a style={{ display: "block", marginTop: 20 }} href="#">view source</a>
    </div>
  </div>
}

export default AutoStart