import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    isAfter // Import isAfter function from date-fns
} from 'date-fns'
import { useState } from 'react'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { ScaleLoader } from 'react-spinners';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Employee_row_attendance({employee_ID,  branchID, res_id }) {
    const axiosSecure = useAxiosSecure();
 



    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    const { isLoading, error, data :attendate, refetch } = useQuery({
        queryKey: ['employee-list',branchID,res_id,employee_ID,currentMonth],
        cacheTime: 0,
        queryFn: async () => {
            const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/get-attendance/${employee_ID}/month/${currentMonth}`);
            // console.log(`/restaurant/${res_id}/branch/${branchID}/get-attendance/${employee_ID}/month/${currentMonth}`)
            console.log(res.data)
            return res.data?.yesDates || []
            // return [
            //     '2024-03-11T13:00',
            //     '2024-03-20T09:00',
            //     '2024-03-20T17:00',
            //     '2024-03-09T13:00',
            //     '2024-03-29T14:00',
            //     '2024-03-30T14:00'
            // ]
        }
    })


    if(isLoading){
        return <>
        <div className='h-full w-full flex justify-center items-center z-[100] overflow-hidden'  aria-label='loading-icon'>
           <ScaleLoader size={100}  color='#36d7b7' />
        </div>
        </>
    }
    if(error){
        return <ErrorPage/>
    }

    return (
        <div className="pt-10 select-none">
            <div className="max-w-md px-4 mx-auto  md:max-w-4xl ">

                <div >
                    <div className="flex items-center">
                        <h2 className="flex-auto font-semibold text-gray-900">
                            {format(firstDayCurrentMonth, 'MMMM yyyy')}
                        </h2>
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <GrFormPrevious />
                        </button>
                        <button
                            onClick={nextMonth}
                            type="button"
                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <GrFormNext />

                        </button>
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    'py-1.5'
                                )}
                            >
                                <button type="button" onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                        attendate.some((date) => isSameDay(parseISO(date), day)) && 'bg-green-400 text-white',
                                        isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900 text-white',
                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                        (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                        // Check if the day is in the past, not today, not attended, and not in the future
                                        (!isToday(day) && !attendate.some((date) => isSameDay(parseISO(date), day)) && !isAfter(day, today)) && 'bg-red-400 text-white',
                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                    )}
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                        {format(day, 'd')}
                                    </time>
                                </button>

                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}
let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
