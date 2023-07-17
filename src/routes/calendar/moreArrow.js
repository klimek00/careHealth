export default function MoreArrow({point, move}) {
  //cannot use tailwindcss's classname and `${}` because -rotate buggs
  let style = {
    transform: `rotate(${point==='right' ? '' : '-'}90deg)`
  }
  return (
    <div className='calendarArrow my-auto'>
      <button className="p-2 rounded-full bg-slate-200 hover:bg-slate-400" onClick={(e) => move(e, point==='right' ? true : false)}>
        <div className='h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-blue-600' style={style}>
         </div>
      </button>
    </div>
  )
}