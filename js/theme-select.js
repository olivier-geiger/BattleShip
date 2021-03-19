// On crée un module dédié à la sélection de thèmes
// On crée au moins une méthode init qui initialise cette fonctionnalité

let themeSelect = {
    // La fonction qui initialise notre fonctionnalité
    init: function () {
        // document.querySelector('#theme-select').addEventListener('change', themeSelect.handleClickedSelect);
        // Qu'on réécrit comme ceci pour obtenir selectNode qu'on souhaite réutiliser :
        let selectNode = document.querySelector('#theme-select');
        selectNode.addEventListener('change', themeSelect.handleClickedSelect);

        // Avec ce code, on récupère le thème dans le cookie et on le place dans le body :
        let themeName = themeSelect.getThemeCookie();
        if (themeName !== false) {
            document.body.className = themeName;
            selectNode.value = themeName;
        }
    },
    // La fonction qui réagit quand on sélectionne un thême
    handleClickedSelect: function (event) {
        // On retrouve la classe CSS du thème sélectionné et on la met dans themeName
        let themeName = event.currentTarget.value;

        // On applique notre classe au body de la page
        document.body.className = themeName;

        // On demande au nvagiateur d'enregistrer le cookie
        themeSelect.setThemeCookie(themeName);
    },
    setThemeCookie: function (themeName) {
        let maxAgeSeconds = 3600;
        if (themeName == "") {
            maxAgeSeconds = 0;
        }
        document.cookie = "battleship-theme=" + themeName + ";max-age=" + maxAgeSeconds;
    },
    getThemeCookie: function () {
        // On récupère tous les cookies et on les range dans un tableau
        // cookies est un tableau où chaque entrée est une string de type : "nomDuCookie=valeur"
        let cookies = document.cookie.split("; ");

        // On cherche dans cookies une entrée qui commence par "battleship-theme="
        // Pour ça on utilise find qui trouve la string dans le tableau et on la place dans themeCookie
        let themeCookie = cookies.find(function (cookie) {
            // .startWith() est une fonction possible sur une string pour savoir si elle commence par certains caractères
            // Ça retourne un booléen et notre fonction retourne donc le résultat de startsWith()
            return cookie.startsWith("battleship-theme=");
        });

        // themeCookie vaut soit "battleship-theme=THEME" soit undefined
        // avec la valeur undefined, ça veut qu'on n'a pas de thème dans les cookies
        // Si on a la valeur undefined on retourne false, sinon on retourne le nom du thème dans le cookie
        if (themeCookie === undefined) {
            return false; 
        } else {
            // Dans themeCookie, il faut extraire le nom, il se trouve après le symbole =
            let themeName = themeCookie.split("=")[1];
            return themeName;

            // Une version plus détaillée
            // let themeCookieArray = themeCookie.split("="); // ["battleship-theme", "f0f"]
            // let themeName = themeCookieArray[1];
            // return themeName;
        }
    }
};

document.addEventListener('DOMContentLoaded', themeSelect.init);