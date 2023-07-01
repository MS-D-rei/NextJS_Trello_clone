import { UserCircleIcon } from "@heroicons/react/24/solid";

const GPTSummarizingBox = () => {
  return (
    <div className="flex items-center bg-white max-w-3xl rounded-xl shadow-xl p-2 pr-5">
      <UserCircleIcon className="h-10 w-10 text-sky-500" />
      <p className="text-sm font-medium text-blue-800">
        GPT is summering your tasks for the day...
      </p>
    </div>
  );
};

export default GPTSummarizingBox;
