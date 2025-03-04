FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache openssh sudo

# Configurar SSH (SFTP)
RUN ssh-keygen -A && \
    echo "root:rootpassword" | chpasswd && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Crear directorio para SFTP
RUN mkdir -p /var/sftp/uploads && \
    chmod 755 /var/sftp && \
    chown -R root:root /var/sftp

# Copiar y construir el servidor
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Copiar cliente estático
COPY client/public/ /app/public/

# Copiar script de SFTP
COPY sftp/setup-sftp.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/setup-sftp.sh

# Exponer puertos
EXPOSE 3000 22

# Comando de inicio
CMD sh -c "npm start & /usr/sbin/sshd -D"