import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  return (
    <div className='w-3/4 h-8 mx-auto rounded-full flex flex-row'>
      <input id='doctorName' name='doctorName' type='text' className='w-full rounded-l-full shadow pl-4 ring-1 ring-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 ' placeholder='wpisz imie i nazwisko'></input>
      <button className='w-32 bg-violet-400 rounded-r-full ring-1 ring-violet-400 shadow hover:bg-violet-500'>
        <AiOutlineSearch className='ml-1 h-full float-left invert'/>
        <span className='inline-block mr-2 mt-0.5 text-white'>Wyszukaj</span>
      </button>

    </div>
  )
}