"use client";

import Global from "@/src/assets/svg/Global";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onLanguageToggle?: () => void;
  language?: "ko" | "en";
};

const SearchBar = ({
  value,
  onChange,
  placeholder = "검색...",
  onLanguageToggle,
  language = "ko",
}: Props) => {
  return (
    <div className="w-full p-1 bg-white flex gap-2 items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
      />
      <button className="cursor-pointer" onClick={onLanguageToggle}>
        <Global />
      </button>
    </div>
  );
};

export default SearchBar;
