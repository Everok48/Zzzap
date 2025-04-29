import styles from './Button.module.css'

// Определяем типы для пропсов
interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
  [key: string]: any
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  ...rest
}) => {
  return (
    <button {...rest} className={styles.button} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
