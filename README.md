# ReviewHub

Application mobile et web de critiques culturelles, réalisée avec **Expo / React Native** et **Firebase**, dans le cadre du Livrable 2 - Dev Cloud Ynov M2.

## Sujet choisi

**Application de type "Letterboxd" / "SensCritique"** — Permet aux étudiants de partager leurs avis sur des films, séries, animes ou jeux vidéo.

- **Critique** : Titre de l'oeuvre, note sur 5, avis détaillé, affiche/image obligatoire
- **Interaction** : Bouton "Avis pertinent" pour indiquer qu'une critique est utile
- **Commentaire** : Débattre avec l'auteur de la critique sur l'oeuvre

## Application déployée

[https://fatibelkoudia.github.io/web-cloud-ynov/](https://fatibelkoudia.github.io/web-cloud-ynov/)

## Fonctionnalités

### Authentification
- Email / Mot de passe
- GitHub (popup)
- Facebook (popup)
- Téléphone (OTP)
- Anonyme

### Critiques (Firestore)
- Publier une critique avec titre, note, avis et image de l'oeuvre (Firebase Storage)
- Consulter toutes les critiques sur la page d'accueil
- Voir une critique en détail avec son auteur et sa photo de profil
- Modifier et supprimer ses propres critiques

### Interactions sociales
- Bouton "Avis pertinent" (toggle) sur chaque critique
- Systeme de commentaires par critique, accessibles aux utilisateurs connectes
- Modifier / supprimer ses propres commentaires

### Profil utilisateur
- Modifier son nom d'affichage
- Uploader et modifier sa photo de profil (Firebase Storage)

### Notifications Push (Expo + FCM)
- Demande de permissions au démarrage
- Token Expo sauvegarde dans Firestore (`pushTokens`)
- Notification envoyée a tous les utilisateurs lors d'une nouvelle publication

### Securite
- Regles Firestore strictes (`firestore.rules`) — deny by default
- Seul l'auteur peut modifier ou supprimer ses donnees
- Tokens push en acces prive par utilisateur

## Installation

```bash
npm install
npm start
```

## Variables d'environnement

Créer un fichier `.env` à la racine :

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_GITHUB_CLIENT_ID=
EXPO_PUBLIC_GITHUB_CLIENT_SECRET=
EXPO_PUBLIC_FACEBOOK_APP_ID=
EXPO_PUBLIC_FACEBOOK_APP_SECRET=
```

## Déploiement

Le workflow GitHub Actions (`build_deploy_web_android.yml`) se déclenche à chaque push sur `master` :
- Export web → déployé sur GitHub Pages
- Build Android → déclenché via EAS

<!-- AAaaaaaaaaaaa -->

## Stack technique

| Technologie | Usage |
|-------------|-------|
| Expo / React Native | Framework mobile + web |
| Firebase Auth | Authentification multi-methodes |
| Cloud Firestore | Base de données temps réel |
| Firebase Storage | Stockage images (profil + oeuvres) |
| Expo Notifications | Notifications push (FCM) |
| GitHub Actions | CI/CD automatise |
| EAS Build | Build Android/iOS |

## Test de l'authentification par téléphone

Pour tester la connexion par SMS (OTP) utilisez les identifiants suivants configurés dans Firebase :
- **Numéro :** `+33612345678`
- **Code OTP :** `123456`
