import axios from "axios"
import { baseUrl } from "../constants/api"

const getAutoSuggestions = async (searchString) => {
    const url = `${baseUrl}/api/platform/getAutoSuggestedStationList?searchString=${searchString}&language=EN&limit=15`
    const response = await axios.get(url);
    return response;
}

export default getAutoSuggestions;