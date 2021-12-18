let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'img/1.jpg',
        name : ' অভিমান',
        artist : 'Tanveer Even',
        music : 'music/Oviman _ অভিমান _ Tanveer Evan _ Piran Khan _ Jovan _ Mehazabien _ Best Friend 3 Drama Song 2021(MP3_128K).mp3'
    },
    {
        img : 'img/4.jpeg',
        name : 'প্রেম তুমি',
        artist : 'Tahsan Khan',
        music : 'music/Prem Tumi _ Tahsan _ Tisha _ Sajid Sarkar _ Angry Bird _ Mizanur Rahman Aryan _ Bangla Drama Song(MP3_128K).mp3'
    },
    {  
        img : 'img/3.jpg',
        name : 'Shey ki jane',
        artist : 'Ahmed Shakib',
        music : 'music/Shey ki jane(Lofi Remix) -Ahmed Shakib___Tanveer Evan.__Lyrics  Video_MaSuMa _NiShAt(MP3_128K).mp3'
    },
    {
        img : 'img/4.jpeg',
        name : 'Bangla Mashup',
        artist : 'Hasan S. Iqbal',
        music : 'music/Bangla Mashup 3 - Hasan S. Iqbal  (7Hits in four minutes)(MP3_128K).mp3'
    },
    {
        img : 'img/3.jpg',
        name : 'Why Not Me',
        artist : 'Enrique Iglesias',
        music : 'music/Enrique Iglesias - Why Not Me (Lyrics Video)(MP3_128K).mp3'
    },
    {
        img : 'img/2.jpg',
        name : 'Tumi Jaio Na',
        artist : 'Mumzy Stranger',
        music : 'music/Master-D - Tumi Jaio Na ft. Mumzy Stranger (Official Music Video)(MP3_128K).mp3'
    },
    {
        img : 'img/1.jpg',
        name : 'ডুবে ডুবে ',
        artist : 'Tanjib Sarowar',
        music : 'music/Dube Dube _ ডুবে ডুবে  _ Tanjib Sarowar _ Samonty Shoumi _ Sajid Sarker _ Bangla New Song 2020(MP3_128K).mp3'
    },
    {
        img : 'img/4.jpeg',
        name : 'Jodi Thakte Tumi ',
        artist : 'Hasan S. Iqbal ',
        music : 'music/Hasan S. Iqbal - Jodi Thakte Tumi - Official Music Video 2020(MP3_128K).mp3'
    },
    {
        img : 'img/1.jpg',
        name : 'Maine Royaan',
        artist : 'Tanveer Evan',
        music : 'music/Maine Royaan _ Lofi_Remix_ Tanveer Evan(MP3_128K).mp3'
    },
    {
        img : 'img/2.jpg',
        name : 'Sun Saathiya',
        artist : 'Varun Dhawan _ Shraddha Kapoor',
        music : 'music/Sun Saathiya Full Video _ Disney_s ABCD 2 _ Varun Dhawan _ Shraddha Kapoor _ Sachin Jigar _ Priya S(MP3_128K).mp3'
    },
    {
        img : 'img/1.jpg',
        name : 'Ojanai',
        artist : 'Tanveer Evan',
        music : 'music/Ojanai _ Tanveer Evan _ Mehazabien _ Jovan _ Love Vs Crush _ Piran Khan _ Bangla Song 2018(MP3_128K).mp3'
    },
    {
        img : 'img/2.jpg',
        name : 'Let Me Love You',
        artist : 'Justin Bieber',
        music : 'music/DJ Snake ft. Justin Bieber - Let Me Love You [Lyric Video](MP3_128K).mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}

