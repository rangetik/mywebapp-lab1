#!/bin/bash
sudo apt-get update

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install -y postgresql postgresql-contrib nginx git curl