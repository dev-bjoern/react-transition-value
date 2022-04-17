import { useRef } from "react";
import useTransitionValue from "../../lib/useTransitionValue";
import styles from "./Scroll.module.css"

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}


const Basic = ({ style }) => {

  const container = useRef()

  const [scrollValue, setScrollValue] = useTransitionValue(0, {
    duration: 1000,
    easing: easeOutExpo,
    onStep({ value }) {
      container.current.scrollTop = value
    }
  })

  const scrollToBottom = () => setScrollValue(container.current.scrollHeight - container.current.clientHeight, {
    from: container.current.scrollTop
  })

  const scrollToTop = () => setScrollValue(0, {
    from: container.current.scrollTop
  })

  return <div style={{ ...style }}>
    <h1><a href="/scroll">Scroll Example</a></h1>
    <div ref={container} className={styles.container}>
      <div className={styles.scroller}>
        <div className={styles.top}>top</div>
        <div className={styles.middle}>middle</div>
        <div className={styles.bottom}>bottom</div>
      </div>
    </div>
    <div style={{ marginTop: 20 }}>
      <button onClick={scrollToBottom}>Scroll to bottom</button>
      {" "}
      <button onClick={scrollToTop}>Scroll to top</button>
      <a style={{ display: "block", marginTop: 20 }} href="https://github.com/dev-bjoern/react-transition-value/blob/master/src/examples/Scroll/Scroll.jsx">view source</a>
    </div>
  </div>

}

export default Basic