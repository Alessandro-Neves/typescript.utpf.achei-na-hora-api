# Instruções gerais para startar o projeto

### 1- Criar e configurar o arquivo `.env` para as configurações de acesso ao database e porta do servidor, como no exemplo a seguir:

```
DATABASE_URL="mysql://root:admin123@localhost:3306/lost&found?useTimezone=true&serverTimezone=UTC&connection_limit=15&socket_timeout=5"
PORT=3030
```
Informações adicionais sobre conexão com o database: [prisma.mysql](https://www.prisma.io/docs/concepts/database-connectors/mysql)

**OBS:** O arquivo deve ser criado no diretório raiz do projeto.
### 2- Criar database
**Caso deseje usar o Docker, basta abrir o terminal dentro do diretório `/docker` e executar os seguintes comandos:**

```
sudo docker build -f database.dockerfile -t database-mysql/lost-found .
sudo docker run --name database-lost-found-container -p 3306:3306 -d database-mysql/lost&found
```
Obs: caso exista um client/applicação já rodando na porta 3306 basta trocar a porta no agumento ` -p <porta_desejada>:3306`, 
a nova porta deve ser informa também no arquivo `.env` do projeto.<br>
O arquivo `/docker/docker-comands.txt` possui outros comandos uteis para manipular o container do database !

**Caso deseje usar o cliente mysql padrão instalado na máquina será necessário executar manualmente os seguintes passos:**
- Criar um database chamado `lost&found`
- Executar o arquivo `/docker/init-database.sql` no novo database criado, para criar as tabelas e inserir os usuários iniciais

### 3- Instalar dependências e atualizar schema Prisma
Executar os seguintes comandos:
- `yarn` para verificar e instalar as dependências necessárias
- `yarn restart` para executar o script que irá atualizar o schema e gerar o client do Prisma

O comando **yarn restart** precisar ser executado apenas na primeira vez que o projeto for executado ou quando houver alteração no schema do banco de dados,
caso contrario, basta utilizar `yarn start` para executar o projeto.

### 4 - Dev Hot Reload

Para utilizar Hot Reloading, basta executar `ỳarn dev` para executar o nodemon. <br> <br>
**OBS:** No linux, está ocorrendo um problema quando o nodemon atualiza a aplicação (a porta demora muito tempo para ser finalizada), 
parece ser um problema exclusivo do Linux, por isso será necessário usar `CTRL + C` e em seguida `yarn start` cada vez que for alterado o código do projeto 
até que o problema seja solucionado. Caso, mesmo utilizando o comando `CTRL + C`, a porta continuar ocupada, foi criado o comando `yarn linux:kill` para matar 
o processo que está rodando na porta e assim garantir que o comando `yarn start` possa ser utilizado! <br>
**OBS:** O comando `yarn linux:kill` matará o processo rodando na porta 3030, caso esteja utilizando outra porta para rodar o projeto será necessário atualizar 
o script `yarn linux:kill` no `/package.json`.
