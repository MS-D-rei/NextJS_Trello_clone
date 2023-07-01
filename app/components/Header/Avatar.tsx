"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";

const Avatar = () => {
  return (
    <div className="rounded-full">
      <UserCircleIcon className="h-14 w-14 text-gray-400" />
    </div>
  );
};

export default Avatar;
