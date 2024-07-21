export const getFormattedDate = (doj) => {
    const trainDoj = new Date(doj);
    const date = trainDoj.getDate();
    const month = trainDoj.getMonth() + 1;
    const year = trainDoj.getFullYear();

    return `${date}-${month > 9 ? month : `0${month}`}-${year}`
}