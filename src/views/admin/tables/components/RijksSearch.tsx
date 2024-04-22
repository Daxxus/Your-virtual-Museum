// import React from 'react'
// import { Input } from '@mui/material'
import { FiSearch } from "react-icons/fi";

interface SearchProps {
	search: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RijksSearch = ({search}:SearchProps) => {
  return (
      <div className="relative mt-[3px] flex h-[61px] max-w-56 flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            onChange={search}
            className="block h-full w-full rounded-full bg-lightPrimary text-md font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>     
              
      </div>
   

  )
}

export default RijksSearch