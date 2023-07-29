"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useModalStore } from "@/store";
import Input from "@/app/components/Input";
import TodoStatusRadioGroup from "@/app/components/modals/TodoStatusRadioGroup";
import ImageUpload from "../ImageUpload";
import Button from "../Button";
import { useSelectFile } from "@/app/hooks/useSelectFile";

const AddTodoModal = () => {
  const { isAddTodoModalOpen, closeAddTodoModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      status: "todo",
      image: "",
    },
  });

  const { selectedFile, setSelectedFile, selectFile } = useSelectFile();

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    data.image = selectedFile;
    console.log(data);
  };

  return (
    <Transition.Root show={isAddTodoModalOpen} as={Fragment}>
      <Dialog
        as="form"
        onClose={closeAddTodoModal}
        className="relative z-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* gray schreen */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 z-10 overflow-y-auto">
          {/* Container to center the panel */}
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className="transform overflow-hidden
                bg-white rounded-lg shadow-xl transition-all
                sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="px-4 pt-5 pb-4 sm:pt-6 sm:pb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 mb-2"
                  >
                    Add a new todo
                  </Dialog.Title>

                  {/* Input */}
                  <Input
                    type="text"
                    id="title"
                    label="Title"
                    register={register}
                    required={true}
                    disabled={isLoading}
                    errors={errors}
                  />

                  {/* radio buttons */}
                  <TodoStatusRadioGroup
                    register={register}
                    disabled={isLoading}
                  />

                  {/* Add image */}
                  <ImageUpload
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    selectFile={selectFile}
                  />

                  {/* submit button */}
                  <Button type="submit" disabled={isLoading}>
                    Create new task
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddTodoModal;
