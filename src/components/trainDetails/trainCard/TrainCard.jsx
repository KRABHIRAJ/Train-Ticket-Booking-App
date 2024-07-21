import { TrainClassCard, TrainRunningDays } from "../../index";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

/* eslint-disable react/prop-types */
const TrainCard = ({ trainData }) => {
  const duration = trainData?.duration?.split(":");
  const avlClasses = trainData?.avlClasses?.Array;


  return (
    <div className="bg-white p-6 rounded-lg my-4">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-[600]">
          {trainData?.trainNumber} - {trainData?.trainName}
        </p>
        <div>
          <TrainRunningDays data={trainData} />
        </div>
      </div>
      <div className="text-[12px] flex items-center justify-between mt-2">
        <div className="flex items-center gap-x-2">
          <p>
            {trainData?.arrivalTime} {trainData?.fromStnCode}
          </p>
          <HorizontalRuleIcon sx={{ color: "#D6D6D6", fontSize: 20 }} />
          <p>
            {duration?.[0]}h {duration?.[1]}m
          </p>
          <HorizontalRuleIcon sx={{ color: "#D6D6D6", fontSize: 20 }} />
          <p>
            {trainData?.departureTime} {trainData?.toStnCode}
          </p>
        </div>
        <button className="text-[#42A04D] font-[600] hover:underline text-[14px]">
          View Schedule
        </button>
      </div>
      <div className="flex items-center gap-x-4 overflow-scroll no-scrollbar">
        {
          avlClasses?.map((cls) => {
            return <TrainClassCard key={cls} data={trainData?.avaiblitycache?.[cls]} />
          })
        }
      </div>
    </div>
  );
};

export default TrainCard;
