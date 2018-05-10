Centos7 new install fix:






apt-key adv --keyserver keyserver.ubuntu.com --recv-keys   40976EAF437D05B5   3B4FE6ACC0B21F32



vi /etc/environment
add these lines...

LANG=en_US.utf-8
LC_ALL=en_US.utf-8


yum install -y wget 

wget -O /etc/yum.repos.d/docker-ce.repo https://download.docker.com/linux/centos/docker-ce.repo && yum install -y docker-ce && systemctl enable docker.service && service docker start



yum -y install mariadb-server mariadb

systemctl enable mariadb

systemctl start   mariadb

mysql_secure_installation



CREATE DATABASE  boss    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'boss'@'localhost' IDENTIFIED BY 'sinnet1234';

GRANT ALL PRIVILEGES ON boss.* TO 'boss'@'%' IDENTIFIED BY 'sinnet1234' WITH GRANT OPTION;

GRANT ALL ON boss.* TO 'boss'@'%';
FLUSH PRIVILEGES;




firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload



git fetch origin
git checkout --track origin/parkos



echo 'docker exec -it  $1  /bin/bash'  >/usr/bin/enter 



install composer:

   php -v  check if php installed
   
   curl -sS https://getcomposer.org/installer -o composer-setup.php
   sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
