import {useEffect, useRef, useState} from "react";
import {RandomResponseType, useGetRandomNumberQuery} from "../api/service/rtq-service";
import {useTimerForDate} from "./useTimerForDate";

const initData: RandomResponseType = {
  first: 0,
  second: 0,
  third: 0,
}

export const usePoolingStatus = () => {
  const [pollingInterval, setPollingInterval] = useState(3000);
  const prevData = useRef<RandomResponseType | null>(null);
  const {data = initData, refetch} = useGetRandomNumberQuery({
    first: 5,
    second: 30,
    third: 50
  }, {pollingInterval})
  const {timer, runTimer, stopTimer, isActive} = useTimerForDate(Date.now())

  const stopFetching = () => {
      setPollingInterval(0)
      stopTimer()
  }

  const pauseFetching = () => {
    setPollingInterval(pollingInterval === 0 ? 3000 : 0)
    runTimer(!isActive)
  }

  useEffect(() => {
    if (data) {
      prevData.current = data
      !isActive && runTimer(true)
    }
    //eslint-disable-next-line
  }, [data])

  return {
    data,
    prevData,
    pollingInterval,
    refetch,
    timer,
    pauseFetching,
    stopFetching,
  }
}

//213
