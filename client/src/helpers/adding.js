//date adding function

const addDays = (date, freq) => {
    let days = 0
    if (freq === 1) {
        days = 7
    } else if(freq === 2) {
        days = 3
    } else if(freq === 3) {
        days = 2
    } else if(freq === 4) {
        days = 2
    } else if(freq === 7) {
        days = 1
    } else {
        days = 1000
    }
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result
}

export default addDays;