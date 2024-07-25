/* eslint-disable react/prop-types */
import { TicketStatus } from "../../index";

const SixDaysAvailabilityCard = ({ data }) => {
  return (
    <div className="flex items-center justify-between shadow-sm p-2 rounded-md my-2">
      <div className="font-[600] w-[100px]">{data?.availablityDate}</div>
      <div className="w-[150px]">
        <TicketStatus
            ticketStatus={data?.confirmTktStatus}
            prediction={data?.prediction}
            availability={data?.availablityStatus}
        />
      </div>
      <div className="border border-[#43A64E] rounded-md p-2 cursor-pointer">
        <p className="font-[600] text-[#43A64E]">BOOK ₹ {data?.zeroCancellationCharges?.fareAdult}</p>
      </div>
    </div>
  );
};

export default SixDaysAvailabilityCard;
