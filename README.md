# Poch'List – Application de Recherche et de Favoris de Livres

**Poch'List** est une application web permettant de rechercher des livres à l’aide de l’API Google Books et de les ajouter à une liste de favoris appelée "Poch'List".

---

## Lancement du projet


- Navigateur moderne (Chrome, Firefox, Edge…)
- Visual Studio Code
- Extension **Live Server** installée dans VS Code
- Connexion Internet (pour accéder à l’API Google Books)

### Clonage du projet

bash
git clone https://github.com/Louisondnn/pochlib.git
Démarrage avec Live Server
Ouvrir le dossier cloné dans Visual Studio Code.

Faire un clic droit sur le fichier index.html.

Sélectionner "Open with Live Server".

L'application se lance automatiquement dans le navigateur

---

## Fonctionnalités

- Recherche de livres par **titre** et **auteur**
- Affichage des résultats avec image, titre, auteur et description
- Ajout de livres à une **liste de favoris** (Poch'List)
- Suppression de livres favoris
- Sauvegarde temporaire via **sessionStorage**
- Mise à jour dynamique de l’affichage

---

## Arborescence du projet

.
├── index.html
├── style.css
├── /js/
│ ├── Book.js
│ ├── DomConstructor.js
│ ├── DomManipulator.js
│ ├── Search.js
├── /assets/
│ └── unavailable.png


---

## Technologies utilisées

- HTML5 / CSS3
- JavaScript (ES6)
- API Google Books
- sessionStorage
- Live Server

---

## Auteur

- **Nom :** Louison Donné  
- **Formation :** Salesforce  
- **Projet :** Projet 7 – Créez une interface utilisateur pour votre application

---

## Remarques

Ce projet a été réalisé à des fins pédagogiques dans le cadre d’un exercice de développement web. Il peut être enrichi avec d'autres fonctionnalités comme l'enregistrement permanent des favoris, un design responsive, ou une authentification.
