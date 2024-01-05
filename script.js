let startTime;
let running = false;
let laps = [];

function startPause() {
    if (!running) {
        start();
    } else {
        pause();
    }
}

function start() {
    startTime = new Date() - laps.reduce((acc, lap) => acc + lap, 0);
    running = true;
    document.getElementById('startPause').textContent = 'Pause';
    update();
}

function pause() {
    running = false;
    document.getElementById('startPause').textContent = 'Resume';
    laps.push(new Date() - startTime);
}

function reset() {
    running = false;
    startTime = 0;
    laps = [];
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startPause').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = new Date() - startTime;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        document.getElementById('laps').appendChild(lapItem);
    }
}

function update() {
    if (running) {
        const elapsedTime = new Date() - startTime;
        document.getElementById('display').textContent = formatTime(elapsedTime);
        setTimeout(update, 10);
    }
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Initial setup
reset();
