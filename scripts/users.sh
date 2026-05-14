#!/bin/bash

sudo useradd -r -s /usr/sbin/nologin app

sudo useradd -m -s /bin/bash student
echo "student:12345678" | sudo chpasswd
sudo usermod -aG sudo student
echo "11" | sudo tee /home/student/gradebook
sudo chown student:student /home/student/gradebook

sudo useradd -m -s /bin/bash teacher
echo "teacher:12345678" | sudo chpasswd 
sudo chage -d 0 teacher 
sudo usermod -aG sudo teacher

sudo useradd -m -s /bin/bash operator
echo "operator:12345678" | sudo chpasswd
sudo chage -d 0 operator

echo "operator ALL=(ALL) NOPASSWD: /usr/bin/systemctl start mywebapp, /usr/bin/systemctl stop mywebapp, /usr/bin/systemctl restart mywebapp, /usr/bin/systemctl status mywebapp, /usr/bin/systemctl reload nginx" | sudo tee /etc/sudoers.d/operator