var task1 = false;
var task2 = false;

const modal1 = document.getElementById("modal-task1");
const btnModal1 = document.getElementById("task1");


const marshmallow = modal1.querySelector("img[alt='ingrediente']");
const ponteiro = document.getElementById("ponteiro");

let ponteiroAtivo = false;
let ponteiroInterval;
let ponteiroPos = 0;
let ponteiroDirecao = 1;
let taskFogueiraConcluida = false;

function tentarAcertar() {
    if (ponteiroAtivo) {
        ponteiroAtivo = false;
        clearInterval(ponteiroInterval);

        const ponteiroAtual = 55 + ponteiroPos;
        if (ponteiroAtual >= 220 && ponteiroAtual <= 450) {
            marshmallow.style.filter = "none";
            taskFogueiraConcluida = true;
            btnModal1.src = "assets/Images/task-done.png";
            task1 = true;
            finalizarJogo();
        }

        document.removeEventListener("keydown", tentarAcertar);
    }
}

btnModal1.addEventListener("click", () => {
    modal1.style.display = "block";
    modal1.classList.add("append-modal");

    if (taskFogueiraConcluida) return;

    ponteiroPos = 0;
    ponteiroDirecao = 1;
    ponteiroAtivo = true;

    ponteiroInterval = setInterval(() => {
        ponteiroPos += 2 * ponteiroDirecao;

        if (ponteiroPos >= 580 || ponteiroPos <= 0) {
            ponteiroDirecao *= -1;
        }

        ponteiro.style.left = `${55 + ponteiroPos}px`;
    }, 0.1);

    document.addEventListener("keydown", tentarAcertar);
});

const modal3 = document.getElementById("modal-task3");
const btnModal3 = document.getElementById("task3");
const cards = modal3.querySelectorAll(".itens .item");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pairsFound = 0;

btnModal3.addEventListener("click", () => {
    modal3.style.display = "block";
    modal3.classList.add("append-modal");


    lockBoard = true;

    cards.forEach(card => card.classList.remove("flipped"));

    setTimeout(() => {
        cards.forEach(card => card.classList.add("flipped"));
        lockBoard = false;
    }, 1000);
});

cards.forEach(card => {
    card.addEventListener("click", () => {
        if (lockBoard) return;
        if (!card.classList.contains("flipped")) return;

        card.classList.remove("flipped");

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        lockBoard = true;

        const isMatch = firstCard.dataset.pair === secondCard.dataset.pair;

        if (isMatch) {
            firstCard = null;
            secondCard = null;
            lockBoard = false;
            pairsFound++;

            if (pairsFound === 3) {
                btnModal3.src = "assets/Images/task-done.png";
                task2 = true;
                finalizarJogo();
            }
        } else {
            setTimeout(() => {
                firstCard.classList.add("flipped");
                secondCard.classList.add("flipped");
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            }, 1000);
        }
    });
});


function closeModal(button) {
    const modalId = button.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("append-modal");
    }

    document.removeEventListener("keydown", tentarAcertar);
    ponteiroAtivo = false;
    clearInterval(ponteiroInterval);
}

function finalizarJogo() {
    if (task1 == true && task2 == true) {
        const minPosition = 500;
        const maxBgOffset = 0;
        let position = parseInt(window.getComputedStyle(character).left);

        character.classList.add("walk");
        character.style.transform = "scale(0.8) scaleX(-1)";

        const walkBack = setInterval(() => {
            if (position > minPosition) {
                position -= 10;
                bgOffset = Math.max(maxBgOffset, bgOffset - 30);

                character.style.left = position + "px";
                background.style.transform = `translateX(${-bgOffset}px) scale(1.5)`;
            } else {
                clearInterval(walkBack);
                character.classList.remove("walk");
                character.style.opacity = 0;

                clearInterval(clock);

                mostrarFormularioFinal();
            }
        }, 50);
    }
}

function mostrarFormularioFinal() {
    const modalFormulario = document.getElementById("modal-task2");
    const tempoFinal = document.getElementById("tempo-final");

    modalFormulario.style.opacity = 1;

    modal1.style.display = 'none';
    modal3.style.display = 'none';
    
    tempoFinal.innerHTML = `${timer}`;

    modalFormulario.style.display = "block";
}
