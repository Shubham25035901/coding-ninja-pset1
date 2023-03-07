// Selecting the DOM elements
const alarmPicker = document.querySelector('#alarm-clock')
const btnSetAlarm = document.querySelector('.btn-set-alarm')
const btnClearAlarm = document.querySelector('.btn-clr-alarm')
const clock = document.querySelector('.clock')
const alarmList = document.querySelector('.alarms-list')

// This audio will play when alarm starts
const audio = new Audio(
  'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3',
)
// Audio loop set to true so audio keeps on playing
audio.loop = true

// Program state as an object
const state = {
  alarmTime: null,
  alarmTimeout: null,
}
alarmPicker.setAttribute('min', new Date())

// Function that formats the displayed time
const formatTime = time => (time < 10 ? '0' + time : time)

// Function to create and display the current time
function updateClockTime() {
  // Getting the date from Date constructor and extract hour, minute, and second
  const dt = new Date()
  const hour = formatTime(dt.getHours())
  const minute = formatTime(dt.getMinutes())
  const second = formatTime(dt.getSeconds())

  clock.innerHTML = `
      <h2>Current Time:</h2>
      <span>${hour} Hr</span>
      <span>${minute} Min</span>
      <span>${second} Sec</span>
      <span>${hour > 12 ? 'PM' : 'AM'}</span>
  `
}

// Running interval every 1000ms to update time
setInterval(updateClockTime, 1000)

const setAlarmTime = value => (state.alarmTime = value)

function setAlarm() {
  if (state.alarmTime) {
    const current = new Date()
    const timeToAlarm = new Date(state.alarmTime)

    if (timeToAlarm > current) {
      const timeout = timeToAlarm.getTime() - current.getTime()
      state.alarmTimeout = setTimeout(() => audio.play(), timeout)
      alert('The alarm is set for ' + timeToAlarm)
    }
  }
}

function stopAlarm() {
  audio.pause()
  if (state.alarmTimeout) {
    clearTimeout(state.alarmTimeout)
    alert('The alarm is cleared')
    state.alarmTime = null,
    state.alarmTimeout = null
  }
}

alarmPicker.addEventListener('change', function () {
  setAlarmTime(this.value)
})

btnSetAlarm.addEventListener('click', () => {
  setAlarm()
  btnSetAlarm.disabled = true
  btnClearAlarm.disabled = false
  if (state.alarmTime) {
    const atime = state.alarmTime.split('T').join(' - ')
    alarmList.innerHTML = `<li>${atime}</li>`
  }
})

btnClearAlarm.addEventListener('click', () => {
  stopAlarm()
  btnSetAlarm.disabled = false
  alarmList.innerHTML = `<li>No alarm has been set.</li>`
  btnClearAlarm.disabled = true
})