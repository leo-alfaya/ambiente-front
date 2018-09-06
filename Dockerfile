FROM php:7.2-apache
COPY build/ /var/www/html/

# docker build -t rei-das-canecas .
# docker run -d -p 80:80 -v $(PWD)/build:/var/www/html --name rei-das-canecas rei-das-canecas