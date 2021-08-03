/* Your Code Here */
const createEmployeeRecord = (employeeArray) => {
    
    return {
        'firstName': employeeArray[0],
        'familyName': employeeArray[1],
        'title': employeeArray[2],
        'payPerHour': employeeArray[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

const createEmployeeRecords = (employeeRecord) => {
    return employeeRecord.map(each => createEmployeeRecord(each))
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date,
    })
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
   let timeIn = this.timeInEvents.find(function(date){
       return date.date === dateStamp
   })

   let timeOut = this.timeOutEvents.find(function(date) {
       return date.date === dateStamp
   })
   return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(dateStamp) {
    let answer = ((hoursWorkedOnDate.call(this, dateStamp)) * this.payPerHour)

    return answer
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(employeeArray, firstName) {
    let foundByName = employeeArray.filter(name => name.firstName === firstName)
    return foundByName[0]

}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((total, employee) => total + allWagesFor.call(employee), 0)
}