#!/bin/bash 
sudo yum install -y awscli
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION=us-east-1
sudo amazon-linux-extras enable nginx1
sudo yum clean metadata
sudo yum -y install nginx
sudo mkdir /usr/src/e-auction-ui
aws s3 sync s3://e-auction-ui/ /usr/src/e-auction-ui
sudo cp /usr/src/e-auction-ui/config/nginx.conf /etc/nginx/conf.d/default.conf
sudo rm -rf /usr/share/nginx/html/*
sudo cp /usr/src/e-auction-ui/config/nginx.conf /etc/nginx/conf.d/default.conf
sudo cp -R /usr/src/e-auction-ui/e-auction-ui/* /usr/share/nginx/html
sudo service nginx restart
sudo rm -rf /usr/src/e-auction-ui
