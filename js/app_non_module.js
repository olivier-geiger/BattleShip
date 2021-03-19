// #1 Créer le tableau ============================================

// créer une variable grid à 2 dimensions représentant un plateau de 8 lignes et 8 colonnes

// Pour déclarer une variable en JS, on a 3 mot-clés : 
// let
// var
// const : la valeur stockée dans une variable déclarée avec "const" sera vérrouillée, on ne pourra plus modifier la valeur stockée dans cette variable

// Pas besoin de mettre un $ en début de nom de variable, comme en PHP

// Le plus petit tableau 
let grid = [];


// Je place maintenant 3 bateaux
// Mes bateaux sont représentés par des petits 'b'
grid = [
    ['b', 'b', 'b', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', 'b', 'b', 'b', 'b', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', 'b'],
    ['', '', '', '', '', '', '', 'b']
];



// #2 Envoyer un missile =====================================
// Créer/définir une fonction
// En JS, tout comme en PHP, pour créer une fonction, on utilise le mot-clé function

/**
 * renvoie un message compréhensible par l'humain
 * @param {Number} r : index de la ligne
 * @param {Number} c : index de la colonne
 * @param {boolean} hit : est-ce que un bateau est touché
 */
function message(r, c, hit = false)
{
    // Je teste si hit contient la valeur FALSE
    if (!hit) {
    // ou
    // if (hit === false) {
        return "Plouf en (" +  r + ',' + c + ')';
        // ça retourne par ex : "Plouf en (2,5)"
    }
    else {
        return "Touché en (" +  r + ',' + c + ')';
    }
}

// On prévoit deux paramètres à cette fonction
// rowIndex : le numéro de ligne
// columnIndex : le numéro de colonne

function sendMissileAt(rowIndex, columIndex)
{

    // On souhaite savoir si oui ou non, on a touché un bateau
    // est-ce que la case visée contient un 'b'
    // ex : si on exécute sendMissileAt(1, 6)
    // targetCell contiendra : ''
    // ex : si on exécute sendMissileAt(0, 2)
    // targetCell contiendra : 'b'
    const targetCell = grid[rowIndex][columIndex];

    // si la variable targetCell contient "b"
    if (targetCell === 'b' ) {
        console.log(message(rowIndex, columIndex, true));
        // le bout de bateau est touché, donc on change le "b" en "t"
        grid[rowIndex][columIndex] = "t";
        return true; // si la case visée contient un 'b', on renvoie true pour signifier qu'un bout de bateau a été touché
        
    }
    else if (targetCell === 't' || targetCell === 'p'){
        const messageDoublon = [
            'Un missile a déjà été envoyé sur cette case, Général',
            'Un missile a déjà été envoyé sur cette case, Commandant',
            'Déjà attaqué !',
            'Tu sais pas lire ta grille ? On a déjà attaqué cette case, banane',
            'Allooo! Allooooo! Y\'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !'
        ];
        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
        // utilisation de la fonction getRandomInt()
        console.log(messageDoublon[getRandomInt(4)]);
    }
    // sinon
    else {
        
        console.log(message(rowIndex, columIndex));
        // Le missile tombe à l'eau, on change la valeur de la case en "p"
        grid[rowIndex][columIndex] = "p";
        return false;
        
    }
    // On aurait pu écrire seulement cette ligne :
    // return targetCell === 'b';
    // ou : 
    // return grid[rowIndex][columIndex] === 'b';
}

// fonction récupérée sur MDN pour générer un nombre aléatoire entre 0 et max
function getRandomInt(max) {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/floor
    return Math.floor(Math.random() * Math.floor(max));
}



// #4 Afficher le plateau ========================
// écrit directement dans la grille HTML la lettre b ou p ou t ou ~

