import { useEffect, useState } from "react";
import getTrainBetStn from "../../utils/apiCalls/getTrainsBetStn";
import {TrainCard, TrainDetailHeader} from "../index";
import { useParams } from "react-router-dom";

const TrainDetails = () => {
  const params = useParams();
  const data = JSON.parse(params?.data)
  const [trainSearchData, setTrainSearchData] = useState({});

  const fetchTrainsBetweenStation = async () => {
    const response = await getTrainBetStn(data?.srcStationCode, data?.destStationCode, data?.doj, 'GN');
    setTrainSearchData(response?.data);
  }

  useEffect(() => {
    fetchTrainsBetweenStation();
  }, []);

  return (
    <div className="bg-[#EAEAEA] p-4 pt-8">
        <div className="max-w-[1000px] m-auto">
            <TrainDetailHeader data={data} />
            {
              trainSearchData?.trainBtwnStnsList?.map((trainData) => {
                return <TrainCard key={trainData?.trainNumber} trainData = {trainData} />
              })
            }
        </div>
    </div>
  )
}

export default TrainDetails