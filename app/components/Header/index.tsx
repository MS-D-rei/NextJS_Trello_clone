import Image from "next/image";
import Avatar from "@/app/components/Header/Avatar";
import SearchBar from "@/app/components/Header/SearchBar";
import GPTSummerizingBox from "@/app/components/Header/GPTSummarizingBox";

const Header = () => {
  return (
    <header>
      <div
        className="flex flex-col md:flex-row items-center p-5"
      >

        <div
          className="absolute top-0 left-0
          w-full h-96 bg-gradient-to-b from-pink-400 via-purple-400 to-blue-400
          rounded-b-2xl filter blur-3xl opacity-50 -z-50"
        />

        {/* Logo */}
        <Image
          src="/images/trello-logo.svg"
          alt="trello-logo"
          priority={true}
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
