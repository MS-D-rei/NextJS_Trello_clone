"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useModalStore } from "@/store";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isModalOpen, closeModal } = useModalStore();

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" onClose={closeModal} className="relative z-50">
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
            aria-hidden={true}
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
                className="transform overflow-hidden bg-white 
              rounded-lg text-left shadow-xl transition-all 
              sm:my-8 sm:w-full sm:max-w-lg"
              >
                {/* <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500
                    focus:outline-none p-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div> */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
