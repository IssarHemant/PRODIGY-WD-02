let startTime;
        let lapStartTime;
        let isRunning = false;
        let intervalId;
        let lapCounter = 1;

        function startStopwatch() {
            if (!isRunning) {
                startTime = Date.now();
                lapStartTime = startTime;
                intervalId = setInterval(updateStopwatch, 1000);
                isRunning = true;
            }
        }

        function stopStopwatch() {
            clearInterval(intervalId);
            isRunning = false;
        }

        function resetStopwatch() {
            stopStopwatch();
            document.getElementById('stopwatch').textContent = '00:00:00';
            document.getElementById('laps').innerHTML = '';
            lapCounter = 1;
        }

        function trackLap() {
            if (isRunning) {
                const lapTime = calculateLapTime();
                displayLapTime(lapTime);
                lapStartTime = Date.now();
                lapCounter++;
            }
        }

        function calculateLapTime() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - lapStartTime;

            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);

            return `${padZero(minutes)}:${padZero(seconds)}`;
        }

        function displayLapTime(lapTime) {
            const lapsContainer = document.getElementById('laps');
            const lapElement = document.createElement('div');
            lapElement.className = 'lap-time';
            lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
            lapsContainer.appendChild(lapElement);
        }

        function updateStopwatch() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;

            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);

            const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
            document.getElementById('stopwatch').textContent = formattedTime;
        }

        function padZero(num) {
            return num < 10 ? `0${num}` : num;
        }