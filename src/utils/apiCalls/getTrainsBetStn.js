import axios from "axios";
import { baseUrl } from "../constants/api";

const getTrainBetStn = async (src, dest, doj, quota) => {
    const url = `${baseUrl}api/platform/trainbooking/tatwnstns?fromStnCode=${src}&destStnCode=${dest}&doj=${doj}&token=&quota=${quota}&appVersion=290&androidid=mwebd_android`
    const response = await axios.get(url);
    return response;
}


export default getTrainBetStn;