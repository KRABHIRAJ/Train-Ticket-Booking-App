import { useRef, useState } from "react";
import {
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
import { getFormattedDate } from "../../utils/helper/helper";
import { useNavigate } from "react-router-dom";

const TrainSearch = () => {
  const [sourceStn, setSourceStn] = useState(sourceStation);
  const [destStn, setDestStn] = useState(destinationStation);
  const [isSourceStnOpen, setIsSourceStnOpen] = useState(false);
  const [isDestStnOpen, setIsDestStnOpen] = useState(false);
  const [doj, setDoj] = useState(new Date());
  const [suggestedStns, setSuggestedStns] = useState([]);
  const [stnInput, setStnInput] = useState("");
  const sourceRef = useRef();
  const destRef = useRef();
  const navigate = useNavigate();

  const todayDate = new Date();
  const maxDate = new Date(todayDate);

  maxDate.setDate(maxDate.getDate() + 120);

  const showSourceStnInput = () => {
    clearInputs();
    setIsSourceStnOpen(true);
    setTimeout(() => {
      sourceRef?.current?.focus();
    });
  };
  const showDestStnInput = () => {
    clearInputs();
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
    setIsSourceStnOpen(false);
    setIsDestStnOpen(false);
    localStorage.removeItem("autoSuggestion");
  };

  const swapStations = () => {
    const temp = sourceStn;
    setSourceStn(destStn);
    setDestStn(temp);
  }

  const searchForTrain = () => {
    const formattedDoj = getFormattedDate(doj);
    const srcStationCode = sourceStation?.stationCode;
    const destStationCode = destStn?.stationCode;
    const data = JSON.stringify({
      doj:formattedDoj,
      srcStationCode:srcStationCode,
      destStationCode:destStationCode
    })
    if(srcStationCode !== destStationCode){
      navigate(`/${data}`)
    }
  }

  return (
    <div className="flex items-center p-4 border border-gray-200 bg-white rounded-lg mt-8">
      <div className="flex items-center gap-x-3 w-[240px]">
        <img
          src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg"
          alt="from-img"
        />
        <div className="relative">
          <p className="text-gray-400 text-[14px]">From</p>
          <p onClick={showSourceStnInput} className="font-[600] line-clamp-1">
            {sourceStn?.stationCode} - {sourceStn?.stationName}
          </p>
          {isSourceStnOpen && (
            <div>
              <div className="absolute top-5">
                <input
                  ref={sourceRef}
                  className="outline-none bg-gray-50 rounded-lg px-4 py-2 w-[200px]"
                  type="text"
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
                    <TrainSuggestionList setStn = {setSourceStn} clearInputs={clearInputs} stations = {suggestedStns} />
                </div>) : (<div className="bg-gray-50 absolute top-14 rounded-b-lg w-[200px] p-4">
                    <p>No suggested Stations</p>
                </div>)
            )
          }
        </div>
      </div>
      <div onClick={swapStations} className="cursor-pointer mx-8">
        <SwapHorizontalCircleIcon sx={{ color: "#BDBDBD", fontSize: 35 }} />
      </div>
      <div className="flex items-center gap-x-3 border-r border-gray-300 w-[240px]">
        <img
          src="https://www.confirmtkt.com/img/icons/ic-search-to-desktop.svg"
          alt="to-img"
        />
        <div className="relative">
          <p className="text-gray-400 text-[14px]">To</p>
          <p onClick={showDestStnInput} className="font-[600] line-clamp-1">
            {destStn?.stationCode} - {destStn?.stationName}
          </p>
          {isDestStnOpen && (
            <div>
              <div className="absolute top-5">
                <input
                  ref={destRef}
                  className="outline-none bg-gray-50 rounded-lg px-4 py-2 w-[200px]"
                  type="text"
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
                    <TrainSuggestionList setStn = {setDestStn} clearInputs={clearInputs} stations = {suggestedStns} />
                </div>) : (<div className="bg-gray-50 absolute top-14 rounded-b-lg w-[200px] p-4">
                    <p>No suggested Stations</p>
                </div>)
            )
          }
        </div>
      </div>
      <div className="w-[180px] ml-8">
        <div className="flex items-center gap-x-3">
          <img
            src="https://www.confirmtkt.com/img/icons/ic-search-to-desktop.svg"
            alt="to-img"
          />
          <div >
            <p className="text-gray-400 text-[14px]">Departure Date</p>
            <DatePicker
              className="font-[600]"
              onChange={setDoj}
              value={doj}
              calendarIcon={null}
              clearIcon={null}
              format="dd-MM-yyyy"
              minDate={todayDate}
              maxDate={maxDate}
            />
        </div>
        </div>
      </div>
      <div onClick={searchForTrain} className="bg-[#43A64E] flex-1 ml-8 h-[100%] rounded-lg py-4 cursor-pointer min-w-[100px]">
        <p className="text-white text-center text-[20px] font-[600]">SEARCH</p>
      </div>
    </div>
  );
};

export default TrainSearch;
