import Image from "next/image";
import Avatar from "@/components/Avatar";
import SearchBar from "@/components/SearchBar";
import GPTSummerizingBox from "@/components/GPTSummarizingBox";

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

        {/* Search Bar and Avatar*/}
        <div className="flex items-center flex-1 w-full justify-end space-x-5">
          <SearchBar />
          <Avatar />
        </div>
      </div>

      <div className="flex items-center justify-center py-2 md:py-5">
        <GPTSummerizingBox />
      </div>
    </header>
  );
};

export default Header;
