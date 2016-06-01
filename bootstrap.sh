sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password rootpass'
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password rootpass'
sudo apt-get update
sudo apt-get -y install mysql-server-5.5

if [ ! -f /var/log/databasesetup ];
then
    echo "CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypass'" | mysql -uroot -prootpass
    echo "CREATE DATABASE teste" | mysql -uroot -prootpass
    echo "GRANT ALL ON teste.* TO 'myuser'@'localhost'" | mysql -uroot -prootpass
    echo "flush privileges" | mysql -uroot -prootpass

    touch /var/log/databasesetup

    if [ -f /vagrant/initial.sql ];
    then
        mysql -uroot -prootpass teste < /vagrant/initial.sql
    fi
fi

echo "INSTALANDO NVM"
sudo apt-get install build-essential libssl-dev
sudo curl https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
sudo source ~/.profile
nvm --version

echo "INSTALANDO NODE 5.3.0"
nvm install 5.3.0
nvm use 5.3.0

echo "INSTALANDO DEPENDENCIAS NPM..."
npm install

echo "CONFIGURANDO VARIAVEIS DE AMBIENTE..."
export PORT=3001
export DB_HOST='localhost'
export DB_USER='myuser'
export DB_PASSWORD='mypass'
export DB_DATABASE='teste'
export DB_PORT=3306


echo "INICIANDO SERVIDOR."
npm start