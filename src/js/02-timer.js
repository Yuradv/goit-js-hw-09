import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  deltaTime: '',
  newDate: '',

  onClose(selectedDates) {
    options.newDate = selectedDates[0].getTime();
    options.deltaTime = options.newDate - options.defaultDate;
    refs.startBtn.disabled = false;

    if (options.newDate < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    }
  },
  onStart() {
    timerId = setInterval(() => {
      refs.startBtn.disabled = true;
      options.deltaTime = options.newDate - Date.now();
      const time = convertMs(options.deltaTime);

      refs.startBtn.removeEventListener('click', options.onStart);
      updateTime(time);
      if (options.deltaTime <= 0) {
        clearInterval(timerId);
        clearTimer();
      }
    }, 1000);
  },
};

flatpickr(refs.dateInput, options);

function updateTime(e) {
  refs.days.textContent = e.days;
  refs.hours.textContent = e.hours;
  refs.minutes.textContent = e.minutes;
  refs.seconds.textContent = e.seconds;
}

function clearTimer() {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
}

///

refs.startBtn.addEventListener('click', options.onStart);

///

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
