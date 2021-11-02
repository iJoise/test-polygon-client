import React, {useEffect} from "react";
import st from "./Error.module.scss";
import {useAppDispatch, useAppSelector} from "../../hook/appHooks";
import {setAppError, setAppStatus} from "../../store/appSlice/appSlice";


export const Error: React.FC = React.memo(() => {
  const errorMessage = useAppSelector(state => state.app.errorMessage)
  const status = useAppSelector(state => state.app.appStatus)
  const dispatch = useAppDispatch()


  useEffect(() => {
    let timeout = setTimeout(() => {
      dispatch(setAppStatus('success'))
      dispatch(setAppError(null))
    }, 4000)
    return () => {
      clearTimeout(timeout)
    }
  }, [status, dispatch])

  let errorClassName = `${st.error_block} ${status === 'error' ? st.visible : st.hidden}`

  return (
    <div className={errorClassName}>
      <span className={st.error_icon}>!</span>
      <span className={st.error_message}>{errorMessage ? errorMessage : null}</span>
    </div>
  )
})
