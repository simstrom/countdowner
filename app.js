const form = document.querySelector('form');
const userState = document.querySelector('#user-input');

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const userEvent = {
        title: form.elements[0].value,
        date: form.elements[1].value,
        image: form.elements[2].value,
    };
    const displayState = await buildEvent(userEvent.title);
    displayEvent(displayState, userEvent.image);
    userEvent.date = new Date(userEvent.date);
    startTimer(userEvent.date);
    for (const input of form.elements) {
        input.value = '';
    }
});

const buildEvent = async (title) => {
    const container = document.createElement('div');
    container.classList.add('container', 'd-flex', 'flex-column');
    container.setAttribute('id', 'user-display');
    container.innerHTML = `<h1 class="event-title display-5">Countdown to ${title}!</h1>
    <div class="countdown-box container">
        <div class="time-box">
            <p class="time" id="days">0
            </p>
            <p class="info">days</p>
        </div><div class="time-box">
                <p class="time" id="hours">0
                </p>
                <p class="info">hours</p>
            </div><div class="time-box">
                <p class="time" id="minutes">0
                </p>
                <p class="info">minutes</p>
            </div><div class="time-box">
                <p class="time" id="seconds">0
                </p>
                <p class="info">seconds</p>
            </div></>
    </div>
    <button type="button" class="btn btn-dark" id="reset">Reset</button>`;
    return container;
};

const displayEvent = (state, background) => {
    resetCurrentState(userState);
    document.body.prepend(state);
    document.body.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${background})`;
    document.body.style.backgroundPosition = 'top center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';

    window.getComputedStyle(state).opacity;
    state.className += ' in';

    console.log(state);
    const resetBtn = document.querySelector('#reset');
    resetBtn.addEventListener('click', () => {
        resetCurrentState(state);
        revertStates();
    });
};

const resetCurrentState = (state) => {
    state.className -= ' in';
    state.style.display = 'none';
};

const revertStates = () => {
    userState.style.display = 'block';
    userState.className += ' in';
    document.body.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1628692945421-21162c93a8a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)`;
    document.body.style.backgroundPosition = 'top center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
};

const updateTime = (timeBoxes, targetTime) => {
    const currentTime = new Date();
    const timeDifference = Math.floor((targetTime - currentTime) / 1000);

    const days = Math.floor(timeDifference / 86400);
    const hours = Math.floor((timeDifference / 3600) % 24);
    const minutes = Math.floor((timeDifference / 60) % 60);
    const seconds = Math.floor(timeDifference % 60);
    const times = [days, hours, minutes, seconds];

    for (let i = 0; i < timeBoxes.length; i++) {
        timeBoxes[i].innerHTML = formatTime(times[i]);
    }
};

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const startTimer = (targetTime) => {
    const timeBoxes = document.querySelectorAll('.time');
    updateTime(timeBoxes, targetTime);
    setInterval(() => {
        updateTime(timeBoxes, targetTime);
    }, 1000);
};
