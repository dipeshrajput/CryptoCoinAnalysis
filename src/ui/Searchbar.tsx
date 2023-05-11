import { SearchIcon } from "../../public/assets/icons";

const Searchbar = () => {
  return (
    <div className="flex items-center relative">
      <SearchIcon className="absolute left-3.5 h-6 w-6 text-neutral-400" />
      <input
        className="rounded-xl bg-neutral-200/70 px-2 py-3 pl-11 focus:outline-none "
        placeholder="Search..."
      />
    </div>
  );
};

export default Searchbar;
