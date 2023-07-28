'use client';

import { RefObject, forwardRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface TodoStatusRadioButtonCardProps {
  status: {
    id: string;
    description: string;
  };
  register: UseFormRegister<FieldValues>;
  active: boolean;
  checked: boolean;
}

const TodoStatusRadioButtonCard = forwardRef(
  function todoStatusRadioButtonCardRender(
    { status, register, active, checked }: TodoStatusRadioButtonCardProps,
    ref
  ) {
    const inputRef = ref as RefObject<HTMLInputElement>;
    return (
      <>
        <div className="flex w-full items-center justify-between">
          <div className="text-sm">
            <RadioGroup.Label
              as="p"
              className={`relative font-medium ${checked ? "text-white" : "text-gray-900"
                }`}
            >
              {status.id}
              <input
                id={status.id}
                type="radio"
                {...register("status")}
                ref={inputRef}
                name={status.id}
                className="absolute w-0 opacity-0 pointer-events-none"
              />
            </RadioGroup.Label>
            <RadioGroup.Description
              as="span"
              className={`inline ${checked ? "text-sky-100" : "text-gray-500"}`}
            >
              {status.description}
            </RadioGroup.Description>
          </div>
          {checked && (
            <div className="shrink-0 p-0 rounded-full sm:mr-2">
              <CheckCircleIcon className="w-6 h-6 text-gray-50" />
            </div>
          )}
        </div>
      </>
    );
  }
);

export default TodoStatusRadioButtonCard;
