/* eslint-disable react/prop-types */
const TrainRunningDays = ({data}) => {
  return (
    <div className="flex items-center gap-x-1 text-[14px]">
        <p className={data?.runningSun === 'Y' ? 'text-black' : 'text-[#E1D4CC]'}>S</p>
        <p className={data?.runningMon === 'Y' ? 'text-black' : 'text-[#E1D4CC]'}>M</p>
        <p className={data?.runningTue === 'Y' ? 'text-black' : 'text-[#E1D4CC]'}>T</p>
        <p className={data?.runningWed === 'Y' ? 'text-black' : 'text-[#E1D4CC]'}>W</p>
        <p className={data?.runningThu === 'Y' ? 'text-black' : 'text-[#E1D4CC]'}>T</p>
        <p className={data?.runningFri === 'Y' ? 'text-black' : 'text-[#E1D4CC]'}>F</p>
        <p className={data?.runningSat === 'Y' ? 'text-black' : 'text-[#E1D4CC]'}>S</p>
    </div>
  )
}

export default TrainRunningDays