import { useState } from "react";
import {
  dateOfJourney,
  destinationStation,
  sourceStation,
} from "../../utils/constants/constant";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import DatePicker from "react-date-picker";
import "./TrainSearch.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const TrainSearch = () => {
  const [sourceStn, setSourceStn] = useState(sourceStation);
  const [destStn, setDestStn] = useState(destinationStation);
  const [doj, setDoj] = useState(dateOfJourney);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayDate = new Date();
  const maxDate = new Date(todayDate);

  maxDate.setDate(maxDate.getDate() + 120);
  return (
    <div className="flex items-center p-4 border border-gray-200 bg-white rounded-lg mt-8">
      <div className="flex items-center gap-x-3 mr-8">
        <img
          src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg"
          alt="from-img"
        />
        <div>
          <p className="text-gray-400 text-[14px]">From</p>
          <p className="font-[600]">
            {sourceStation?.data?.stationCode} -{" "}
            {sourceStation?.data?.stationName}
          </p>
        </div>
      </div>
      <div className="cursor-pointer">
        <SwapHorizontalCircleIcon sx={{ color: "#BDBDBD", fontSize: 35 }} />
      </div>
      <div className="flex items-center gap-x-3 mx-8 pr-8 border-r border-gray-300">
        <img
          src="https://www.confirmtkt.com/img/icons/ic-search-to-desktop.svg"
          alt="to-img"
        />
        <div>
          <p className="text-gray-400 text-[14px]">To</p>
          <p className="font-[600]">
            {destStn?.data?.stationCode} - {destStn?.data?.stationName}
          </p>
        </div>
      </div>
      <div className="mr-8">
        <div>
          <p className="text-gray-400 text-[14px]">Departure Date</p>
          <DatePicker
            className="font-[600]"
            onChange={setSelectedDate}
            value={selectedDate}
            calendarIcon={null}
            clearIcon={null}
            minDate={todayDate}
            maxDate={maxDate}
          />
        </div>
      </div>
      <div className="bg-[#43A64E] flex-1 ml-8 h-[100%] rounded-lg py-4 cursor-pointer min-w-[140px]">
        <p className="text-white text-center text-[20px] font-[600]">SEARCH</p>
      </div>
    </div>
  );
};

export default TrainSearch;
