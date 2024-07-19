import { useRef, useState } from "react";
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
import { getAutoSuggestions } from "../../utils/apiCalls";
import TrainSuggestionList from "./TrainSuggestionList";

const TrainSearch = () => {
  const [sourceStn, setSourceStn] = useState(sourceStation);
  const [destStn, setDestStn] = useState(destinationStation);
  const [isSourceStnOpen, setIsSourceStnOpen] = useState(false);
  const [isDestStnOpen, setIsDestStnOpen] = useState(false);
  const [doj, setDoj] = useState(dateOfJourney);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [suggestedStns, setSuggestedStns] = useState([]);
  const [stnInput, setStnInput] = useState("");
  const sourceRef = useRef();
  const destRef = useRef();

  const todayDate = new Date();
  const maxDate = new Date(todayDate);

  maxDate.setDate(maxDate.getDate() + 120);

  const showSourceStnInput = () => {
    setIsSourceStnOpen(true);
    setTimeout(() => {
      sourceRef?.current?.focus();
    });
  };
  const showDestStnInput = () => {
    setIsDestStnOpen(true);
    setTimeout(() => {
      destRef?.current?.focus();
    });
  };

  const setAutoSuggetedStation = async (e) => {
    setStnInput(e.target.value);
    const val = e.target.value;
    const stations = JSON.parse(localStorage.getItem("autoSuggestion")) || {};
    if (stations && stations[val]) {
      setSuggestedStns(stations[val]);
    } else {
      const res = await getAutoSuggestions(e.target.value);
      const stationList = res?.data?.StationList;
      setSuggestedStns(stationList);
      const stations = JSON.parse(localStorage.getItem("autoSuggestion")) || {};
      stations[val] = stationList;
      localStorage.setItem("autoSuggestion", JSON.stringify(stations));
    }
  };

  const clearInputs = () => {
    setSuggestedStns([]);
    setStnInput("");
    localStorage.removeItem("autoSuggestion");
  };

  return (
    <div className="flex items-center p-4 border border-gray-200 bg-white rounded-lg mt-8">
      <div className="flex items-center gap-x-3 mr-8">
        <img
          src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg"
          alt="from-img"
        />
        <div className="relative">
          <p className="text-gray-400 text-[14px]">From</p>
          <p onClick={showSourceStnInput} className="font-[600]">
            {sourceStation?.stationCode} - {sourceStation?.stationName}
          </p>
          {isSourceStnOpen && (
            <div>
              <div className="absolute top-5">
                <input
                  ref={sourceRef}
                  className="outline-none bg-gray-50 rounded-lg px-4 py-2 w-[200px]"
                  type="text"
                  onBlur={() => {
                    setIsSourceStnOpen(false);
                    clearInputs();
                  }}
                  placeholder="Enter From"
                  value={stnInput}
                  onChange={(e) => setAutoSuggetedStation(e)}
                />
              </div>
            </div>
          )}
          {
            (isSourceStnOpen) && (
                suggestedStns.length > 0 ? (<div className="bg-gray-50 absolute top-14 rounded-b-lg w-[200px] px-4">
                    <TrainSuggestionList stations = {suggestedStns} />
                </div>) : (<div className="bg-gray-50 absolute top-14 rounded-b-lg w-[200px] p-4">
                    <p>No suggested Stations</p>
                </div>)
            )
          }
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
        <div className="relative">
          <p className="text-gray-400 text-[14px]">To</p>
          <p onClick={showDestStnInput} className="font-[600]">
            {destStn?.stationCode} - {destStn?.stationName}
          </p>
          {isDestStnOpen && (
            <div>
              <div className="absolute top-5">
                <input
                  ref={destRef}
                  className="outline-none bg-gray-50 rounded-lg px-4 py-2 w-[200px]"
                  type="text"
                  onBlur={() => {
                    setIsDestStnOpen(false);
                    clearInputs();
                  }}
                  placeholder="Enter To"
                  value={stnInput}
                  onChange={(e) => setAutoSuggetedStation(e)}
                />
              </div>
            </div>
          )}
          {
            (isDestStnOpen) && (
                suggestedStns.length > 0 ? (<div className="bg-gray-50 absolute top-14 rounded-b-lg w-[200px] px-4">
                    <TrainSuggestionList stations = {suggestedStns} />
                </div>) : (<div className="bg-gray-50 absolute top-14 rounded-b-lg w-[200px] p-4">
                    <p>No suggested Stations</p>
                </div>)
            )
          }
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
