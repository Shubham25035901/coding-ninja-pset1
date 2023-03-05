
const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
const currHour = document.getElementById('curr-hour');
const currMinute = document.getElementById('curr-minute');
const currSeconds = document.getElementById('curr-second');
const currConvention = document.getElementById('curr-convention');
const alarmDate = document.getElementById('date');

const btnSubmit = document.querySelector('[type="submit"]');

const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');
const convention = document.getElementById('convention');


const INTERVAL = 1000;
audio.play();

const state = {
    _hour : 0,
    _minute: 0,
    _second: 0,
    _convention: '',
}
const dt  = new Date();
const isAlarmSet = false;


btnSubmit.addEventListener('click', e => {
    e.preventDefault();


    state._hour = (+hour.value <= 24 && +hour.value >= 1) ?  +hour.value > 12 ? +hour.value - 12 :  +hour.value : 0;
    state._minute = (+minute.value <= 60 && +minute.value >= 1) ? +minute.value : 0;
    state._second = (+second.value <= 60 && +second.value >= 1) ? +second.value : 0;
    state._convention = convention.value;

    console.log(state);
})


function currentTime() {
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();
    let convention = hours >= 12 ? 'PM' : 'AM'; 

    return {hours, minutes, seconds, convention}
}

function createAlarm() {
    const  {hours, minutes, seconds, convention} = currentTime();
    const  {_hours, _minutes, _seconds, _convention} = state;

    if(_hours >= hours){
        console.log('Alarm ringing');
    } 
}



function clearAlarm() {
    state._hour = 0;
    state._minute = 0;
    state._second = 0;
    state._convention = '';
    isAlarmSet  = false;
}

setInterval(() => {
    alarmDate.setAttribute("min", dt);
    displayCurrentTime();

},INTERVAL)

function displayCurrentTime() {
    let {hours,minutes,seconds,convention} = currentTime();  
    // convert 24hrs into 12hrs time
    if (hours >= 12){
        hours -= 12;
    }
    currHour.textContent = hours;
    currMinute.textContent = minutes;
    currSeconds.textContent = seconds;
    currConvention.textContent = convention;
}

