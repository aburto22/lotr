# LOTR Quotes
> Simple app to find Lord of the Rings characters and famous quotes.
> The app is hosted in heroku [_Click here to take a look._](https://quotes-lotr.herokuapp.com/)

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [New features](#new-features)
* [Authors](#authors)


## General Information
### Context
The idea of the project was conceived during a hackathon at </Salt> bootcamp. Here, I incorporated different technologies we learned during the bootcamp to create a working app in a single day. I have then fixed some bugs and added small features to improve the app.

### Idea
Who doesn't love the Lord of the Rings? Who doesn't remember fondly Gollum's 'My Precious'? With this app, I wanted to create an easy way to find what Gollum, and all other characters, have said during this amazing trilogy.

## Technologies Used
### Front-end
- TypeScript
- React
- Redux

### Back-end
- Node.JS
- Express.JS

### Deployment and hosting
- Docker container
- Heroku hosting
- GitHub actions for CI/CD pipeline


## Features
So far, I have incorporated the following features:
- Users can search through character by name or race.
- Users can search through quotes by text or character.
- Users can save quotes to favorites (saved on local storage).


## Screenshots
<img src="./screenshots/mobile.png" width="100">
<img src="./screenshots/tablet.png" width="200">
<img src="./screenshots/laptop.png" width="600">


## Setup
The project is separated in two parts: client and server. If anybody wants to clone this project, they have to go into the client folder and install dependencies using `npm install`, and then run the development server using `npm start`. To start the server, they have to go into the server folder and install dependencies using `npm install`, and then run the development server using `npm run dev`. A list with all scrips is found in the package.json files included in client and server folders.

There is also a Dockerfile in the root folder to create a container. Below are the commands to build and run a docker container:
- Build: `docker build -t lotr-quotes-image .`
- Run: `docker run -p 5500:5500 --name lotr-quotes lotr-quotes-image`


## Project Status
The project is currently finished, although there are several opportunities for improvement. Additional features might be added in the future.


## New features and bugs
Known bugs:
- Character images take too long to load.
- Text input field in characters and quotes doesn't update when going back in browser.
- Layout is not fully responsive.

Future features:
- Extensive menu for mobile.
- Fully-responsive layout.
- Skeleton for placeholder when images load.


## Authors
This project was created by myself:
- Alejandro Aburto Salazar - [GitHub](https://github.com/aburto22)