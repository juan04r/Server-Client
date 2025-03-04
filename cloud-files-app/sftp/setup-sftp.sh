#!/bin/sh

# Crear un usuario SFTP
adduser -D -h /var/sftp -s /bin/false ${SFTP_USER}

# Establecer la contraseña del usuario SFTP
echo "${SFTP_USER}:${SFTP_PASSWORD}" | chpasswd

# Crear el directorio de carga y establecer permisos
mkdir -p /var/sftp/uploads
chown ${SFTP_USER}:${SFTP_USER} /var/sftp/uploads

# Configurar permisos para el directorio SFTP
chmod 755 /var/sftp
chmod 700 /var/sftp/uploads