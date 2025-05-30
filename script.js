console.log("welcome to spotify");

let index = 0;
let songIndex = 1;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let playingGif = document.getElementById('playingGif');
let songsItems = document.getElementsByClassName('songItem');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songNameAtBottom = document.getElementById('songNameAtBottom');
let songs = [
    {songName:"Kal-Bhairav-Ashtakam", filePath:'song/1.mp3',coverPath:'covers/1.jpeg'},
    {songName:"Saza Hoo Gaya Mainu", filePath:'song/2.mp3',coverPath:'covers/2.jpeg'},
    {songName:"Am i Dreaming", filePath:'song/3.mp3',coverPath:'covers/3.jpeg'},
    {songName:"Aarti Kunj Bihari Ki 2", filePath:'song/4.mp3',coverPath:'covers/4.jpeg'},
    {songName:"Suno Na Sang-e-Marmar", filePath:'song/5.mp3',coverPath:'covers/5.jpeg'},
    {songName:"Are Dwarpalo Kanhaiya se", filePath:'song/6.mp3',coverPath:'covers/6.jpeg'},
    {songName:"Aa-salam-e-ishq", filePath:'song/7.mp3',coverPath:'covers/7.jpeg'},
    {songName:"Ishq ka Raja", filePath:'song/8.mp3',coverPath:'covers/8.jpeg'},
    {songName:"Aarti Kunj Bihari Ki", filePath:'song/9.mp3',coverPath:'covers/9.jpeg'}
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].textContent = songs[i].songName;
})


//handle play/pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playingGif.style.opacity = '1';
    
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        playingGif.style.opacity = '0';
    }
})

document.addEventListener('keydown',(event)=>{
    if(event.code=='Space'){
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            playingGif.style.opacity = '1';
        
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            playingGif.style.opacity = '0';
        }
    }
    else if(event.key == 'ArrowRight'){
        nextFunc();
    }
    else if(event.key == 'ArrowLeft'){
        previousFunc();
    }
})


audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
    
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        songNameAtBottom.innerText = songs[songIndex-1].songName;
        playingGif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})


document.getElementById('previous').addEventListener('click',previousFunc=()=>{
    if(songIndex == 1){
        songIndex = 9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songNameAtBottom.innerText = songs[songIndex-1].songName;
    playingGif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click',nextFunc = ()=>{
    if(songIndex >= 9){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songNameAtBottom.innerText = songs[songIndex-1].songName;
    playingGif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    
})