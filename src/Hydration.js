class Hydration {
  constructor(hydrationInfo, currentID) {
    this.hydrationInfo = hydrationInfo.hydrationData;
    this.currentUserID = currentID;
    this.currentUser = this.findUserHydration();
  }

  findUserHydration() {
    return this.hydrationInfo.filter(user => user.userID === this.currentUserID);
  }

  findHydrationAverage() {
    let totalHydration = this.currentUser.reduce((acc, elem) => {
      acc += elem.numOunces;
      return acc;
    }, 0);
    return Math.round(totalHydration / this.currentUser.length);
  }

  findCurrentHydration(date) {
    return this.currentUser.find((elem) => {
      return elem.date === date;
    }).numOunces;
  }

  findOuncesPerWeek() {
    let hydrationWeek = this.currentUser.slice(-7).map((info) => info.numOunces);
    let hydrationDates = this.currentUser.slice(-7).map((info) => info.date);
    return {
      ounces: hydrationWeek,
      dates: hydrationDates,
    }
  }
}

export default Hydration;
