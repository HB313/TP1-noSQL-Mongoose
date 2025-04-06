# Étape 1 : Choisir l'image de Node.js
FROM node:18

# Étape 2 : Créer et définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier package.json et package-lock.json (pour optimiser la gestion des dépendances)
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tous les fichiers du projet
COPY . .

# Étape 6 : Exposer le port
EXPOSE 3000

# Étape 7 : Lancer l’application avec Nodemon en mode développement
CMD ["npm", "run", "dev"]
