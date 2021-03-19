# Bonus

Avant de commencer une partie, on souhaite demander 2 informations :

- le nom d'utilisateur
- le nombre de lignes/colonnes de la grille

Bon, pour l'instant, on reste sur 8 lignes/colonnes.  
La grille, les boutons et l'historique sont cachés tant que ce formulaire n'a pas été validé.  
Et une fois validé, on cache le formulaire (pour afficher le jeu), et on met le nom d'utilisateur dans le `<h3>` :tada:

Easy non ? :sunglasses:

Ok. Comme on n'est pas des bêtes, on t'indique les modifs à faire sur le code HTML.

<details><summary>encadrer grille, boutons et historique dans une div, et prévoir un span pour le nom d'utilisateur</summary>

```html
<div id="game">
    <form class="form">
        <label for="cellToHit">Case sur laquelle envoyer un missile :</label>
        <input type="text" name="cellToHit" id="cellToHit" maxlength="2">
        <button>Missile !!!!</button>
    </form>

    <h3><span class="username"></span> Tour <span id="turn">1</span></h3>

    <div id="grid">
        <!-- ... -->
    </div>

    <div>
        <button id="stats">Voir les statistiques</button>
        <button id="toogle-actions">Afficher/Cacher l'historique</button>
    </div>

    <div id="actions">

    </div>
</div>
```

</details>

<details><summary>ajouter juste avant le formulaire</summary>

```html
<div id="beforegame">
    <form class="form">
        <label for="username">Username :</label>
        <input type="text" name="username" id="username">
        <label for="nbrows">Nombre de lignes et colonnes :</label>
        <select name="nbrows" id="nbrows">
            <option value="4" disabled>4</option> <!-- disabled permet d'interdire la sélection de cette option -->
            <option value="5" disabled>5</option>
            <option value="6" disabled>6</option>
            <option value="7" disabled>7</option>
            <option value="8" selected>8</option> <!-- selected permet de sélectionner par défaut cette option -->
            <option value="9" disabled>9</option>
            <option value="10" disabled>10</option>
            <option value="11" disabled>11</option>
            <option value="12" disabled>12</option>
            <option value="13" disabled>13</option>
            <option value="14" disabled>14</option>
            <option value="15" disabled>15</option>
            <option value="16" disabled>16</option>
            <option value="17" disabled>17</option>
            <option value="18" disabled>18</option>
            <option value="19" disabled>19</option>
            <option value="20" disabled>20</option>
        </select>
        <button>Lancer une partie</button>
    </form>
</div>

<div id="game"> <!-- ... -->
```

</details>

Pour le reste tu sais déjà tout faire :

- écouter la soumission d'un formulaire
- récupérer la valeur d'un `<input>` (pour un `<select>`, c'est pareil :wink:)
- ajouter/supprimer une classe CSS dans le DOM
