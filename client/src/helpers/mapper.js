//events list mapping function for calendar
import moment from "moment"

const mapper = (arr) => {
    let newArr = []
    for (var i = 0; i < arr.length; i++) {
        let obj = {start: moment(arr[i].startdate), end: moment(arr[i].startdate), title: arr[i].name}
        newArr.push(obj)
    }
    console.log(newArr)
    return newArr
}

export default mapper;