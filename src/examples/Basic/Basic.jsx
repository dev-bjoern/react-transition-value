import { useRef } from "react";
import useTransitionValue from "../../lib/useTransitionValue";
import styles from "./Basic.module.css"

const Basic = ({ style }) => {

  const [transitionValue, setTransitionValue] = useTransitionValue(0, {
    duration: 1000,
  })

  const toFull = useRef(false)
  const onClick = () => {

    toFull.current = !toFull.current

    setTransitionValue(toFull.current ? 100 : 0)
  }

  return <div style={{ ...style }}>
    <h1><a href="/basic">Basic Example</a></h1>
    <div className={styles.container}>
      <div className={styles.progress}>
        <div
          className={styles.bar}
          style={{
            width: `${transitionValue}%`
          }} />
        <div className={styles.barText} onClick={onClick}>Click me {Math.round(transitionValue)}</div>
      </div>
    </div>
    <a style={{ display: "block", marginTop: 20 }} href="https://github.com/dev-bjoern/react-transition-value/blob/master/src/examples/Basic/Basic.jsx">view source</a>
  </div >
}

export default Basic