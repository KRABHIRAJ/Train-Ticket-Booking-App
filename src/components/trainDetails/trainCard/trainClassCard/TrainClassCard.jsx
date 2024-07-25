/* eslint-disable react/prop-types */

import TicketStatus from "../../ticketStatus/TicketStatus";

const TrainClassCard = ({
  data,
  setSelectedIndex,
  avlTrainClass,
  setIsShowSixDaysAvl,
}) => {
  const handleClick = () => {
    const index = avlTrainClass.findIndex(
      (trainClass) => trainClass === data?.TravelClass
    );
    setSelectedIndex(index);
    setIsShowSixDaysAvl(true);
  };
  return (
    <div
      onClick={handleClick}
      className="w-[130px] p-2 rounded-md bg-[#F8F8F8] text-[12px] mt-2 cursor-pointer"
    >
      <div className="flex items-center justify-between ">
        <p>{data?.TravelClass}</p>
        <p>₹ {data?.Fare}</p>
      </div>
      <TicketStatus
        ticketStatus={data?.ConfirmTktStatus}
        prediction={data?.Prediction}
        availability={data?.Availability}
      />
    </div>
  );
};

export default TrainClassCard;
