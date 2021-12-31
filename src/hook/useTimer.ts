import {useEffect, useState} from "react";
import {batch} from "react-redux";


export const useTimer = () => {
  const [time, setTime] = useState({
    seconds: '00',
    minute: '00'
  });
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: String(secondCounter);
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: String(minuteCounter);

        batch(() => {
          setTime({
            seconds: computedSecond,
            minute: computedMinute
          })
          setCounter(counter => counter + 1);
        })
      }, 1000)
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter])

  const stopTimer = () => {
    setIsActive(false);
    setCounter(0);
    setTime({
      seconds: '00',
      minute: '00'
    });
  }

  console.log(time.seconds)
  return {
    time,
    isActive,
    stopTimer,
    runTimer: setIsActive
  }
}
