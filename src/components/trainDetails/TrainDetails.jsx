import { useEffect, useState } from "react";
import getTrainBetStn from "../../utils/apiCalls/getTrainsBetStn";
import { TrainCard, TrainDetailHeader } from "../index";
import { useParams } from "react-router-dom";
import TrainFilter from "./trainFilter/TrainFilter";
import { useDispatch, useSelector } from "react-redux";
import { setTrainData } from "../../store/slices/detailSlice";

const TrainDetails = () => {
  const params = useParams();
  const data = JSON.parse(params?.data);
  const [trainSearchData, setTrainSearchData] = useState([]);
  const dispatch = useDispatch();
  const quota = useSelector((state) => state?.quota);
  const trainDataOriginal = useSelector((state) => state?.trainData);
  const selectedSrcStationList = useSelector(
    (state) => state?.selectedSrcStationList
  );
  const selectedDestStationList = useSelector(
    (state) => state?.selectedDestStationList
  );

  const fetchTrainsBetweenStation = async (quota) => {
    const response = await getTrainBetStn(
      data?.srcStationCode,
      data?.destStationCode,
      data?.doj,
      quota
    );
    dispatch(setTrainData(response?.data));
  };

  useEffect(() => {
    fetchTrainsBetweenStation(quota);
  }, [quota]);

  useEffect(() => {
    if (trainDataOriginal?.trainBtwnStnsList) {
      setTrainSearchData(trainDataOriginal?.trainBtwnStnsList);
    }

    const trainData = trainDataOriginal?.trainBtwnStnsList?.filter((train) => {
      if (
        selectedSrcStationList.length === 0 &&
        selectedDestStationList.length === 0
      ) {
        return train;
      }
      if (selectedSrcStationList.length === 0) {
        return selectedDestStationList.includes(train?.toStnCode);
      }
      if (selectedDestStationList.length === 0) {
        return selectedSrcStationList.includes(train?.fromStnCode);
      }

      return (
        selectedSrcStationList.includes(train?.fromStnCode) &&
        selectedDestStationList.includes(train?.toStnCode)
      );
    });
    setTrainSearchData(trainData);
  }, [trainDataOriginal, selectedSrcStationList, selectedDestStationList]);

  return (
    <div className="bg-[#EAEAEA] p-4 pt-8">
      <div className="max-w-[1000px] m-auto">
        <TrainDetailHeader data={data} />
        <TrainFilter data={trainDataOriginal?.trainBtwnStnsList} />

        {trainSearchData?.length === 0 ? (
          <div className="text-center bg-white p-4 my-4 rounded-lg flex flex-col items-center justify-center">
            <img className="mb-3" src="https://www.confirmtkt.com/img/icons/no_train_running.png" height="70px" width="170px" alt="no-trains" />
            <p className="font-[600]">No Train Found</p>
            <p className="text-[14px] text-[#A58585]">
              No trains found for this route or filter combination
            </p>
          </div>
        ) : (
          trainSearchData?.map((trainData) => {
            return (
              <TrainCard key={trainData?.trainNumber} trainData={trainData} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TrainDetails;
