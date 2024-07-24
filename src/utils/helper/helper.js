export const getFormattedDate = (doj) => {
    const trainDoj = new Date(doj);
    const date = trainDoj.getDate();
    const month = trainDoj.getMonth() + 1;
    const year = trainDoj.getFullYear();

    return `${date}-${month > 9 ? month : `0${month}`}-${year}`
}

export function debounce(func, delay=300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export const filterStationName = (trainData, type) => {
    const stnList = [];
    const addedStnList = [];

    trainData?.map((data) => {
        if(!(addedStnList.includes(data[type]))){
            stnList.push({value: data[type]});
            addedStnList.push(data[type]);
        }
    }) 


    return stnList;
}