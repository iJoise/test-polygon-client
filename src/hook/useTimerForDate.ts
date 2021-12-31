import {useEffect, useRef, useState} from "react";
import {batch} from "react-redux";


export const useTimerForDate = (date: number) => {
  const [timer, setTimer] = useState({
    seconds: '00',
    minute: '00'
  });
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(Math.round(Date.now() - Math.round(date)) / 1000);
  const intervalId = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (isActive) {
      intervalId.current = setInterval(() => {
        const secondCounter = Math.floor(counter % 60);
        const minuteCounter = Math.floor(counter / 60);

        batch(() => {
          setTimer({
            seconds: String(secondCounter).padStart(2, '0'),
            minute: String(minuteCounter).padStart(2, '0')
          })
          setCounter(counter => counter + 1);
        })

      }, 1000)
    }

    return () => clearInterval(intervalId.current as ReturnType<typeof setInterval>);
  }, [isActive, counter])

  const stopTimer = () => {
    batch(() => {
      setIsActive(false);
      setCounter(0);
      setTimer({
        seconds: '00',
        minute: '00'
      });
    })
    clearInterval(intervalId.current as ReturnType<typeof setInterval>);
  }

  return {
    timer,
    isActive,
    stopTimer,
    runTimer: setIsActive
  }
}
