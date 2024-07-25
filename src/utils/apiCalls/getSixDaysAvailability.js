import axios from "axios"
import { baseUrl } from "../constants/api"

const getSixDaysAvailability = async (trainNo, trainClass, quota, source, dest, doj) => {
    const url = `${baseUrl}api/platform/trainbooking/avlFareenquiry?trainNo=${trainNo}&travelClass=${trainClass}&quota=${quota}&fromStnCode=${source}&destStnCode=${dest}&doj=${doj}&token=5F991E491825FEB0A70DDBEE9E17B5050D1DE1A95BC97644EB2B5B49B4EC6223&planZeroCan=RO-F3&appVersion=290`
    const response = await axios.get(url);
    return response;
}

export default getSixDaysAvailability;