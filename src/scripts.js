// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

//console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import domUpdates from './domUpdates';
import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';



// DOM ELEMENTS
let userInfo = document.getElementById('userInfo');
let hydrationAvgDay = document.getElementById('hydrationAvgDay');
let hydrationAvgWeek = document.getElementById('hydrationAvgWeek');
let sleepHoursLastDay = document.getElementById('sleepHoursLastDay');
let sleepQualityLastDay = document.getElementById('sleepQualityLastDay');
let sleepHoursLastWeek = document.getElementById('sleepHoursLastWeek');
let sleepQualityLastWeek = document.getElementById('sleepQualityLastWeek');
let sleepHoursAllTime = document.getElementById('sleepHoursAllTime');
let sleepQualityAllTime = document.getElementById('sleepQualityAllTime');




// EVENT LISTENERS



// GLOBAL VARIABLES
let date = '2020/01/22'
let randomID, strideLength, stepGoal;

const callAllData = (file) => {
  fetch(`http://localhost:3001/api/v1/${file}`)
  .then((response) => response.json())
  .then((data) => {
    if (file === 'users') {getUserData(data);}
    if (file === 'hydration') {getHydrationData(data);}
    if (file === 'sleep') {getSleepData(data);}
    if (file === 'activity') {getActivityData(data);}
  });
}

const getUserData = (data) => {
  const userRepository = new UserRepository(data.userData);
  randomID = getRandomUser(data.userData);
  const averageStepGoal = userRepository.calculateAverageStepGoal();
  const currentUser = new User(userRepository.getUserData(randomID));
  strideLength = currentUser.strideLength;
  stepGoal = currentUser.stepGoal;
  domUpdates.displayUserInfo(userInfo, currentUser, averageStepGoal);
};

const getHydrationData = (data) => {
  const hydrationData = new Hydration(data, randomID);
  const hydrationAverage = hydrationData.findHydrationAverage();
  const hydrationToday = hydrationData.findCurrentHydration(date);
  const hydrationWeek = hydrationData.findOuncesPerWeek();
  domUpdates.displayHydrationPerDay(hydrationAvgDay, hydrationToday);
  domUpdates.displayHydrationPerWeek(hydrationAvgWeek, hydrationWeek);
  // console.log('hydration data: ', hydrationData);
  // console.log('hydration avg: ', hydrationAverage);
  // console.log('hydration today: ', hydrationToday);
  // console.log('hydration week: ', hydrationWeek);
}

const getSleepData = (data) => {
 const sleepData = new Sleep(data, randomID);
 const sleepHoursDate = sleepData.findCurrentSleepHours(date);
 const sleepQualityDate = sleepData.findCurrentSleepQuality(date);
 const sleepHoursWeek = sleepData.findSleepWeek();
 const sleepQualityWeek = sleepData.findSleepQualityWeek()
 const sleepHourAverage = sleepData.findSleepHourAverage();
 const sleepQualityAverage = sleepData.findSleepQualityAverage();
 domUpdates.displaySleptHoursPerDay(sleepHoursLastDay, sleepHoursDate);
 domUpdates.displaySleptQualityPerDay(sleepQualityLastDay, sleepQualityDate);
 domUpdates.displaySleptHoursPerWeek(sleepHoursLastWeek, sleepHoursWeek);
 domUpdates.displaySleptQualityPerWeek(sleepQualityLastWeek, sleepQualityWeek);
 domUpdates.displaySleptHoursAll(sleepHoursAllTime, sleepHourAverage);
 domUpdates.displaySleptQualityAll(sleepQualityAllTime, sleepQualityAverage);
//  console.log('sleep class: ', sleepData);
//  console.log('sleep hours for date: ', sleepHoursDate);
//  console.log('sleep quality for date: ', sleepQualityDate)
//  console.log('sleep week: ', sleepHoursWeek);
//  console.log('sleep hour avg: ', sleepHourAverage);
//  console.log('sleep qual avg: ', sleepQualityAverage);
}

const getActivityData = (data) => {
  const activityData = new Activity(data, randomID);
  const stepsDate = activityData.findUserSteps(date);
  const minutesDate = activityData.findUserMinutes(date);
  const stairsDate = activityData.findUserStairs(date);
  const milesWalked = activityData.calculateMilesWalked(strideLength, date);
  const averageStairsAllDate = activityData.findAverageStairsAll(date);
  const averageStepsAllDate = activityData.findAverageStepsAll(date);
  const averageMinutesAllDate = activityData.findAverageMinutesAll(date);
  const minutesWeek = activityData.findUserMinutesWeek();
  const stepsWeek = activityData.findUserStepsWeek();
  const stairsWeek = activityData.findUserStairsWeek();
  console.log('steps:', stepsDate);
  console.log('minutes: ', minutesDate);
  console.log('stairs: ', stairsDate)
  console.log('miles walked: ', milesWalked);
  console.log('average stairs all: ', averageStairsAllDate);
  console.log('average steps all: ', averageStepsAllDate);
  console.log('average minutes all: ', averageMinutesAllDate);
  console.log('minutes week: ', minutesWeek);
  console.log('steps week: ', stepsWeek);
  console.log('stairs week: ', stairsWeek);
}

const getRandomUser = (array) => {
  return Math.floor(Math.random() * array.length + 1);
};

callAllData('users');
callAllData('hydration');
callAllData('sleep');
callAllData('activity');
