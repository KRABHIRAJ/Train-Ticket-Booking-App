/* eslint-disable react/prop-types */
const TicketStatus = ({ticketStatus, prediction, availability}) => {
  return (
    <div
      className={
        ticketStatus === "Probable" ||
        ticketStatus === "Confirm"
          ? parseInt(prediction) < 75
            ? "text-[#DE941A] mt-1"
            : "text-[#43A64E] mt-1"
          : "text-[#C74656]"
      }
    >
      <p>{availability || "NOT AVAILABLE"}</p>
      <p className="text-[10px]">{prediction || "No More Booking"}</p>
    </div>
  );
};

export default TicketStatus;
