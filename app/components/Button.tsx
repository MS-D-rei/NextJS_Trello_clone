import clsx from "clsx";

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
  danger?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, disabled, onClick, danger, children }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `flex justify-center rounded-md text-sm font-semibold`,
        disabled && 'opacity-50 cursor-default',
        danger && 'bg-rose-500 hover:bg-rose-600',
        !danger && 'bg-sky-500 hover:bg-sky-600'
        )}
    >
      {children}
    </button>
  )
};

export default Button;