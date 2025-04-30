import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import styles from './Clock.module.css'

const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.header}>
      <div className={styles.timeBlock}>
        <span className={styles.time}>
          {format(time, 'HH:mm')}
          <span className={styles.seconds}>{format(time, ':ss')}</span>
        </span>
        <span className={styles.date}>{format(time, 'dd.MM.yyyy')}</span>
      </div>
      <div className={styles.actions}></div>
    </div>
  )
}

export default Clock
