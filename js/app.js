// Après avoir beaucoup codé de manière itérative, on entame légèrement les objets
// En JS, on va structurer nos applications en modules
// Un module c'est un objet qui contient toutes les fonctions et les valeurs utiles
// à notre application
// Ici, on va créer une variable «app» qui, sous forme de module,
// nous servira à organiser le code de notre jeu Battleship

let app = {
    grid: [
        ['b', 'b', 'b', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', 'b', 'b', 'b', 'b', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', 'b'],
        ['', '', '', '', '', '', '', 'b']
    ],
    score: 0,
    turnCount: 0,
    init: function () {
        // On déclare les EventListener 
        document.querySelector('form').addEventListener('submit', app.formSubmit);
        document.querySelector("#stats").addEventListener('click', app.showStats);
        document.querySelector("#toggle-actions").addEventListener("click", app.toggleActionsList);
        document.querySelector("#show-scores").addEventListener("click", app.handleShowScores);

        // On exécute des fonctions qui initialisent le jeu
        app.displayGrid();

        // On ajoute un événement pour que les missiles se lancent au clic dans une case
        // On sélectionne toutes les DIV qui ont la classe .cell
        let cells = document.querySelectorAll('div.cell');
        // cells est un tableau avec toutes ces div, on boucle dessus pour ajouter un EventListener à chacune de ces div
        for (let index = 0;index < cells.length; index += 1) {
            // Lors d'un clic, on exécute la méthode cellClick du module app
            cells[index].addEventListener("click", app.cellClick);
        }

        // La partie commence, on initinialise la «date» à laquelle la partie commence
        // Date.now() fournit un timestamp en millisecondes,
        //     on va pouvoir le comparer avec un autre Date.now() en fin de partie
        app.startTime = Date.now();
    },
    cellClick: function (event) {
        // Si la partie est déjà terminée, on stoppe son exécution !
        if (app.isOver()) {
            return null;
        }
        // On affiche l'élement de DOM concerné pas l'événement
        // console.log(event.currentTarget);
        // event.currentTarget donne la div clickée
        // On souhaite récupérer les coordonnées à partir de event.currentTarget
        let clickedCell = event.currentTarget;
        // console.log(clickedCell.id);
        // Chaque id des cellues ressemble à cellXY
        // On peut récupérer le rowIndex et le columnIndex à partir de cette information
        let rowIndex = clickedCell.id[4];
        let columnIndex = clickedCell.id[5];

        // On reprend du code de app.formSubmit et on l'adapte à notre fonctionnalité pour jouer au clic
        // On doit changer sendMissile pour sendMissileAt
        let success = app.sendMissileAt(rowIndex, columnIndex);
        app.displayGrid();

        app.turnCount += 1;
        app.addAction(clickedCell.id, success);
        app.setTurnCountTitle(app.turnCount);

        // On calcule le score selon success
        if (success) {
            app.score += 30000;
        } else {
            app.score -= 9000;
        }

        // Ici, on exécute du code si la partie est finie
        if (app.isOver()) {
            // On récupère le timestamp à la fin de la partie et on le compare avec app.startTime
            const endTime = Date.now();
            // On connait la durée en soustrayant l'un à l'autre:
            let gameDuration = endTime - app.startTime;
            // On veut la durée en secondes, pour éviter les chiffres derrière la virgule, on arrondit
            gameDuration = Math.round(gameDuration/1000);
            
            // On doit enlever 1000 points pour chaque seconde
            app.score = app.score - (gameDuration * 1000);

            // On affiche le score
            //alert("Vous avez gagné, cliquez sur OK pour voir votre score !")
            win();
            //alert("Votre score est de " + app.score);

            // On demande le username au gagnant
            let username = prompt("Champion, comment tu t'appelles ?");

            // On souhaite stocker le score dans localStorage
            localStorage.setItem('userScore', username + ' : ' + app.score);

        }
    },
    
    win: function () {
        Swal.fire('Vous avez gagné')
    },

    message: function (r, c, hit = false) {
        if (!hit) {
            return "Plouf en (" +  r + ',' + c + ')';
        }
        else {
            return "Touché en (" +  r + ',' + c + ')';
        }
    },
    sendMissileAt: function (rowIndex, columIndex) {
        const targetCell = app.grid[rowIndex][columIndex];

        if (targetCell === 'b' ) {
            console.log(app.message(rowIndex, columIndex, true));
            app.grid[rowIndex][columIndex] = "t";
            return true;
            
        } else if (targetCell === 't' || targetCell === 'p'){
            const messageDoublon = [
                'Un missile a déjà été envoyé sur cette case, Général',
                'Un missile a déjà été envoyé sur cette case, Commandant',
                'Déjà attaqué !',
                'Tu sais pas lire ta grille ? On a déjà attaqué cette case, banane',
                'Allooo! Allooooo! Y\'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !'
            ];
            console.log(messageDoublon[app.getRandomInt(4)]);
        } else {
            console.log(app.message(rowIndex, columIndex));
            app.grid[rowIndex][columIndex] = "p";
            return false; 
        }
    },
    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    displayGrid: function () {
        for (let r = 0 ; r < 8 ; r++) {
            for (let c = 0; c < 8; c++) {
                let caract = '~';
                if (app.grid[r][c] !== '' && app.grid[r][c] !== 'b') {
                    caract = app.grid[r][c];
                }

                let currentCell = document.getElementById('cell' + r + c);
                currentCell.innerText = caract;

                if (caract === 't') {
                    currentCell.classList.add('hit');
                } else if (caract === 'p') {
                    currentCell.classList.add('splash');
                }
            }
        }
    },
    sendMissile: function (cellName) {
        const letter = cellName.substring(0, 1);
        let rowIndex = cellName.substring(1, 2);
    
        rowIndex = parseInt(rowIndex);
        rowIndex = rowIndex - 1;
      
        let gridHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let columnIndex;

        for (let currentIndex in gridHeaders) {
          const currentLetter = gridHeaders[currentIndex];
          if (currentLetter === letter) {
            columnIndex = currentIndex;
          }
        }

        return app.sendMissileAt(rowIndex, columnIndex);
    },
    isOver: function () {
        let over = true; 
        for (let r = 0 ; r < 8 ; r++) {
            if (app.grid[r].includes('b') === true) {
                over = false ;
            }
        } 
        return over;
    },
    formSubmit: function (event) {
        event.preventDefault();

        let inputNode = document.querySelector('#cellToHit');
        let inputValue = inputNode.value;
        inputValue = inputValue.toUpperCase();

        if (app.isCorrect(inputValue)) {
            let success = app.sendMissile(inputValue);
            app.displayGrid();

            app.turnCount += 1;
            app.addAction(inputValue, success);
            app.setTurnCountTitle(app.turnCount);
        } else {
            alert("Les coordonnées entrées ne sont pas correctes");
        }

        inputNode.value = '';
    },
    isCorrect: function (answerValue) {
        const letters = "ABCDEFGH";
        let letter = answerValue[0];
        let digit = parseInt(answerValue[1]);
    
        if(letters.includes(letter) === false) {
            return false;
        } else if (digit > 8) {
            return false;
        } else if (digit < 1) {
            return false;
        } else if (answerValue.length > 2) {
            return false;
        } else if (isNaN(digit)) {
            return false;
        }
    
        return true;
    },
    setTurnCountTitle: function (count) {
        let turnTitle = document.querySelector("h3");
        turnTitle.innerText = "Tour " + count;
    },
    showStats: function() {
        let turns = app.turnCount;
        let turnsSuccesses = 0;
        let turnsFails = 0;
    
        for (let r = 0; r < 8; r += 1) {
            for (let c = 0; c < 8; c += 1) {
                if (app.grid[r][c] === 't') {
                    turnsSuccesses += 1;
                } else if (app.grid[r][c] === 'p') {
                    turnsFails += 1;
                }
            }
        }
        let statsSuccess = turnsSuccesses * 100 / turns;
        let statsFail = turnsFails * 100 / turns;
    
        if (isNaN(statsSuccess)) {
            alert("Vous n'avez pas encore joué");
        } else {
            alert("Succès : " + statsSuccess.toFixed(2) + "%, Échecs : " + statsFail.toFixed(2) + "%, Tours : " + turns);
        }
    },
    addAction: function (cell, success) {
        let listActions = document.querySelector("#actions");
        
        let verb;
        if (success) {
            verb = "réussi";
        } else {
            verb = "manqué";
        }
        
        let turnDiv = document.createElement('div');
        let text = document.createTextNode("Tour #" + app.turnCount + " tir en " + cell + " " + verb);
        
        turnDiv.appendChild(text);
        listActions.prepend(turnDiv);
    },
    toggleActionsList: function () {
        let listActions = document.querySelector("#actions");
    
        let stylesList = getComputedStyle(listActions);
        if (stylesList.display == "none") {
            listActions.style.display = "block";
        } else {
            listActions.style.display = "none";
        }
    },
    handleShowScores: function () {
        // On affiche les scores en Local Storage
        let lastScore = localStorage.getItem('userScore');

        alert("Le dernier score est de " + lastScore + " pts");
    }
};

// On ajoute un EventListener au document entier pour n'exécuter notre JS que lorsque le DOM est prêt et entièrement chargé
// On place tout ce qui initialise notre jeu dans la méthode init
// Ça nous permet de conserver dans le module les instructions dédiées à notre jeu
// Ici, on n'a qu'une ligne et aucun code qui fait directement référence au jeu
document.addEventListener('DOMContentLoaded', app.init);
