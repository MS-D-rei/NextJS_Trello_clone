"use client";

import { RefObject, createRef, useRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNewTodoStore } from "@/store";
import { StatusType } from "@/types/board-type";

const todoStatusGroup = [
  {
    id: "todo",
    description: "New Task",
  },
  {
    id: "in-progress",
    description: "Currently working on it",
  },
  {
    id: "done",
    description: "Completed task",
  },
];

interface TodoStatusRadioGroupProps {
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
}

const TodoStatusRadioGroup: React.FC<TodoStatusRadioGroupProps> = ({
  register,
  disabled,
}) => {
  const radioButtonRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  todoStatusGroup.forEach((_, index) => {
    radioButtonRefs.current[index] = createRef<HTMLInputElement>();
  });

  const { newTodoStatus, setNewTodoStatus } = useNewTodoStore();

  const handleChange = (status: StatusType) => {
    setNewTodoStatus(status);
  };

  return (
    <div className="w-full py-4">
      <div className="w-full mx-auto max-w-md">
        <RadioGroup value={newTodoStatus} onChange={handleChange}>
          <RadioGroup.Label className="sr-only">Todo Status</RadioGroup.Label>
          <div className="space-y-2">
            {todoStatusGroup.map((status, index) => (
              <RadioGroup.Option
                key={status.id}
                value={status.id}
                className={({ active, checked }) =>
                  `${active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                    : ""
                  } ${checked ? "bg-sky-900/75 text-white" : "bg-white"
                  } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
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
                            ref={radioButtonRefs.current[index]}
                            name={status.id}
                            className="absolute w-0 opacity-0 pointer-events-none"
                          />
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${checked ? "text-sky-100" : "text-gray-500"
                            }`}
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
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TodoStatusRadioGroup;
