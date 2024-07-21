/* eslint-disable react/prop-types */
const TrainSuggestionList = ({stations, setStn, clearInputs}) => {
  const setSelectedStation = (station) => {
    setStn(station);
    clearInputs();
  }
  return (
    <div className="max-h-[300px] overflow-scroll no-scrollbar">
        {
            stations?.map((station) => {
                return <div onClick={() => setSelectedStation(station)} className="bg-white p-2 my-2 rounded-lg cursor-pointer hover:bg-gray-100" key={station?.stationCode}>
                    <p>{station?.stationCode} - {station?.stationName}</p>
                </div>
            })
        }
    </div>
  )
}

export default TrainSuggestionList