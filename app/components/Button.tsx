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
        `flex justify-center rounded-md text-sm font-semibold p-2`,
        disabled && "opacity-50 cursor-default",
        secondary && "text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300",
        danger && "text-white bg-rose-500 hover:bg-rose-600",
        !secondary && !danger && "text-white bg-sky-500 hover:bg-sky-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
