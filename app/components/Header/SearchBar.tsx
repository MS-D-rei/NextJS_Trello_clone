import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = () => {
  return (
    <form
    className="flex items-center space-x-5 
    bg-white rounded-md shadow-md 
    p-2 flex-1 md:flex-initial
    "
  >
    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
    <input
      type="text"
      placeholder="Search"
      className="flex-1 outline-none p-2"
    />
    <button type="submit" hidden>
      Search
    </button>
  </form>
  )
}

export default SearchBar;