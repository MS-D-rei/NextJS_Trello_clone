"use client";

import clsx from "clsx";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  register,
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium leading-6 text-gray-900 mb-2">{label}</label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id)}
        className={clsx(
          `w-full border rounded-md shadow-sm text-gray-900 px-3 py-2 focus:outline-blue-400`,
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  );
};

export default Input;
