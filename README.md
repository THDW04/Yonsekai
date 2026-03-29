# ⛩️ YONSEKAI — Expérience Immersive

> Une plateforme narrative et sensorielle mêlant webdesign moderne, Sound Design et technologies 3D.

---

## 📝 Présentation du Projet

**Yonsekai** est une expérience web immersive conçue pour transporter l'utilisateur dans un univers inspiré du manga et de la nature. Le site combine une narration visuelle forte (via des Shaders Three.js et GSAP) avec une gestion de billetterie et un espace utilisateur complet.

### Fonctionnalités clés

- 🎧 **Expérience Sensorielle** — Introduction dynamique avec masquage progressif et spatialisation sonore.
- 🌀 **Navigation Narrative** — Transition d'images par distorsion (Shaders) synchronisée au scroll.
- 👤 **Gestion Utilisateur** — Inscription, connexion et profil personnel.
- 🎟️ **Billetterie** — Système de réservation avec confirmation automatique par email.
- 🛡️ **Interface Admin** — Tableau de bord complet pour la gestion des contenus et des réservations.

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
- Un compte sur un service d'envoi d'emails ([Nodemailer](https://nodemailer.com/) / [EmailJS](https://www.emailjs.com/))

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-repo/yonsekai.git
   cd yonsekai
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   Dupliquer le fichier d'exemple et le remplir :
   ```bash
   cp .env.example .env
   ```
   ```env
   # Base de données
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=yonsekai
   DB_USER=root
   DB_PASSWORD=your_password

   # Service email
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Serveur
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

   > ⚠️ **Ne jamais committer le fichier `.env`** — il est déjà inclus dans le `.gitignore`.

### Lancement

```bash
# Mode développement
npm run dev

# Mode production
npm run build && npm start
```

L'application sera disponible sur `http://localhost:3000`.

---

## 🔌 Documentation de l'API

L'API RESTful assure la communication entre le front-end React et la base de données.

### Authentification

| Méthode | Endpoint | Description | Accès |
|:---:|:---|:---|:---:|
| `POST` | `/api/auth/register` | Création d'un compte utilisateur | 🌐 Public |
| `POST` | `/api/auth/login` | Connexion et retour d'un JWT | 🌐 Public |
| `GET` | `/api/auth/me` | Récupère le profil de l'utilisateur connecté | 🔒 Auth |


### Billetterie

| Méthode | Endpoint | Description | Accès |
|:---:|:---|:---|:---:|
| `POST` | `/api/reservations` | Crée une réservation et envoie un email de confirmation | 🔒 Auth |

### Administration

| Méthode | Endpoint | Description | Accès |
|:---:|:---|:---|:---:|
| `GET` | `/api/admin/users` | Liste tous les utilisateurs | 👑 Admin |
| `GET` | `/api/admin/reservations` | Liste toutes les réservations | 👑 Admin |
| `PUT` | `/api/admin/sections/:id` | Modifie un contenu existant | 👑 Admin |
| `DELETE` | `/api/admin/sections/:id` | Supprime un contenu | 👑 Admin |

### Exemple — Confirmation par Email (`POST /api/reservations`)

**Corps de la requête (JSON) :**
```json
{
  "eventId": "42",
  "seats": 2,
  "userEmail": "utilisateur@example.com"
}
```

**Réponse (201 Created) :**
```json
{
  "success": true,
  "reservationId": "REZ-20240612-007",
  "message": "Réservation confirmée. Un email a été envoyé à utilisateur@example.com."
}
```

**Flux interne :**
1. Vérification du JWT et de la disponibilité des places.
2. Insertion de la réservation en base de données.
3. Envoi d'un email de confirmation via Nodemailer avec le récapitulatif et un QR code.

---

## 📁 Structure du Projet

```
yonsekai/
├── public/
├── src/
│   ├── assets/          # Images, sons, fonts
│   ├── components/      # Composants React réutilisables
│   ├── pages/           # Pages principales (Home, Tickets, Profile, Admin)
│   ├── shaders/         # Fichiers GLSL pour les effets Three.js
│   ├── hooks/           # Custom hooks React
│   ├── context/         # Contextes (Auth, etc.)
│   └── App.jsx
├── server/              # Back-end Node.js / Express
│   ├── routes/
│   ├── controllers/
│   └── models/
├── .env.example
├── .gitignore
└── README.md
```