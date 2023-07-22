"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";

const ConfirmModal = () => {
  return (
    <Modal>
      <div className="flex px-4 pt-5 pb-4 sm:pt-6 sm:pb-4">
        <div className="flex items-start">
          <div
            className="flex items-center justify-center 
        h-10 w-10 rounded-full shrink-0 mx-auto bg-red-100
        sm:mx-0"
          >
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 sm:ml-4 sm:mt-0 ms:text-left">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900"
            >
              Delete Todo
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this todo? This action cannot be
                undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 bg-gray-50 px-4 py-3 sm:px-6">
        <Button type="button" secondary>
          Cancel
        </Button>
        <Button type="button" danger>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
