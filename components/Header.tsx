import Image from "next/image";
import Avatar from "@/components/Avatar";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  return (
    <header>
      <div
        className="flex flex-col md:flex-row items-center 
        p-5 bg-gray-500/10 rounded-b-2xl
        "
      >
        {/* Logo */}
        <Image
          src="/images/trello-logo.svg"
          alt="trello-logo"
          width={200}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex items-center flex-1 justify-end space-x-5">
          {/* Search Bar*/}
          <SearchBar />
          {/* Avatar */}
          <Avatar />
        </div>
      </div>
    </header>
  );
};

export default Header;
