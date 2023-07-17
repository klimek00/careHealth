import {useEffect, useState, useRef} from 'react'
import CalendarHeader from './calendarHeader'
import MoreArrow from './moreArrow'
import CalendarHour from './calendarHour'

////
//  Mateusz Klimczak, ca. 2023
///



/**
 * Todo:
   * add styling for each element (header, body, topic, single element)
   * allow more types of data
   * add language
   * add occupied data which blocks hours
   * empty days styling
   * functions into functions file
   * everything is functions - should be classes
   * virtualDate is lazy string - at least fix useState bug}
 */

//either occupiedData or data without data
//we currently use without occupied data ->
// timestamp to make gray text when data is busy
function BetterDatePicker({data, days=7, title = 'Data Wizyty', style, options, userDateSelect}) {
  const [px, setPx] = useState(0)
  const userDate = useRef(null)

  //cannot use state because of too many re-renders
  //virtual date changes to display correct day in calendar's columns
  let virtualDate = ''

  //more - true -> move to left (display more days)
  //length - width of one column
  const move = (e, more, length = 6.5) => {
    e.preventDefault()
    setPx((prevPx) => prevPx + (more ? -length : length))
  }
    
  // update view
  useEffect(() => {
    document.querySelector('.calendarBodyCols').style.transform = `translateX(${px}rem)`
    }, [px])
  
    /**
      * how to move those functions into other file??
    */
  const generateNextDate = (i) => {
    const newDate = new Date()
    newDate.setDate(newDate.getDate() + i)
    virtualDate = `${newDate.getDate()}.${newDate.getMonth() < 9 ? 0 : ''}${newDate.getMonth()+1}.${newDate.getFullYear()}`
    return newDate
  }

  // prints header for day based on iterator
  const prepareDay = (i) => {
    const newDate = generateNextDate(i)
    const day = newDate.getDate()
    let month = newDate.toLocaleString('pl-Pl', { month: 'short' })
    const weekday = i === 0 ? "dziś" : i === 1 ? "jutro" : newDate.toLocaleString('pl-Pl', { weekday: 'short' })

    return (
      <div>
        <p>{weekday}</p>
        <p>{day} {month}</p>
      </div>
    )
  }

  const fn = (e, {day, hour}) => {
    // /remove style of selected item if current exists
    userDate?.current?.classList?.remove('bg-blue-600', 'text-white')
    
    userDate.current = e.target
    // // we have to use e.target because of react's 'lag'
    userDate.current.classList.add('bg-blue-600', 'text-white')
    userDateSelect({day, hour})
  }
  

  try {
    return (
    <div className="calendar w-80 border shadow shadow-slate-200 bg-zinc-50 p-2 z-20 rounded-lg" style={style}>
      <CalendarHeader title={title}/>

      <div className='calendarBody flex flex-row justify-between'>
        <MoreArrow point='left' move={move}/>

        <div className='calendarBodyCol mt-2 w-64 overflow-x-hidden'>

        <div className="calendarBodyCols flex flex-row transition-transform duration-300 text-center">
            { Array(days)
              .fill(null)
              .map((_, i) => (
                <div key={'day-'+i} className="calendarColDays h-56 w-11 grow-0 shrink-0 flex flex-col mx-1">
                <div className="calendarColHeader pb-1 border-b border-slate-400">
                  {prepareDay(i)}
                </div>
                <div className='calendarColBody'>
                  <CalendarHour data={data} date={virtualDate} fn={fn}/>
                </div>
              </div>
            )) }
        </div>

        </div>

        <MoreArrow point='right' move={move}/>
      </div>
    </div>
    )
  } catch(error) {
    console.error(error)
    console.error("do you use correct format, such as '30.07.2023': ['9:00']?")
    return null
  }

}

export default BetterDatePicker;
