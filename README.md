
# HACKATHON Authentification NFC pour Applications Web

## Vue d'ensemble

Bienvenue au projet Hackathon sur l'authentification NFC pour les applications web ! Ce README fournit toutes les informations nécessaires sur le projet, y compris les objectifs, les instructions d'installation et les détails de mise en œuvre.

### GROUPE 27

| Nom                   | Prénom              | Cursus   | Leader/Backup |
|-----------------------|---------------------|----------|---------------|
| MOUBIOU Lamya         | E3                  | DAD       |
| PIERRE-NOËL Jéricho   | E3                  | DAD       |
| SAMBE Mouhamadou      | E4                  | API       |
| SCHOEPPS Nathan       | E4                  | API       |
| FOURATI Ziad          | E4                  | WMD       |
| MAD Ayoub             | E4                  | WMD       |
| BEN-RHOUMA Amal       | E4                  | BDAI      |
| Le Rebours PARSENNOO Oupdisha | E4          | CCSN      |
| MATSAGUE Raissa       | E5                  | BDAI      |
| ABDALLAH-MOINDZE Bakhaira | E5            | MBA       |
| DASSI KUETI Manuel    | E5                  | WMD       |
| ENNEFAI Abdelhak      | E5                  | WMD       |

### Dates

- **Dates de l'événement** : 2, 3, 4 juillet 2024

## Objectifs du projet

1. **Scanner les cartes NFC** : Permettre aux applications web de scanner les cartes NFC.
2. **Valider les données utilisateur** : Extraire et valider les données utilisateur à partir des cartes NFC.
3. **Authentification de l'utilisateur** : Authentifier les utilisateurs en fonction des données NFC extraites.
4. **Échange de données utilisateur** : Échanger de manière sécurisée les données utilisateur authentifiées avec les applications web.

## Table des matières

- [Objectifs du projet](#objectifs-du-projet)
- [Instructions d'installation](#instructions-dinstallation)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
- [Utilisation](#utilisation)
  - [Scanner les cartes NFC](#scanner-les-cartes-nfc)
  - [Validation des données utilisateur](#validation-des-données-utilisateur)
  - [Authentification de l'utilisateur](#authentification-de-lutilisateur)
  - [Échange de données utilisateur](#échange-de-données-utilisateur)
- [Documentation de l'API](#documentation-de-lapi)
  - [Endpoints](#endpoints)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Instructions d'installation

### Prérequis

Assurez-vous d'avoir les prérequis suivants installés :

- **Node.js** : v14 ou version ultérieure
- **Python** : v3.8 ou version ultérieure
- **PostgreSQL** : v12 ou version ultérieure
- **npm** : v6 ou version ultérieure
- **FastAPI** : v0.65.2 ou version ultérieure

### Installation

1. **Cloner le dépôt** :

   ```sh
   git clone https://github.com/dassimanuel000/hackaton-app.git
   cd hackathon-nfc-auth
   ```

2. **Configuration du api** :

   ```sh
   cd api
   python -m venv venv
   source venv/bin/activate  # Sur Windows utilisez `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. **Configuration du frontend** :

   ```sh
   cd frontend
   npm install
   ```

4. **Configuration de la base de données** :

   - Assurez-vous que PostgreSQL est en cours d'exécution.
   - Créez une base de données nommée `nfc_auth`.
   - Initialisez la base de données :

   ```sh
   cd database
   python __init__.py
   ```

## Utilisation

### Scanner les cartes NFC

L'application frontend permet aux utilisateurs de scanner leurs cartes NFC à l'aide d'un appareil compatible NFC. Assurez-vous que votre appareil prend en charge la NFC et que les autorisations nécessaires sont accordées.

### Validation des données utilisateur

Une fois la carte NFC scannée, les données sont extraites et validées par rapport à la base de données. Les champs suivants sont généralement extraits de la carte NFC :

- **Nom**
- **Email**
- **Rôle**
- **Token**

### Authentification de l'utilisateur

Les données extraites sont ensuite utilisées pour authentifier l'utilisateur. Si les données correspondent à un utilisateur existant dans la base de données, l'authentification est réussie.

### Échange de données utilisateur

Après une authentification réussie, les données utilisateur sont échangées de manière sécurisée avec l'application web, permettant des expériences utilisateur personnalisées et un accès sécurisé.

## Documentation de l'API

### Endpoints

#### Scanner la carte NFC

- **Endpoint** : `/scan`
- **Méthode** : `POST`
- **Description** : Scanne la carte NFC et extrait les données utilisateur.
- **Corps de la requête** : JSON

```json
{
  "nfcData": "NFC_CARD_DATA"
}
```

- **Réponse** : JSON

```json
{
  "status": "success",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "token": "abc123"
  }
}
```

#### Valider les données utilisateur

- **Endpoint** : `/validate`
- **Méthode** : `POST`
- **Description** : Valide les données utilisateur extraites.
- **Corps de la requête** : JSON

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "user",
  "token": "abc123"
}
```

- **Réponse** : JSON

```json
{
  "status": "success",
  "message": "User data validated successfully"
}
```

#### Authentifier l'utilisateur

- **Endpoint** : `/authenticate`
- **Méthode** : `POST`
- **Description** : Authentifie l'utilisateur en fonction des données validées.
- **Corps de la requête** : JSON

```json
{
  "email": "john.doe@example.com",
  "token": "abc123"
}
```

- **Réponse** : JSON

```json
{
  "status": "success",
  "message": "User authenticated successfully"
}
```

#### Échanger les données utilisateur

- **Endpoint** : `/exchange`
- **Méthode** : `POST`
- **Description** : Échange les données utilisateur authentifiées avec l'application web.
- **Corps de la requête** : JSON

```json
{
  "email": "john.doe@example.com",
  "token": "abc123"
}
```

- **Réponse** : JSON

```json
{
  "status": "success",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer, veuillez soumettre une pull request avec une description détaillée de vos modifications.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---