<p align="center">
  <img src="./frontend/public/logo-guru.jpg" alt="Logo Meu Guru" width=200>
</p>
<h1 align="center">
  Meu Guru
</h1>

<a href='' target='_blank'>Assista o vídeo de demonstração.</a>

Meu Guru Challenge é uma aplicação full-stack que utiliza ferramentas como NestJS, NextJS e Docker Compose, além de diversas bibliotecas para ganhar produtividade e aprimorar visualmente a experiência do usuário. Este documento fornece uma visão geral do projeto, bem como instruções detalhadas sobre como configurá-lo, executá-lo e contribuir para ele.

## Sumário 📚

1. [Visão Geral](#visão-geral)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
    - [Clonando o Repositório](#clonando-o-repositório)
    - [Iniciando o projeto](#iniciando-o-projeto)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Testes](#testes)
6. [Rotas da API](#rotas-da-api)
7. [Scripts](#scripts)
    - [Backend](#backend-scripts)
    - [Frontend](#frontend-scripts)
8. [Considerações finais](#considerações-finais)
9. [Contribuição](#contribuição)


## Visão Geral 

Essa é uma aplicação moderna desenvolvida utilizando várias tecnologias de ponta para oferecer uma solução robusta e escalável. Ele é composto por um backend desenvolvido em NestJS e Prisma, um frontend em NextJS, oferencendo o melhor do react e o aprimorando, e Docker Compose para orquestração de contêineres, algumas bibliotecas interessantes foram usadas no frontend, sendo elas a useHookForm, tansteck query, shadcn e tailwind como as mais importantes, tendo também todas as rotas documentadas com o Swagger e foi realizado como um desafio técnico para a empresa Meu Guru.

Nessa aplicação, é possível criar uma conta, realizar login e acessar uma página de usuários cadastrados no banco de dados, onde usuários com papel de administrador, podem apagar e editar as informações contidas dos outros usuários, enquanto usuários comuns só conseguem visualizar os dados. Além disso, é possível filtrar por email e nome, diretamente do banco de dados.

## Requisitos 

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- Docker
- Docker Compose


## Instalação 

### Clonando o Repositório

```sh
git clone git@github.com:danrlleimiranda/meu-guru-challenge.git
cd meu-guru-challenge
```

### Iniciando o projeto

```sh
npm run compose:up
```

#### Realizando as migrations e populando o banco de dados.

```sh
docker exec -it app_backend sh
```
##### Uma vez dentro do container docker: 
```sh
npm run seed
```
Obs: Ainda será necessário encontrar uma forma de fazer isso, assim que os containers forem orquestrados, pois não é possível fazer durante o build da imagem do backend, já que muitas vezes o container do postgres ainda não está disponível.

#### Utilizando a aplicação.
Para ter acesso a todas as funcionalidades, basta acessar com essa conta com acessos de administrador:

```sh
{
  login: rafa@prisma.io,
  password: senhadificil
}
```


A partir da primeira inicialização, você pode iniciar apenas com:

```sh
 docker-compose up
```

### Parando execução.

```sh
npm run compose:down
```

### Estrutura do Projeto

```
meu-guru/
│
├── backend/               # Código do backend NestJS
|   ├── prisma/
│   ├── src/
│   │   ├── user/
│   │   ├── auth/
│   │   ├── exceptions/
│   │   ├── log/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   ├── test/
│   ├── Dockerfile
│   └── package.json
│   └── package-lock.json
├── frontend/              # Código do frontend NextJS
│   ├── src/
│   │   ├── __tests__/
│   │   ├── __mocks__/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   ├── Dockerfile
│   └── package.json
│
├── package.json
├── package-lock.json
├── docker-compose.yml     # Configuração do Docker Compose
└── README.md              # Documentação do projeto
```

## Testes

Para executar os testes, é necessário estar na pasta backend ou frontend, logo após basta executar: 

```sh
 npm run test
```

## Rotas da API

### A rota está totalmente documentada e disponibilizada através do Swagger: http://localhost:3000/api#/.

## Scripts
### Backend Scripts

Os principais scripts disponíveis no backend são:

```
 build: Compila o projeto NestJS.
 format: Formata o código usando Prettier.
 start: Inicia o servidor NestJS.
 start:dev: Inicia o servidor NestJS em modo de desenvolvimento com hot-reload.
 start:debug: Inicia o servidor NestJS em modo de depuração com hot-reload.
 start:prod: Inicia o servidor NestJS em modo de produção.
 lint: Executa o lint do código usando ESLint.
 test: Executa os testes unitários usando Jest.
 test:watch: Executa os testes unitários em modo de observação.
 seed: Executa o script de seed para popular o banco de dados.
```


### Frontend Scripts
Os principais scripts disponíveis no frontend são:
```
dev: Inicia o servidor de desenvolvimento Next.js na porta 3001.
build: Compila o projeto Next.js.
start: Inicia o servidor Next.js em modo de produção.
lint: Executa o lint do código usando ESLint.
test: Executa os testes e logo após finaliza.
test:watch: Executa os testes e continua escutando novas mudanças.
```

## Considerações finais.

#### Backend

Este projeto ainda tem muitas oportunidades de expansão e aprimoramento. Há várias funcionalidades que podem ser adicionadas, como o gerenciamento eficiente de filas para lidar com múltiplas requisições de um único usuário, assim como requisições simultâneas de diversos usuários.

Além disso, os testes podem ser refinados para serem mais específicos e assertivos, garantindo uma maior cobertura e confiabilidade do sistema. A autenticação e autorização implementadas atualmente são básicas, o que abre espaço para a adição de sessões e cookies para um armazenamento seguro e eficiente dos dados de acesso dos usuários.

Desenvolver esta API foi uma experiência extremamente enriquecedora. Enfrentei alguns desafios ao longo do caminho, mas cada obstáculo superado proporcionou um grande aprendizado. Estou satisfeito com o resultado final e ansioso para continuar aprimorando minhas habilidades, fazendo parte da equipe Meu Guru.

#### Frontend

Alguns pontos importantes a serem considerados incluem a atual cobertura limitada de testes. Enfrentei desafios ao testar a aplicação, especialmente devido à escolha do Axios para gerenciar requisições, que revelou ser mais complexo do que o esperado quando integrado ao Jest. Esse aprendizado destacou a necessidade de aprofundar meus conhecimentos em testes automatizados, particularmente no contexto do Next.js.

Além disso, ainda há funcionalidades a serem implementadas. Por exemplo, a capacidade para administradores criarem novos usuários está pendente; atualmente, o sistema só permite a edição e exclusão de usuários existentes, porém essa rota de criação já está implementada e pronta para ser utilizada.

## Contribuição
Se você deseja contribuir para o projeto, siga os passos abaixo:

```
Faça um fork do repositório.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas alterações (git commit -m 'Adiciona nova feature').
Envie para o repositório remoto (git push origin feature/nova-feature).
Abra um Pull Request.
```

