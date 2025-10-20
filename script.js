//your JS code here. If required.
        const playAndPauseBtns = document.getElementById("playAndPauseBtns");
        const playBtn = document.getElementById("play")
        const pauseBtn = document.getElementById("pause")

        const rainVideo = document.getElementById("rain");
        const beachVideo = document.getElementById("beach");
        const rainSong = document.getElementById("rainSong");
        const beachSong = document.getElementById("beachSong");

        const sunBtn = document.getElementById("sun");
        const cloudBtn = document.getElementById("cloud");

        const Timer = document.getElementById("timer");

        const twoMinBtn = document.querySelector(".twoMinBtn");
        const fiveMinBtn = document.querySelector(".fiveMinBtn");
        const tenMinBtn = document.querySelector(".tenMinBtn");

        let isRain = false;

        let intervalTime;
        let isPaused = false;
        let remainingTime = 0;

        let currentPlayingTime = 600;
        let start = true;

        playAndPauseBtns.addEventListener("click", (e) => {
            const currentVideo = isRain ? rainVideo : beachVideo;
            const currentAudio = isRain ? rainSong : beachSong;
            console.log(e.target);
            if (e.target.id == "pause") {
                playBtn.style.display = "block";
                pauseBtn.style.display = "none";
                currentVideo.pause();
                currentAudio.pause();
                clearInterval(intervalTime);
                isPaused = true;
            }
            else if (e.target.id == "play") {
                playBtn.style.display = "none";
                pauseBtn.style.display = "block";
                if (start) {
                    timer(600);
                    start = false;
                }
                currentVideo.play();
                currentAudio.play();
                if (isPaused && remainingTime > 0) {
                    timer(remainingTime,true); // Resume timer
                    isPaused = false;
                }
            }
        })

        sunBtn.addEventListener("click", (e) => {
            isRain = false;

            beachVideo.classList.remove("hide");
            rainVideo.classList.add("hide");

            rainVideo.pause();
            rainSong.pause();
            beachVideo.pause();
            beachSong.pause();

            rainVideo.currentTime = 0;
            rainSong.currentTime = 0;
            beachVideo.currentTime = 0;
            beachSong.currentTime = 0;

            clearInterval(intervalTime);
            isPaused=false;
            start=false;

            if (currentPlayingTime > 0) {
                timer(currentPlayingTime);
                pauseBtn.style.display = "block";
                playBtn.style.display = "none";
                //beachVideo.play();
                //beachSong.play();
            }else {
                Timer.innerText = "00:00";
            }
        })

        cloudBtn.addEventListener("click", (e) => {
            isRain = true;

            beachVideo.classList.add("hide");
            rainVideo.classList.remove("hide");

            rainVideo.pause();
            rainSong.pause();
            beachVideo.pause();
            beachSong.pause();

            rainVideo.currentTime = 0;
            rainSong.currentTime = 0;
            beachVideo.currentTime = 0;
            beachSong.currentTime = 0;

            clearInterval(intervalTime);
            isPaused=false;
            start=false;

            if (currentPlayingTime > 0) {
                timer(currentPlayingTime);
                pauseBtn.style.display = "block";
                playBtn.style.display = "none";
                //beachVideo.play();
                //beachSong.play();
            }else {
                Timer.innerText = "00:00";
            }
        })

        twoMinBtn.addEventListener("click", (e) => {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            clearInterval(intervalTime);
            isPaused = false;
            
            currentPlayingTime = 120;
            timer(currentPlayingTime, true);

            rainVideo.currentTime = 0;
            rainSong.currentTime = 0;

            beachVideo.currentTime = 0;
            beachSong.currentTime = 0;
        })

        fiveMinBtn.addEventListener("click", (e) => {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            clearInterval(intervalTime);
            isPaused = false;

            currentPlayingTime = 300;
            timer(currentPlayingTime, true);

            rainVideo.currentTime = 0;
            rainSong.currentTime = 0;

            beachVideo.currentTime = 0;
            beachSong.currentTime = 0;
        })

        tenMinBtn.addEventListener("click", (e) => {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            clearInterval(intervalTime)
            isPaused = false;

            currentPlayingTime = 600;
            timer(currentPlayingTime, true);

            rainVideo.currentTime = 0;
            rainSong.currentTime = 0;

            beachVideo.currentTime = 0;
            beachSong.currentTime = 0;
        })


        function timer(time, isResume = false) {
            let currentAudio = isRain ? rainSong : beachSong;
            let currentVideo = isRain ? rainVideo : beachVideo;
            if (!isResume) {
                currentAudio.currentTime = 0;
                currentVideo.currentTime = 0;
            }
            currentAudio.play();
            currentVideo.play();
            remainingTime = time;

			let mins = Math.floor(time / 60);
		    let secs = Math.floor(time % 60);
		    Timer.innerText = `${mins}:${secs === 0 ? "0" : secs}`;

		    time--;
		    remainingTime = time;
            intervalTime = setInterval(() => {
                let mins = Math.floor(time / 60);
                let secs = Math.floor(time % 60);
                Timer.innerText = `${mins}:${secs}`
                time--;
                remainingTime = time;
                if (time < 0) {
                    clearInterval(intervalTime);
                    currentAudio.pause();
                    currentVideo.pause();
                    playBtn.style.display = "block";
                    pauseBtn.style.display = "none";
                    Timer.innerText = "00:00";
                }
            }, 1000);
        }
