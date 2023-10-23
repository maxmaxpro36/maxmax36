const mots = ["javascript", "pendu", "programmation", "ordinateur", "developpeur", "patate", "lettre", "secret","defaite", "victoire", "afficher"];
let motSecret = mots[Math.floor(Math.random() * mots.length)];
motSecret = motSecret.toLowerCase();

const wordDisplay = document.getElementById("wordDisplay");
const hangmanDisplay = document.getElementById("hangmanDisplay");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");

let motDevine = Array(motSecret.length).fill('_');
let erreurs = 0;

function afficherMot() {
    wordDisplay.textContent = motDevine.join(' ');
}

function afficherPendu() {
    hangmanDisplay.textContent = "Pendu : " + "X".repeat(erreurs);
}

function verifierVictoire() {
    if (!motDevine.includes('_')) {
        message.textContent = "Félicitations ! Vous avez deviné le mot.";
        keyboard.style.display = "none";
    }
}

function verifierDefaite() {
    if (erreurs === 6) {
        message.textContent = `Désolé, vous avez épuisé toutes vos tentatives. Le mot était "${motSecret}".`;
        keyboard.style.display = "none";
    }
}

function devinerLettre(lettre) {
    lettre = lettre.toLowerCase();
    if (motSecret.includes(lettre)) {
        for (let i = 0; i < motSecret.length; i++) {
            if (motSecret[i] === lettre) {
                motDevine[i] = lettre;
            }
        }
        afficherMot();
        verifierVictoire();
    } else {
        erreurs++;
        afficherPendu();
        verifierDefaite();
    }
}

function creerClavier() {
    for (let i = 97; i <= 122; i++) {
        const lettre = String.fromCharCode(i);
        const bouton = document.createElement("button");
        bouton.textContent = lettre;
        bouton.addEventListener("click", function () {
            devinerLettre(lettre);
            this.disabled = true;
        });
        keyboard.appendChild(bouton);
    }
}

function resetGame() {
    motSecret = mots[Math.floor(Math.random() * mots.length)];
    motSecret = motSecret.toLowerCase();
    motDevine = Array(motSecret.length).fill('_');
    erreurs = 0;
    afficherMot();
    afficherPendu();
    message.textContent = "";
    keyboard.style.display = "block";
    const boutons = keyboard.querySelectorAll("button");
    boutons.forEach(bouton => {
        bouton.disabled = false;
    });
}

creerClavier();
afficherMot();
afficherPendu();

resetButton.addEventListener("click", function () {
    resetGame();
});
