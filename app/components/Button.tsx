import clsx from "clsx";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
  danger?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  secondary,
  danger,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `flex justify-center rounded-md text-sm font-semibold text-white p-2`,
        disabled && "opacity-50 cursor-default",
        secondary && "bg-gray-400 hover:bg-gray-500",
        danger && "bg-rose-500 hover:bg-rose-600",
        !secondary && !danger && "bg-sky-500 hover:bg-sky-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
