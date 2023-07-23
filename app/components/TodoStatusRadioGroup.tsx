"use client";

import { useBoardStore } from "@/store";
import { RadioGroup } from "@headlessui/react";

const todoStatusGroup = [
  {
    id: "todo",
    description: "A new Task to be completed",
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

const TodoStatusRadioGroup = () => {
  const { newTodoStatus, setNewTodoStatus } = useBoardStore();

  return (
    <div className="w-full py-4">
      <div className="w-full mx-auto max-w-md">
        <RadioGroup value={newTodoStatus} onChange={setNewTodoStatus}>
          <RadioGroup.Label className="sr-only">Todo Status</RadioGroup.Label>
          <div className="space-y-2">
            {todoStatusGroup.map((status) => (
              <RadioGroup.Option
                key={status.id}
                value={status.id}
                className={({ active, checked }) =>
                  `${active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                    : ""
                  } ${checked
                    ? "bg-sky-900 bg-opacity-75 text-white"
                    : "bg-white"
                  } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="w-full items-center justify-between text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium ${checked ? "text-white" : "text-gray-900"
                          }`}
                      >
                        {status.id}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={`inline ${checked ? "text-sky-100" : "text-gray-500"
                          }`}
                      >
                        {status.description}
                      </RadioGroup.Description>
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
