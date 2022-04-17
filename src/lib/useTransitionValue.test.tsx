import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import useTransitionValue from './useTransitionValue'

// const sleep = (ms: number): Promise<number> => new Promise((r) => setTimeout(r, ms))
// const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

test('should return start value and setter function', () => {
  const { result } = renderHook(() => useTransitionValue(0))

  expect(result.current[0]).toBe(0)
  expect(typeof result.current[1]).toBe('function')
})

test('should call onDone and autostart', async () => {

  const to = 1000
  const duration = 400
  const onDone = jest.fn()

  const { result } = renderHook(() => useTransitionValue(0, {
    onDone,
    to,
    autoStart: true,
    duration
  }))

  // onDone should be called within duration
  await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1), { timeout: duration + 100 })

  // target value should be set
  await waitFor(() => expect(result.current[0]).toBe(to), { timeout: duration + 100 })

  const newTo = 1500
  const newDuration = 200
  const newOnDone = jest.fn()

  // call useTranstion setter with new options
  result.current[1](newTo, {
    onDone: newOnDone,
    duration: newDuration,
  })

  // newOnDone should be called within (new) newDuration
  await waitFor(() => expect(newOnDone).toHaveBeenCalledTimes(1), { timeout: newDuration + 100 })

  // new target value should be set
  await waitFor(() => expect(result.current[0]).toBe(newTo), { timeout: newDuration + 100 })
})

test('should not autostart', async () => {

  const to = 1000
  const duration = 400
  const onDone = jest.fn()

  const { result } = renderHook(() => useTransitionValue(0, {
    to,
    duration,
    onDone
  }))

  // target value shoudl stay 0
  await waitFor(() => expect(result.current[0]).toBe(0), { timeout: duration + 100 })

  // onDone should not be called
  await waitFor(() => expect(onDone).not.toHaveBeenCalled(), { timeout: duration + 100 })
})

test('should transition to the target value', async () => {

  const duration = 400
  const to = 1000

  const { result } = renderHook(() => useTransitionValue(0, {
    to,
    autoStart: true,
    duration
  }))

  expect(result.current[0]).toBe(0)

  await waitFor(() => expect(result.current[0]).toBe(to), { timeout: duration + 100 })

  const newTo = 2000

  // call useTranstion setter with new target value
  result.current[1](newTo)

  // new target value should be set
  await waitFor(() => expect(result.current[0]).toBe(newTo), { timeout: duration + 100 })
})

test('should update target value in running transition', async () => {

  const duration = 500
  const onDone = jest.fn()
  const to = 1000

  const { result } = renderHook(() => useTransitionValue(0, {
    to,
    autoStart: true,
    duration,
    onDone
  }))

  // wait until first transition is about midway through...
  await waitFor(() => expect(result.current[0]).toBeGreaterThan(to / 3), { timeout: duration / 2 })

  // ...then star a new transition (that trsnsition should update the running transition)
  const newDuration = 1000
  const newOnDone = jest.fn()
  const newTo = 1500

  // call useTranstion setter with new options
  result.current[1](newTo, {
    onDone: newOnDone,
    duration: newDuration,
  })

  // wait until the transition reaches its first specified to
  await waitFor(() => expect(result.current[0]).toBeGreaterThan(to), { timeout: newDuration / 2 })

  // because we started a new transition the intial onDone should not have been called by now
  expect(onDone).not.toHaveBeenCalled()

  await waitFor(() => expect(result.current[0]).toBe(newTo), { timeout: newDuration + 100 })

  // both initial onDone and new onDone shoud now be called
  await waitFor(() => expect(newOnDone).toHaveBeenCalledTimes(1), { timeout: newDuration + 100 })
  await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1), { timeout: newDuration + 100 })
})
