# APICORESIGLOXXI (webServer + RestServer)


Para inicializar el proyecto se debe ejecutar el siguiente codigo ```npm install ``` que reconstruye los modulos de Node.


configurar oracle_cliente

mkdir -p /opt/oracle
cd /opt/oracle
wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basic-linuxx64.zip
unzip instantclient-basic-linuxx64.zip

yum install -y libaio
yum install -y libnsl

sudo sh -c "echo /opt/oracle/instantclient_18_5 > /etc/ld.so.conf.d/oracle-instantclient.conf"


export LD_LIBRARY_PATH=/opt/oracle/instantclient_18_5:$LD_LIBRARY_PATH