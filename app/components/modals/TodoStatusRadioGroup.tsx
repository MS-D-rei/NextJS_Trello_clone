"use client";

import { RefObject, createRef, useRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { useNewTodoStore } from "@/store";
import { StatusType } from "@/types/board-type";
import TodoStatusRadioButtonCard from "@/app/components/modals/TodoStatusRadioButtonCard";

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

  const clickRef = (ref: RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

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
                  <TodoStatusRadioButtonCard
                    ref={radioButtonRefs.current[index]}
                    status={status}
                    register={register}
                    active={active}
                    checked={checked}
                    clickRef={clickRef}
                  />
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
