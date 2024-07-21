/* eslint-disable react/prop-types */
import EastIcon from '@mui/icons-material/East';
const TrainDetailHeader = ({data}) => {
  return (
    <div className='bg-white p-4 rounded-lg flex justify-between'>
        <div className=" flex gap-x-4 items-center">
            <p className="font-[600]">{data?.sourceStationName} ({data?.srcStationCode})</p>
            <EastIcon sx={{ color: "#42A047", fontSize: 20 }} />
            <p className="font-[600]">{data?.destStationName} ({data?.destStationCode})</p>
        </div>
        <div>
            <p className='font-[600]'>{data?.doj}</p>
        </div>
    </div>
  )
}

export default TrainDetailHeader