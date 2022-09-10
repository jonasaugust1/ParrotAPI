<h1 align=center> Projeto Parrot HandsOn 4 - Grupo 03 </hi> <br>

<p align="center">
  <img src="./docs/parrot.JPG" width="50%">
</p>

---
<div align="center">

<p>👇 Clique aqui 👇</p>


  [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Parrot%20APIuri=https%3A%2F%2Fgithub.com%2Fjonasaugust1%2FParrotAPI%2Fblob%2Freadme%2Fdocs%2FInsomnia_2022-09-09.json)

</div>

## 💻 Sobre o projeto

<br>
##- FRONT-END
Os desenvolvedores do front-end criaram as páginas com base no layout utilizando Bootstrap, Styled-components React e Redux.

1. Login
a. Dados: email e senha
2. Cadastro do Usuário
a. Dados: Nome, email, senha, unidade/apartamento
3. Feed (criar post, listas todos os posts)
4. Página do usuario (posts do usuário)

##- BACK-END
Os desenvolvedores do back-end serão responsáveis por construir a API utilizando TypeScript, Node.js, Express, Jest, Sequelize, MySQL e Arquitetura Limpa.

1. Criação de banco de dados com base no DER
2. API Rest com CRUD para usuários e publicações
3. Autenticação de usuário
4. Implementar Princípios SOLID na arquitetura
5. Testes automatizados

- Projeto desenvolvido durante o desafio **Hands On 4** oferecido pela **Gama Academy**.


---

## :wrench: Como usar a API:



1. Após clonar o repositório, executar o comando `npm install` ou `yarn install`.
2. Criar um arquivo `.env` e alterar a conexão do banco de dados com as seguintes instruções:
- DB_HOST="local irá rodar o servidor, por padrão usamos localhost"
- DB_PORT="a porta do seu mysql, por padrão usamos 3306"
- DB_USER="nome de usuario do seu mysql"
- DB_PASS="senha do seu usuario mysql"
- DB_NAME="parrot"
- JWT_SECRET="criar senha com caracteres validos"
- PORT="porta que o servidor vai rodar. Ex: 3000"

3. Criar banco de dados sem tabelas no seu mysql.
4. Utilize o comando `npm run migration:run` para criação das tabelas no seu banco de dados.
5. Use o comando `npm run dev` ou `yarn dev` para iniciar sua conexão com o servidor
6. Caso tudo tenha dado certo, você está prontx para testar a API, caso mão, revise o passo-a-passo


---

## :floppy_disk: Banco de dados

Para o processo de criação do banco de dados, utilizamos migrations, porém desenhamos antes os models</br>

<p align="center">
<img src="./docs/bd.JPG" alt="Logo da Clínica">

---
## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:
<br><br>

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" width="52" alt="typescript logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" width="52" alt="nodejs logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" width="52" alt="nodejs logo"  />
  <img src="https://seeklogo.com/images/T/typeorm-logo-F243B34DEE-seeklogo.com.png" height="40" width="52" alt="TypeORM logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="40" width="52" alt="mysql logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" width="52" alt="express logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" height="40" width="52" alt="npm logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original-wordmark.svg" height="50" width="52" alt="yarn logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height="40" width="52" alt="jest logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" width="52" alt="git logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" width="52" alt="github logo"  />
</div>

---

<h2> 👨‍💻 Contribuidores </h2><br>

<h2>
<table align=center>
  <tr>

   <td align="center"> <img src="https://avatars.githubusercontent.com/u/105325377?v=4" width=175/></br><a href="https://github.com/dreialcantara/"> Andrei Alcantara </a>
   </td>
   <td align="center"> <img src="https://avatars.githubusercontent.com/u/84113028?v=4"  width=175/></br><a href="https://www.linkedin.com/in/caiodocarmo/"> Caio Do Carmo </a>
   </td>
    <td align="center"> <img src="https://avatars.githubusercontent.com/u/100959169?v=4git " width=175/></br><a href="https://github.com/eduardohpb/"> Eduardo Henrique</a>
   </td>
    <td align="center"> <img src="https://avatars.githubusercontent.com/u/95719426?v=4" width=175/> </br><a href="https://github.com/jonasaugust1/"> Jonas Augusto </a>
   </td>
    <td align="center"> <img src="https://avatars.githubusercontent.com/u/105465582?v=4" width=175/> </br><a href="https://github.com/MatheusChucri"> Matheus Rinaldi </a>
   </td>
   
  </tr>
</table> </h2>

---
