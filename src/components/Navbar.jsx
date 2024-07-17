import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="w-full py-5 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width gap-7">
        <img src={appleImg} alt="Apple" width={14} height={18} />

        <div className="flex flex-1 justify-center max-md:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-not-allowed text-gray hover:text-white transition-all"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-7 cursor-not-allowed max-md:justify-end max-md:flex-1">
          <img
            src={searchImg}
            alt="search"
            width={18}
            height={18}
            className="max-md:hidden"
          />
          <img src={bagImg} alt="bag" width={18} height={18} />

          <div className="flex flex-col justify-center items-center w-6 h-5 space-y-1 md:hidden">
            <span className="w-full h-0.5 bg-white"></span>
            <span className="w-full h-0.5 bg-white "></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
