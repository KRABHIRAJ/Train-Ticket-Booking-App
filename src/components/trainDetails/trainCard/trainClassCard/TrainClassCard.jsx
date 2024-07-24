/* eslint-disable react/prop-types */

const TrainClassCard = ({ data }) => {
  return (
    <div className="w-[130px] p-2 rounded-md bg-[#F8F8F8] text-[12px] mt-2 cursor-pointer">
      <div className="flex items-center justify-between ">
        <p>{data?.TravelClass}</p>
        <p>₹ {data?.Fare}</p>
      </div>
      <div
        className={
          (data?.ConfirmTktStatus === "Probable" || data?.ConfirmTktStatus === "Confirm")
            ? parseInt(data?.Prediction) < 75
              ? "text-[#DE941A] mt-1"
              : "text-[#43A64E] mt-1"
            : "text-[#C74656]"
        }
      >
        <p>{data?.Availability  || 'NOT AVAILABLE'}</p>
        <p className="text-[10px]">{data?.Prediction || 'No More Booking'}</p>
      </div>
    </div>
  );
};

export default TrainClassCard;
