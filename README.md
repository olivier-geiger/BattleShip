# Atelier Bataille Navale

On revient sur notre _Bataille Navale_ :hug:

Maintenant qu'on a vu les 2 notions spécifiques à JavaScript :

- le DOM
- les Events

On va pouvoir mettre en place toutes les interactions que l'on souhaite côté front

<details>

![](https://media.giphy.com/media/26FPqAHtgCBzKG9mo/giphy.gif)

</details>

## #1 Formulaire d'envoi de missile :rocket:

<details><summary>Code HTML du formulaire</summary>

```html
<form class="form">
    <label for="cellToHit">Case sur laquelle envoyer un missile :</label>
    <input type="text" id="cellToHit" maxlength="2">
    <button>Missile !!!!</button>
</form>
```

</details>

- ajouter le formulaire au-dessus de la grille
- côté JS, écouter l'event `submit`
  - puis stopper l'envoi des données du formulaire
  - récupérer la valeur de l'`<input>`
  - afficher cette valeur dans la console
  - tester
  - une fois validé, on va pouvoir lancer le missile !! :rocket:
- ensuite, pour l'UX,
  - vider l'`<input>`
  - vérifier que la saisie est correcte et indiquer à l'utilisateur si elle est incorrecte
- on n'oublie pas de coder le plus possible dans des fonctions :wink: (une fonction = un but/une utilité)

<details><summary>indices</summary>

- à chaque `event` JS, on associe une fonction _handler_
- chaque fonction _handler_ reçoit un "event" en paramètre
- à partir de cet `event` JS, on peut accéder à l'élément HTML auquel on a attaché l'écouteur d'évènement (la "cible" :wink:)
- pour récupérer la valeur d'un élément `<input>`, on accède à l'attribut correspondant
  - https://developer.mozilla.org/fr/docs/Web/API/HTMLInputElement
  - ou https://developer.mozilla.org/fr/docs/Web/API/Element/getAttribute

</details>

## #2 Afficher le tour :european_castle:

- dans le code HTML fourni, il y a un `<h3>` avec le tour actuel
- à chaque envoi de missile, ajouter 1

<details><summary>indices</summary>

- on peut avoir une variable côté JS contenant le numéro actuel du tour
- et à chaque tir de missile
  - on incrémente
  - puis on met à jour le numéro dans la page

</details>

## #3 Préparer les étapes #4 et #5

- ajouter sous la grille le code HTML ci-dessous

<details><summary>Code HTML du bouton</summary>

```html
<div>
    <button id="stats">Voir les statistiques</button>
    <button id="toggle-actions">Afficher/Cacher l'historique</button>
</div>

<div id="actions">

</div>
```

Oui ok, c'était pas très compliqué, tu aurais pu le faire tout seul... :grimacing:

</details>

## #4 Statistiques de la partie :bar_chart:

- lorsque l'utilisateur va cliquer sur le bouton "Voir les statistiques"
  - une [boite de dialogue](https://developer.mozilla.org/fr/docs/Web/API/Window/alert) va apparaître avec
    - le pourcentage de tirs réussis
    - le pourcentage de tirs manqués
    - en bonus, tu peux aussi afficher le nombre de tirs

<details><summary>indices</summary>

- il va falloir écouter l'event `click` sur le bouton
- puis exécuter une fonction _handler_
- pour afficher les statistiques, on a besoin de 3 informations :
  - le nombre de tirs réussis
  - le nombre de tirs manqués
  - le nombre de tirs (qui peut se déduire des 2 précédents, ou du numéro du tour :wink:)
  - à toi de réfléchir à comment récupérer ou stocker ces informations dans ton code (il y a plusieurs possibilités)
  - c'est ce qu'on appelle de l'algorithmique :smirk:

</details>

## #5 Historique des actions :page_with_curl:

### Lister les actions

- dans la `<div id="actions">`, ajouter, au fur et à mesure, toutes les actions (tirs de missile) de l'utilisateur
  - _Tour#2 tir en B3 réussi_
  - _Tour#3 tir en B4 manqué_
- :warning: la dernière action doit apparaître tout en haut de la `<div>` :wink:

### Afficher/Cacher les actions

- le bouton "Afficher/Cacher l'historique" permet... d'afficher ou de cacher l'historique des actions :ok_hand:
- utilise [l'attribut style](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/style) pour modifier l'affichage (propriété `display` en CSS :wink:)

<details><summary>indices / plan</summary>

- il faut écouter l'event click sur le bouton
- ensuite, si la `<div id="actions">` est cachée (lire la valeur de la propriété `display`)
  - alors on l'affiche (modifier la valeur de la propriété `display`)
- sinon,
  - alors on la cache (modifier la valeur de la propriété `display`)

</details>

## Bonus

<details><summary>c'est déjà bien d'avoir fini l'atelier tu sais...</summary>

Bon ok, le [bonus est là](bonus.md)... :unamused:

</details>
# BattleShip
# battleship
