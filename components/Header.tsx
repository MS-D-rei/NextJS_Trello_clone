import Image from "next/image";

const Header = () => {
  return (
    <header>
      {/* Logo */}
      <Image
        src="/images/trello-logo.svg"
        alt="trello-logo"
        width={200}
        height={100}
        className="w-44 pb-10 md:w-56 md:pb-0 object-contain"
      />

      <div className="flex items-center">
        {/* Search Box */}
        {/* Avatar */}
      </div>
    </header>
  );
};

export default Header;
