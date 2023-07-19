'use client';

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store";

const Modal = () => {
  const { isModalOpen, closeModal } = useModalStore();
  
  console.log('isModalOpen', isModalOpen);
  return (
    <Transition
      show={isModalOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog onClose={closeModal}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          {/* ... */}
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default Modal;
