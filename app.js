class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playbtn = document.querySelector('.play');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
    }

    activePad(){
        this.classList.toggle('active');
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0; 
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }

    start (){
        console.log(this);
        const interval = (60/this.bpm) * 1000;
        if(!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
    }
    else{
        clearInterval(this.isPlaying);
        this.isPlaying = null;
    }
    }

    updateBtn(){
        if(!this.isPlaying){
            this.playbtn.innerText = 'Stop';
            this.playbtn.classList.add('active');
        }
        else{
            this.playbtn.innerText = 'Play';
            this.playbtn.classList.remove('active');
        }
    }

    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;

            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;

            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 0;
                    break;

                case '1':
                    this.snareAudio.volume = 0;
                    break;

                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else{
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 1;
                    break;

                case '1':
                    this.snareAudio.volume = 1;
                    break;

                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
}

const drumkit = new Drumkit();

drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = '';
    })
})

drumkit.playbtn.addEventListener('click', () => {
    drumkit.updateBtn();
    drumkit.start();
})

drumkit.selects.forEach(select => {
    select.addEventListener('click', function(e){
        drumkit.changeSound(e);
    })
})

drumkit.muteBtns.forEach(mute => {
    mute.addEventListener('click', function(e){
        drumkit.mute(e);
    })
})