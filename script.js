const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

//Music
const songs = [
    {
        name: 'damso-1',
        displayName: '911',
        artist: 'Damso',
    },
    {
        name: 'damso-2',
        displayName: 'J\'Respecte R',
        artist: 'Damso',
    },
    {
        name: 'damso-3',
        displayName: 'Mwaka Moon',
        artist: 'Damso feat Kalash',
    },
    {
        name: 'metric-1',
        displayName: 'Feu de bois',
        artist: 'Damso',
    }

]

// Check if playing
let isPlaying = false

// Play
function playSong(){
    isPlaying = true
    playBtn.classList.replace("fa-play-circle", "fa-pause-circle")
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

// Pause
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace("fa-pause-circle", "fa-play-circle")
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// Update the Dom
function loadSong(song){
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

//Current Song
let songIndex = 0

// On load select first song

loadSong(songs[songIndex]);

function prevSong() {
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong()
}

// Event Listeners
prevBtn.addEventListener('click', prevSong)

function nextSong() {
    songIndex++
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}

nextBtn.addEventListener('click', nextSong)

function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement
        // Update the progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        // calculate the display for duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
    //    delay switching duration to avoid NaN
        if (durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // calculate the display for current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)

function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    // currentTime is an audio attribute
    music.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgressBar)
