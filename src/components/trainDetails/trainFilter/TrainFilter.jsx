/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { quotas } from "../../../utils/constants/constant";
import { filterStationName } from "../../../utils/helper/helper";
import { useDispatch } from "react-redux";
import {
  setQuota,
  setselectedDestStationList,
  setselectedSrcStationList,
} from "../../../store/slices/detailSlice";

const TrainFilter = ({ data }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedQuota, setSelectedQuota] = useState("GN");
  const [sourceStnCodeList, setSourceStnCodeList] = useState([]);
  const [destStnCodeList, setDestStnCodeList] = useState([]);
  const [selectedSrcStnList, setSelectedSrcStnList] = useState([]);
  const [selectedDestStnList, setSelectedDestStnList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    resetFilters();
  }, [])

  useEffect(() => {
    setSourceStnCodeList(filterStationName(data, "fromStnCode"));
    setDestStnCodeList(filterStationName(data, "toStnCode"));
  }, [data]);

  const handleChange = (val, type) => {
    const temp = type === "src" ? selectedSrcStnList : selectedDestStnList;
    if (temp.includes(val)) {
      const index = temp.findIndex((item) => item === val);
      temp.splice(index, 1);
    } else {
      temp.push(val);
    }
    type === "src" ? setSelectedSrcStnList([...temp]) : setSelectedDestStnList([...temp]);
    type === "src"
      ? (dispatch(setselectedSrcStationList([...temp])))
      : dispatch(setselectedDestStationList([...temp]));
  };

  const handleSelectedQuota = (val) => {
    dispatch(setQuota(val));
    setSelectedQuota(val);
  };

  const resetFilters = () => {
    dispatch(setselectedSrcStationList([]));
    dispatch(setselectedDestStationList([]));
    dispatch(setQuota('GN'));
  };

  const resetAllFilters = (event) => {
    event.stopPropagation();
    resetFilters();
  };

  return (
    <div className="bg-white rounded-lg my-4">
      <div
        onClick={() => setIsFilterOpen((prev) => !prev)}
        className={`${
          isFilterOpen
            ? "shadow-sm rounded-t-lg px-4 py-2"
            : "bg-white rounded-lg p-4"
        } flex items-center justify-between mb-3 cursor-pointer `}
      >
        <div className="flex items-center">
          <p className="font-[600] mr-2">FILTERS</p>
          {!isFilterOpen && <span>(click to open menu)</span>}
        </div>
        <div onClick={(e) => resetAllFilters(e)} className="flex items-center gap-x-4">
          <p className="font-[600] text-[#42A047]">RESET ALL</p>
          {isFilterOpen ? (
            <ExpandLessIcon sx={{ color: "#BDBDBD", fontSize: 35 }} />
          ) : (
            <ExpandMoreIcon sx={{ color: "#BDBDBD", fontSize: 35 }} />
          )}
        </div>
      </div>
      {isFilterOpen && (
        <div
          className={`${
            isFilterOpen ? "block h-full" : "hidden h-0"
          } px-4 pt-2 pb-4 text-[14px]`}
        >
          <div className="">
            <p className="font-[500] mb-2">Quota</p>
            <div className="flex items-center gap-x-6">
              {quotas.map((quota) => {
                return (
                  <div
                    onClick={() => handleSelectedQuota(quota.value)}
                    className="flex items-center cursor-pointer gap-x-2"
                    key={quota.value}
                  >
                    <input
                      type="radio"
                      id={quota.value}
                      name={quota.label}
                      value={quota.value}
                      onChange={() => handleSelectedQuota(quota.value)}
                      checked={selectedQuota === quota.value}
                    />
                    <p>{quota.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="font-[500] my-2">Origin Station</p>
            <div className="flex items-center gap-x-5">
              {sourceStnCodeList?.map((station) => (
                <div
                  key={station?.value}
                  className="flex items-center cursor-pointer gap-x-2"
                >
                  <input
                    type="checkbox"
                    id={station?.value}
                    name={station?.value}
                    value={station?.value}
                    onChange={() => handleChange(station?.value, "src")}
                    checked={selectedSrcStnList.includes(station?.value)}

                  />
                  <p>{station?.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-[500] my-2">Destination Station</p>
            <div className="flex items-center gap-x-5">
              {destStnCodeList?.map((station) => (
                <div
                  key={station?.value}
                  className="flex cursor-pointer items-center gap-x-2"
                >
                  <input
                    type="checkbox"
                    id={station?.value}
                    name={station?.value}
                    value={station?.value}
                    onChange={() => handleChange(station?.value, "dest")}
                    checked={selectedDestStnList.includes(station?.value)}
                  />
                  <p>{station?.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainFilter;
