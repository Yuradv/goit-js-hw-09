const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

intervalId = null;

refs.btnStart.addEventListener('click', startChangeBcgColor);
refs.btnStop.addEventListener('click', stopChangeBcgColor);

function startChangeBcgColor() {
  intervalId = setInterval(makeIntervalSwitcher, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}

function stopChangeBcgColor() {
  clearInterval(intervalId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}

function makeIntervalSwitcher() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
