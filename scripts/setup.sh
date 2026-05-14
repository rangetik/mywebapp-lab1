#!/bin/bash

set -e

echo "Початок розгортання"

chmod +x scripts/*.sh

./scripts/packages.sh
./scripts/users.sh
./scripts/database.sh

sudo mkdir -p /opt/mywebapp
sudo mkdir -p /etc/mywebapp
sudo cp -r src /opt/mywebapp/
sudo cp package.json /opt/mywebapp/
sudo cp config/config.json /etc/mywebapp/config.json

cd /opt/mywebapp
sudo npm install --only=production
sudo chown -R app:app /opt/mywebapp 
cd -

sudo cp config/systemd/mywebapp.socket /etc/systemd/system/
sudo cp config/systemd/mywebapp.service /etc/systemd/system/
sudo systemctl daemon-reload

sudo systemctl stop mywebapp.socket || true
sudo systemctl disable mywebapp.socket || true

sudo systemctl enable mywebapp.service
sudo systemctl restart mywebapp.service

sudo cp config/nginx.conf /etc/nginx/sites-available/mywebapp
sudo ln -sf /etc/nginx/sites-available/mywebapp /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

echo "Розгоратання завершено успішно"