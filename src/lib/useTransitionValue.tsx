import { useCallback, useEffect, useRef, useState } from "react"

// from https://easings.net/de#easeOutBack
function easeOutExpo(x: number) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

type useTransitionOptions = {
  from: number,
  to: number,
  duration: number,
  autoStart: boolean,
  easing: Function,
  onDone: Function,
  onStep: Function,
}

const useTransitionValue = (
  from = 0,
  options?: Partial<useTransitionOptions>, // options are ... optional
): [number, Function, object] => {

  const settings = {
    ...{
      // default options
      from,
      to: 100,
      duration: 200,
      autoStart: false,
      easing: easeOutExpo,
      onDone: (args: object) => { },
      onStep: (args: object) => { },
    }, ...options
  }

  const [value, setValue] = useState(settings.from)
  const animationFrame = useRef<number>()
  const startTime = useRef<number>()
  const currentValue = useRef(from)
  const currentTo = useRef(settings.to)

  const start = useCallback((to = settings.to, {
    // allow override of intial options
    from = currentValue.current,
    duration = settings.duration,
    easing = settings.easing,
    onDone = () => { },
    onStep = () => { },
  } = {}) => {

    if (typeof to !== "number") {

      throw new Error("please supply a 'to' value")
    }

    const loop = () => {

      animationFrame.current = requestAnimationFrame(onFrame)
    }

    const onFrame = () => {

      // time elapsed since start of transition
      const elapsed = Date.now() - startTime.current!

      // total distance between start and target value
      const distance = to - from

      // distance traveled so far between start and target value
      const traveled = (distance / duration) * elapsed

      // percentage traveled so far
      const percentage = (100 / distance) * traveled

      // factor (between 0 - 1) traveled so far
      const factor = percentage / 100

      // elapsed may be greater than duration which can happen if animationFrame/loop 'overshoots' duration time (it fires async after all)
      const isFinished = elapsed >= duration

      const newEasedValue = isFinished ? to : from + easing(factor) * distance
      currentValue.current = newEasedValue
      setValue(newEasedValue)

      currentTo.current = to

      const onStepArgs = { from, to, value: newEasedValue }
      settings.onStep(onStepArgs)
      onStep(onStepArgs)

      if (isFinished) {
        // console.log("done")
        const ondoneArgs = { from, to, value: newEasedValue }
        settings.onDone(ondoneArgs)
        onDone(ondoneArgs)
      } else {
        loop()
      }
    }

    if (animationFrame.current) cancelAnimationFrame(animationFrame.current)

    // dont start loop if allready at target value (would cause distance equaling 0 and by 0 division error)
    if (from === to) return

    startTime.current = Date.now()

    console.log("from", from)
    console.log("to", to)

    loop()

  }, [settings.duration, settings.easing, settings.onDone, settings.onStep, settings.to])


  // const pauseTime = useRef<number>()
  const pause = useCallback(() => {

    if (animationFrame.current) {
      // pauseTime.current = Date.now()
      cancelAnimationFrame(animationFrame.current)
    }
  }, [])

  const resume = useCallback((options) => {

    // if (pauseTime.current && startTime.current) {

    // const restDuration = pauseTime.current - startTime.current
    start(currentTo.current, options)
    // }
  }, [])

  useEffect(() => {

    if (settings.autoStart) {
      start()
    }

  }, [settings.autoStart])

  useEffect(() => {

    return () => {
      // TODO: fix animationFrame.current! wokraround
      cancelAnimationFrame(animationFrame.current!)
    }
  }, [])

  return [value, start, { pause, resume }]
}

export default useTransitionValue
export { useTransitionValue }