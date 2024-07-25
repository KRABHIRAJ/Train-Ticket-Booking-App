import { useEffect, useState } from "react";
import {
  SixDaysAvailabilityCard,
  TrainClassCard,
  TrainRunningDays,
} from "../../index";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import getSixDaysAvailability from "../../../utils/apiCalls/getSixDaysAvailability";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ticketClassElaboration } from "../../../utils/constants/constant";
import {
  setAvailabilityDataCache,
  setHideAvailability,
} from "../../../store/slices/detailSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/* eslint-disable react/prop-types */
const TrainCard = ({ trainData }) => {
  const avlTrainClass = trainData?.avlClasses?.Array;
  const duration = trainData?.duration?.split(":");
  const [isShowSixDaysAvl, setIsShowSixDaysAvl] = useState(false);
  const [availabilityData, setAvailabilityData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const quota = useSelector((state) => state?.quota);
  const doj = useSelector((state) => state?.doj);
  const hideAvailability = useSelector((state) => state?.hideAvailability);

  useEffect(() => {
    const payload = {
      trainNumber: "NULL",
      ticketClass: "NULL",
      availabibityData: "NULL",
    };
    dispatch(setAvailabilityDataCache(payload));
    setIsShowSixDaysAvl(false);
  }, []);

  useEffect(() => {
    if (isShowSixDaysAvl) {
      getSixDaysAvailabilityData(avlTrainClass[selectedIndex]);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (hideAvailability) {
      setIsShowSixDaysAvl(false);
      dispatch(setHideAvailability(false));
    }
  }, [hideAvailability]);

  const openSchedulePage = () => {
    window.open(
      `https://www.confirmtkt.com/train-schedule/${trainData?.trainNumber}`
    );
  };
  const cachedTrainData = useSelector((state) => state?.availabilityDataCache);

  const getSixDaysAvailabilityData = async (trainClass) => {
    setAvailabilityData({});
    if (
      cachedTrainData[trainData?.trainNumber] &&
      cachedTrainData[trainData?.trainNumber][trainClass]
    ) {
      setAvailabilityData(cachedTrainData[trainData?.trainNumber][trainClass]);
    } else {
      const response = await getSixDaysAvailability(
        trainData?.trainNumber,
        trainClass,
        quota,
        trainData?.fromStnCode,
        trainData?.toStnCode,
        doj
      );
      const payload = {
        trainNumber: trainData?.trainNumber,
        ticketClass: trainClass,
        availabibityData: response?.data,
      };
      dispatch(setAvailabilityDataCache(payload));
      setAvailabilityData(response?.data);
    }
  };

  const handleShowSixDaysAvailability = () => {
    if (!isShowSixDaysAvl) {
      const trainClass = avlTrainClass[avlTrainClass.length - 1];
      setSelectedIndex(avlTrainClass.length - 1);
      getSixDaysAvailabilityData(trainClass);
    }
    setIsShowSixDaysAvl(!isShowSixDaysAvl);
  };

  const onTabSelect = (index) => {
    setSelectedIndex(index);
  };

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
        <button
          onClick={openSchedulePage}
          className="text-[#42A04D] font-[600] hover:underline text-[14px]"
        >
          View Schedule
        </button>
      </div>

      {isShowSixDaysAvl ? (
        <div className="mt-4 text-[12px]">
          <Tabs
            onSelect={(index) => onTabSelect(index)}
            selectedIndex={selectedIndex}
          >
            <TabList>
              {avlTrainClass?.map((trainClass, index) => {
                return (
                  <Tab
                    key={trainClass}
                    style={
                      selectedIndex === index
                        ? { fontWeight: "600", color: "#43A656" }
                        : { fontWeight: "600" }
                    }
                  >
                    {trainClass} - {ticketClassElaboration[trainClass]}
                  </Tab>
                );
              })}
            </TabList>

            {avlTrainClass?.map((trainClass) => {
              return (
                <TabPanel key={trainClass}>
                  {Object.keys(availabilityData).length > 0 ? (
                    availabilityData?.avlDayList?.map((data) => {
                      return <SixDaysAvailabilityCard key={data} data={data} />;
                    })
                  ) : 
                  (
                    <div className="flex items-center justify-center my-12">
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress color="success" />
                      </Box>
                    </div>
                  )
                }
                </TabPanel>
              );
            })}
          </Tabs>
        </div>
      ) : (
        <div className="flex items-center gap-x-4 overflow-scroll no-scrollbar">
          {avlTrainClass?.map((cls) => {
            return (
              <TrainClassCard
                key={cls}
                data={trainData?.avaiblitycache?.[cls]}
                setSelectedIndex={setSelectedIndex}
                avlTrainClass={avlTrainClass}
                setIsShowSixDaysAvl={setIsShowSixDaysAvl}
              />
            );
          })}
        </div>
      )}
      <div
        onClick={() => handleShowSixDaysAvailability()}
        className="text-[#42A04D] font-[600] hover:underline text-[14px] cursor-pointer text-end mt-4"
      >
        {isShowSixDaysAvl
          ? "Hide 6 days availability"
          : "Check 6 days availability"}
      </div>
    </div>
  );
};

export default TrainCard;
