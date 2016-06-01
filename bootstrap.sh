echo "INICIANDO..."

echo "INSTALANDO CURL, vim e python properties"
sudo apt-get install -y --force-yes vim curl python-software-properties

echo "INSTALANDO MYSQL"

sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password rootpass'
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password rootpass'
sudo apt-get -y --force-yes install mysql-server-5.5

if [ ! -f /var/log/databasesetup ];
then
    echo "CRIANDO BANCO DE DADOS E USUARIO"
    echo "CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypass'" | mysql -uroot -prootpass
    echo "CREATE DATABASE teste" | mysql -uroot -prootpass
    echo "GRANT ALL ON teste.* TO 'myuser'@'localhost'" | mysql -uroot -prootpass
    echo "flush privileges" | mysql -uroot -prootpass

    touch /var/log/databasesetup

    if [ -f /vagrant/initial.sql ];
    then
        echo "EXECUTANDO initial.sql"
        mysql -uroot -prootpass teste < /vagrant/initial.sql
    else
        echo "initial.sql NÃO ENCONTRADO"
    fi
else
    echo "BANCO DE DADOS E USUARIO JÁ EXISTEM"
fi

echo "INSTALANDO python, g++, make"
sudo apt-get install -y --force-yes python g++ make

echo "INSTALANDO NODE 6.x"
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y --force-yes nodejs

echo "ATUALIZANDO PARA ARRUMAR QUALQUER ERRO PENDENTE"
sudo apt-get update --fix-missing

echo "INSTALANDO DEPENDENCIAS NPM..."
cd /vagrant
npm install

echo "CONFIGURANDO VARIAVEIS DE AMBIENTE..."
export PORT=3001
export DB_HOST='localhost'
export DB_USER='myuser'
export DB_PASSWORD='mypass'
export DB_DATABASE='teste'
export DB_PORT=3306

echo "MATANDO PROCESSOS NA PORTA A SER USADA"
if ! lsof -i:3001
then
    echo 3001 is free
else
    echo 3001 is occupied
    echo "killing process"
    sudo kill $(fuser -n tcp 3001 2> /dev/null)
fi

echo "INICIANDO SERVIDOR."
npm start