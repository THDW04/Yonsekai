# ⛩️ YONSEKAI — Le Musée des quatre éléments

## 📝 Présentation du Projet

**Yonsekai** est une expérience web immersive conçue pour transporter l'utilisateur dans un univers inspiré du manga et de la nature. Le site combine une narration visuelle forte avec une gestion de billetterie et un espace utilisateur complet.

### Fonctionnalités clés

- **Navigation Narrative** — Transition d'images par distorsion (Shaders) synchronisée au scroll.
- **Gestion Utilisateur** — Inscription, connexion et profil personnel.
- **Billetterie** — Système de réservation avec confirmation automatique par email.
- **Interface Admin** — Tableau de bord complet pour la gestion des clients et visualisation des réservations.

---

## 🛠️ Stack Technique

### Front-end
| Technologie | Usage |
|---|---|
| **React.js** | Framework principal (SPA) |
| **React Router** | Navigation entre les pages |
| **GSAP & ScrollTrigger** | Animations et séquencement |
| **Three.js / React Three Fiber** | Rendu des Shaders et transitions 3D |

### Back-end
| Technologie | Usage |
|---|---|
| **PHP** | Serveur et gestion des routes API |
| **MySQL** | Base de données relationnelle |

---

## 🚀 Installation et Lancement

### Pré-requis

- [Node.js](https://nodejs.org/) v16+
- Une base de données active avec MySQL
- Un compte sur un service d'envoi d'emails

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-repo/yonsekai.git
   cd yonsekai
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   composer install
   ```

3. **Base de données**
   Importez le fichier SQL fourni : 
   - Soit via une commande : mysql -u root -p yonsekai < database.sql
   - Soit en important le fichier via phpmyadmin

4. **Configurer les variables d'environnement**

   Dupliquer le fichier d'exemple et le remplir :
 
   ## Base de données
   Dans config/database.php, renseignez vos identifiants MySQL.

   ## Service email
   Dans services/MailService.php, remplacez les credentials SMTP :
   ```
   // Développement (Mailtrap)
   $mail->Host     = 'sandbox.smtp.mailtrap.io';
   $mail->Username = 'votre_username';
   $mail->Password = 'votre_password';
   $mail->Port     = 587;

   // Production (exemple Mailgun)
   $mail->Host     = 'smtp.mailgun.org';
   $mail->Username = 'postmaster@votre-domaine.com';
   $mail->Password = 'votre_password';
   $mail->Port     = 587;`
   ```
---

## Lancement

```bash
# Mode développement
npm run dev

# Mode production
npm run build && npm start
```

L'application sera disponible sur `http://localhost:5173`.

---

## 🔌 Documentation de l'API

L'API RESTful assure la communication entre le front-end React et la base de données.

### Authentification

| Méthode | Endpoint | Description | Accès |
|:---:|:---|:---|:---:|
| `POST` | `?action=register` | Création d'un compte utilisateur | 🌐 Public |
| `POST` | `?action=login` | Connexion et retourne d'un JWT | 🌐 Public |

L'API utilise des tokens JWT. Incluez le token dans le header de chaque requête protégée :
Authorization: Bearer <votre_token>

### Billetterie

| Méthode | Endpoint | Description | Accès |
|:---:|:---|:---|:---:|
| `POST` | `?action=create-reservation` | Crée une réservation et envoie un email de confirmation | 🔒 Authentifié |
| `GET` | `?action=reservation` | Liste toutes les réservations | 👑 Admin |
| `GET` | `?action=dashboard-stats` | Statistiques (par heure, jour, type de billet) | 👑 Admin |

### Utilisateurs
|Méthode |Endpoint | Description | Accès|
|:---:|:---|:---|:---:|
|`GET`| ?action=user| Profil + réservations| 🔒 Authentifié|
|`GET`|?action=users | Liste tous les utilisateurs|👑 Admin |
|`PUT`|?action=update-user|Modifier un utilisateur| 👑 Admin|
|`DELETE`|?action=delete-user&id=X| Supprimer un compte| 🔒 Authentifié|

## 📧 Envoi de billets

Lors d'une réservation, un email est automatiquement envoyé à l'utilisateur avec :
- Un email HTML stylisé aux couleurs de Yonsekai
- Un billet PDF en pièce jointe

La langue de l'email est définie via le champ lang dans la requête (fr ou en, défaut : fr).

### Tester en local
Utilisez [Mailtrap](https://mailtrap.io) pour intercepter les emails en développement sans envoyer de vrais messages.

---

## 📁 Structure du Projet

```
YONSEKAI/
├── backend/
│   ├── api/
│   │   └── index.php
│   ├── config/
│   │   └── database.php
│   ├── controllers/
│   │   ├── ReservationController.php
│   │   └── UtilisateursController.php
│   ├── models/
│   │   ├── Reservation.php
│   │   └── Utilisateurs.php
│   ├── services/
│   │   └── MailService.php
│   └── vendor/
│
└── frontend/
    └── src/
        ├── components/
        │   ├── admin/
        │   ├── auth/
        │   ├── header/
        │   ├── home/
        │   ├── profile/
        │   └── reservation/
        ├── pages/
        │   ├── Admin.jsx
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Profile.jsx
        │   ├── Register.jsx
        │   └── Reservation.jsx
        ├── js/
        ├── App.jsx
        └── main.jsx
```
