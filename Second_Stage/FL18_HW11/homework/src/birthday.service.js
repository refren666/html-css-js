const MS_IN_SECOND = 1000;
const SECONDS_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;

const RESOLVE_TIMEOUT = 100;

const DAY = MS_IN_SECOND * SECONDS_IN_HOUR * HOURS_IN_DAY;

class BirthdayService {
  notifyWaitingTime(rowDays) {
    if (rowDays > 0) {
      const message = `Oh, you have celebrated it ${rowDays} day${
        rowDays > 1 ? 's' : ''
      } ago, don't you remember?`;

      console.log(message);

      return message;
    }
    const days = Math.abs(rowDays);
    const message = `Soon...Please, wait just ${days} day${
      days > 1 ? 's' : ''
    }`;
    console.log(message);

    return message;
  }
  congratulateWithBirthday() {
    const message = 'Hooray!!! It is today!';
    console.log(message);

    return message;
  }
  howLongToMyBirthday(date) {
    return new Promise((res, rej) => {
      if (
        !date ||
        !(date instanceof Date) ||
        (date instanceof Date && isNaN(date)) ||
        !date.__proto__.hasOwnProperty('getDate')
      ) {
        rej(new Error('Wrong argument!'));
      }

      const month = date.getMonth();
      const day = date.getDate();

      const currentDate = new Date(Date.now());
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();

      if (month === currentMonth && day === currentDay) {
        setTimeout(() => {
          const resolveValue = this.congratulateWithBirthday();
          res(resolveValue);
        }, RESOLVE_TIMEOUT);

        return;
      }

      setTimeout(() => {
        const currentYear = currentDate.getFullYear();

        const newDate = Date.UTC(currentYear, month, day);
        const current = Date.UTC(currentYear, currentMonth, currentDay);

        const time = (current - newDate) / DAY;
        const resolveValue = this.notifyWaitingTime(time);
        res(resolveValue);
      }, RESOLVE_TIMEOUT);
    });
  }
}

module.exports = BirthdayService;
