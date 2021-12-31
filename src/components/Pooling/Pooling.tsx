import React, {useMemo} from "react";
import {usePoolingStatus} from "../../hook/usePoolingStatus";
import com from "../../style/common.module.scss";
import {Button} from "../../features/Button/Button";

const getClassName = (data: number, prev: number = 0) => {
  return data === prev ? '' : data > prev ? 'blue' : 'red'
}

export const Pooling: React.FC = () => {
  const {
    data,
    prevData,
    pollingInterval,
    refetch,
    timer,
    pauseFetching,
    stopFetching,
  } = usePoolingStatus()

  const firstClassName = useMemo(() => getClassName(data.first, prevData.current?.first), [data, prevData])
  const secondClassName = useMemo(() => getClassName(data.second, prevData.current?.second), [data, prevData])
  const thirdClassName = useMemo(() => getClassName(data.third, prevData.current?.third), [data, prevData])

  return (
    <>
      <h1>{pollingInterval === 0 ? 'Не грузим данные' : 'Грузим данные'}</h1>
      <div>
        <table>
          <tbody>
          <tr>
            <th>Pair name</th>
            <th>First</th>
            <th>Second</th>
            <th>Third</th>
          </tr>
          <tr>
            <td>RandomNumber</td>
            <td className={com[firstClassName]}>{data.first}</td>
            <td className={com[secondClassName]}>{data.second}</td>
            <td className={com[thirdClassName]}>{data.third}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div style={{display: "flex", alignItems: 'center'}}>
        <div style={{width: '200px'}}>
          <Button rounded={false} color={'pink'} onClick={refetch}>Refetch</Button>
          <Button rounded={false} color={'dark-blue'} onClick={stopFetching}>Стоп</Button>
          <Button rounded={false} color={'light-blue'} onClick={pauseFetching}>
            {pollingInterval === 0 ? 'Старт' : 'Пауза'}
          </Button>
        </div>
        <div style={{marginLeft: 20, fontSize: 40}}>{timer.minute}:{timer.seconds}</div>
      </div>
    </>
  )
}
