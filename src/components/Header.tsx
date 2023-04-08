import styles from './Header.module.css'
import Rocket from '../assets/rocket.svg'

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Rocket} alt="Logo" />
        <strong>
          to<span>do</span>
        </strong>
      </div>
    </div>
  )
}
