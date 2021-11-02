import {useRef} from "react";


export function useDebounce<F extends ((...args: any) => any)>(
  callback: F, delay: number
) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return (...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    return new Promise(resolve => {
      timer.current = setTimeout(() => {
        callback(...args)
      }, delay)
    })

  }
}