function displayGrid()
{
    
    // Boucle comme en PHP => for car on sait qu'on va de 0 à 8
    for (let r = 0 ; r < 8 ; r++) {
        
        // console.log(grid[r]);
        // lors de la première boucle : cell0x
        // lors de la deuxième boucle : cell1x

        // 2- on parcourt ce sous-tableau grid[r] => boucle !
        for (let c = 0; c < 8; c++) {
            let caract = '~';
            if (grid[r][c] !== '' && grid[r][c] !== 'b') {
            // if (grid[r][c] === 'p' || grid[r][c] === 't') {
                caract = grid[r][c];
            }
            let currentCell = document.getElementById('cell' + r + c);
            //console.log('grid[' + r + '][' + c + '] contient la chaine de caractère : ' +  caract );
            //console.log(currentCell);
            currentCell.innerText = caract;
            if (caract === 't') {
                currentCell.classList.add('hit'); // cas où carac contient 't'
            }
            else if (caract === 'p') {
                currentCell.classList.add('splash'); // cas où carac contient 'p'
            }
        }

        // Pour mieux comprendre l'exécution du code par l'interpréteur JS
        //debugger;
    }

}

displayGrid();


// Créer une fonction sendMissile(cellName) qui retourne vrai ou faux si on a touché un vaisseau ou pas
// mais à partir du nom de la cellule/case
function sendMissile(cellName) {
    // On commence par décoder le nom de la cellule/case en index de ligne/colonne
    // Par exemple, pour un String "touché !"
    //                      index   01234567
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/substring
    // Si cellName contient "B5", alors : 
    const letter = cellName.substring(0, 1); // "B"
    let rowIndex = cellName.substring(1, 2); // "5"

    //debugger;
    // Console.log pour debuger
    console.log(letter);
    console.log(rowIndex);
    // On a bien réussi à décomposer la lettre (ligne) et la colonne
  
    // Attention, le tableau commence à l'index 0 pour '1', donc on doit soustraire 1
    // Mais quel est le type de rowIndex ? => string
    // On commence par convertir en int
    rowIndex = parseInt(rowIndex);
    // Puis on soustrait 1
    rowIndex = rowIndex - 1;
    // rowIndex -= 1;
    // rowIndex--;
  
    let gridHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    // On peut se baser sur le tableau gridHeaders pour récupérer l'index de la lettre demandée
    // Pour cela :
    // 1 - on initialise la variable contenant l'index de la colonne
    let columnIndex;
    // 2 - on parcourt le tableau
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...in
    for (let currentIndex in gridHeaders) {
      // On récupère la lettre courante du tableau
      const currentLetter = gridHeaders[currentIndex];
      // 3 - si la lettre est la lettre courante du tableau
      if (currentLetter === letter) {
        // on récupère l'index
        columnIndex = currentIndex;
        // en bonus, parler/utiliser break;
      }
    }
  
    // Puis on appelle la fonction sendMissileAt
    // on prend soin de retourner la valeur de retour de sendMissileAt
    // (VRAI si touché, FALSE sinon)
    return sendMissileAt(rowIndex, columnIndex);
}

function isOver() {
    // Si il n'y a plus de 'b' dans le tableau, alors on retourne vrai

    let over = true; 
    for (let r = 0 ; r < 8 ; r++) {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/includes
        if (grid[r].includes('b') === true) {
        // ou
        // if (!grid[r].includes('b')){
            over = false ;
        }
    } 
    return over;
}

/* while (isOver() === false) {

    // je demande au joueur la case qu'il veut viser avec son missile
    let answer = window.prompt("Dans quelle case voulez-vous lancer votre missile ?");
    // je récupère sa réponse dans la variable answer
    console.log(answer);

    // La variable answer contient une chaine de caractère qui est composée par une lettre et un chiffre
    // ce qui correspond à la lettre de la colonne et au chiffre de la ligne
    // heureusement, j'ai une fonction qui comprend et traduit ça pour que je puisse vérifier où ça va dans mon tableau grid
    // cette fonction c'est sendMissile()
    sendMissile(answer);

    // sendMissile() appelle aussi senMissileAt() qui modifie le continu de notre variable grid

    // Pour voir la modification, on redemande à la fonction displatGrid() d'afficher ce qu'il y a dans notre grid
    displayGrid();
} */
    
