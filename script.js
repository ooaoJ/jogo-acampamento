const character = document.getElementById("player");
const playButton = document.getElementById("play");
const background = document.getElementById("background");
const screenButton = document.getElementById("screen-control");

character.style.opacity = 0;
let walking = false;
let bgOffset = 0;

var timer = 0;
var clock = null;

function temporizador() {
  if (clock === null) {
    clock = setInterval(() => {
      timer++;
      console.log("Tempo:", timer);
    }, 1000);
  }
}


playButton.addEventListener("click", function () {
    const modal = document.getElementById("modal");
    const screen = document.getElementById("open-modal");

    modal.classList.add("modal-closed");
    screen.classList.add("screen-closed");
    background.style.transform = "scale(1.5)";
    character.classList.add("player-append");
    
    temporizador();

    setTimeout(() => {
        screen.style.display = "none";
        character.classList.remove("player-append");
        character.style.opacity = 1;
    }, 1500);
});

screenButton.addEventListener("click", function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            screenButton.src = "assets/Images/lesscreen-mark.png";
        });
    } else {
        document.exitFullscreen().then(() => {
            screenButton.src = "assets/Images/fullscreen-mark.png";
        });
    }
});

document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && !walking) {
        walking = true;
        character.classList.add("walk");

        let position = parseInt(window.getComputedStyle(character).left);
        const maxPosition = 1250;
        const minPosition = 500;
        const maxBgOffset = 900;
        const minBgOffset = 0;

        let direction = 1;
        if (e.shiftKey) {
            direction = -1;
            character.style.transform = "scale(0.8) scaleX(-1)";
        } else {
            character.style.transform = "scale(0.8) scaleX(1)";
        }

        character.style.backgroundPosition = "0px";

        const walkInterval = setInterval(() => {
            if ((direction === 1 && position < maxPosition) || (direction === -1 && position > minPosition)) {
                position += 10 * direction;
                bgOffset = Math.max(minBgOffset, Math.min(maxBgOffset, bgOffset + 30 * direction));

                character.style.left = position + "px";
                background.style.transform = `translateX(${-bgOffset}px) scale(1.5)`;
            } else {
                clearInterval(walkInterval);
                character.classList.remove("walk");
                character.style.backgroundPosition = "-875px";
                walking = false;
            }
        }, 50);
    }
});