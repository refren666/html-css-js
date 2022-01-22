// Task1:
const getAge = (birthDate) => {
    const ageDifference = Date.now() - Date.parse(birthDate);
    const ONE_YEAR = 31556952000;

    return Math.floor(ageDifference / ONE_YEAR);
}

// Task2:
const getWeekDay = (date) => {
    // const getDayFromInputDate = new Date(date).getDay();
    // const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // return weekdays[getDayFromInputDate];

    // OR

    return new Date(date).toLocaleString('en-US', {weekday: 'long'});
}

// Task3:
const getAmountDaysToNewYear = (date) => {
    const MILLISECONDS_IN_DAY = 86400000;
    const now = new Date();

    return Math.ceil((new Date(now.getFullYear() + 1, 0, 1) - date) / MILLISECONDS_IN_DAY);
}

// Task 4:
const getProgrammersDay = year => {
    const TWO = 2;
    const programmersDay = new Date(`${year}-09-13`);
    const dateArray = programmersDay.toDateString().split(' ');

    return `${dateArray[TWO]} ${dateArray[1]}, ${year} (${getWeekDay(programmersDay)})`
}

// Task 5:
const howFarIs = weekday => {
    const convertedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const findIndex = days.findIndex(day => day === convertedWeekday);

    if (today > findIndex) {
        return `It's ${days.length - today + findIndex} day(s) left till ${convertedWeekday}`
    } else if (today < findIndex) {
        return `It's ${findIndex - today} day(s) left till ${convertedWeekday}`
    } else {
        return `Hey, today is ${convertedWeekday} =)`;
    }
}

// Task 6:
const isValidIdentifier = variable => /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(variable)

// Task 7:
const capitalize = str => str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())

// Task 8:
const isValidAudioFile = str => /^([a-zA-Z]+)(.mp3|.flac|.alac|.aac)$/.test(str)

// Task 9:
const getHexadecimalColors = str => str.match(/#([a-f0-9]{3}){1,2}\b/gi) || [];

// Task 10:
const isValidPassword = password => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)

// Task 11:
const addThousandsSeparators = num => parseInt(num).toLocaleString();

// Task 12:
const getAllUrlsFromText = text => text.match(/(https?:\/\/[^\s]+)/g) || [];
