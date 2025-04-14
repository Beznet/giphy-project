"use client";

import React from "react";

interface SearchFormProps {
  query: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-3 mb-8 w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for GIFs..."
        className="flex-grow p-3 rounded border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </form>
  );
};

export default SearchForm;
