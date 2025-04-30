import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ children, title, ...rest }) => {
  return (
    <button className={styles.button} title={title} {...rest}>
      {children}
    </button>
  );
};

export default Button;