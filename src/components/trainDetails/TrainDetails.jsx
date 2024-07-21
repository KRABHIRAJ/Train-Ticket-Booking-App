import { useEffect } from "react";
import { useParams } from "react-router-dom"
import getTrainBetStn from "../../utils/apiCalls/getTrainsBetStn";
import {TrainDetailHeader} from "../index";

const TrainDetails = () => {
  const params = useParams();

  const fetchTrainsBetweenStation = async () => {
    const data = JSON.parse(params?.data);
    const response = await getTrainBetStn(data?.srcStationCode, data?.destStationCode, data?.doj, 'GN');
    console.log('resp >>', response)
  }

  useEffect(() => {
    fetchTrainsBetweenStation();
  }, []);

  return (
    <div className="bg-[#EAEAEA] h-[100vh]">
        <TrainDetailHeader />
    </div>
  )
}

export default TrainDetails