// Correction Atelier S03E04

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    // console.log('envoi interrompu');

    let inputNode = document.querySelector('#cellToHit');
    // On récupère la valeur de l'input
    let inputValue = inputNode.value;
    inputValue = inputValue.toUpperCase();
    console.log(inputValue);

    // On vérifie que les coordonées dans l'input sont correctes
    if (isCorrect(inputValue)) {
        // On lance le missile et on met à jour le plateau en HTML
        // success contient true si on a touché et false si on a coulé
        let success = sendMissile(inputValue);

        displayGrid();

        // Un tour est joué, on incrémente turnCount et on met à jour le h3
        turnCount += 1;
        addAction(inputValue, success);
        setTurnCountTitle(turnCount);
    } else {
        alert("Les coordonnées entrées ne sont pas correctes");
    }

    // On vide l'input
    inputNode.value = '';
});


// Vérifie que les coordonnées entrées sont correctes
function isCorrect(answerValue) {
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
};

// Alternative à la fonction ci-dessus avec une RegEx
/* 
function isCorrect(answer) {
    const regex = new RegExp (/^[A-H][1-8]$/);
    return regex.test(answer);
}
*/

// Étape, comptage des tours

function setTurnCountTitle(count) {
    let turnTitle = document.querySelector("h3");

    turnTitle.innerText = "Tour " + count;
}

// On déclare une variable à utiliser dans notre événement
// qui compte le nombre de tours
// Au début de la partie, le nombre est à 0, aucun tour n'a été joué
let turnCount = 0;


// Étape 4 - Statistiques

document.querySelector("#stats").addEventListener('click', function() {
    // On calcule les totaux de tours, de tours réussis et de tours ratés
    let turns = turnCount;
    let turnsSuccesses = 0;
    let turnsFails = 0;

    // On parcourt la grille et on cherche les t et les p pour incrémente turnsSucesses et turnsFails
    for (let r = 0; r < 8; r += 1) {
        for (let c = 0; c < 8; c += 1) {
            if (grid[r][c] === 't') {
                turnsSuccesses += 1;
            } else if (grid[r][c] === 'p') {
                turnsFails += 1;
            }
        }
    }
    // On a nos totaux
    // On calcule des pourcentages
    let statsSuccess = turnsSuccesses * 100 / turns;
    let statsFail = turnsFails * 100 / turns;

    if (isNaN(statsSuccess)) {
        alert("Vous n'avez pas encore joué");
    } else {
        // On arrondit nos pourcentages pour les rendre lisibles
        // On affiche les pourcentages dans une alert
        alert("Succès : " + statsSuccess.toFixed(2) + "%, Échecs : " + statsFail.toFixed(2) + "%, Tours : " + turns);
    }
});

// Étape 5 - Actions

function addAction(cell, success) {
    let listActions = document.querySelector("#actions");

    console.log(success);

    let verb;
    if (success) {
        verb = "réussi";
    } else {
        verb = "manqué";
    }
    
    // On crée une nouvelle <div>
    let turnDiv = document.createElement('div');
    // On crée un nœud de texte avec la phrase attendue
    let text = document.createTextNode("Tour #" + turnCount + " tir en " + cell + " " + verb);
    // Nos deux nœuds n'existent pas dans le DOM, ce ne sont que des variables
    // Il faut les ajouter au DOM avec appendChild()
    
    // On ajoute text comme enfant de turnDiv
    turnDiv.appendChild(text);
    // On ajoute turnDiv comme premier enfant de listActions
    listActions.prepend(turnDiv);

    // Version avec innerHTML, mais on vient de faire mieux et plus clair
    // listActions.innerHTML = "<div>Tour #" + turnCount + " tir en " + cell + " " + verb + "</div>" + listActions.innerHTML;
}

// function toggleActionsList() {
//     // 
// }

document.querySelector("#toggle-actions").addEventListener("click", function () {
    let listActions = document.querySelector("#actions");

    // On cherche la valeur actuelle de la propriété display de la liste des actions
    let stylesList = getComputedStyle(listActions);
    if (stylesList.display == "none") {
        // La propriété style permet de modifier l'attribut style de l'élément
        // L'attribut prime toujours sur n'importe quelle règle CSS potentiellement déclarée au préalable
        listActions.style.display = "block";
    } else {
        listActions.style.display = "none";
    }
});

