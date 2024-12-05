# Étape 1 : Utiliser l'image de base Nginx
FROM nginx:stable-alpine

# Étape 2 : Copier les fichiers de l'application web
COPY web-build /usr/share/nginx/html

# Étape 3 : Copier la configuration Nginx modifiée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Étape 4 : Exposer le port 8080
EXPOSE 8080

# Étape 5 : Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
