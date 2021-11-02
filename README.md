# M8 Project - NASA News

## About the project
This is a website about NASA. The website contains NASA photo galleries and news. Access to the website requires a membership or sign in. Once the user has successfully signed in, they will be able to access the website and use it.
## Feature
- Sign Up
- Sign in (Facebook and google)
- View photo gallery
- View News
## Preview Project

## Screenshots
![M8](https://user-images.githubusercontent.com/84006058/139928091-e6a863ed-ec52-4cbb-99ac-0765e9de7662.PNG)

### Developed with
- Next.js
- Node.js
- GraphQL
- MongoDB
##### writing with Typescript 
### Setup and Getting start Project
1.Clone the repositories
```
https://github.com/Jaoearn/M8--Project.git 
```
2.Install Backend Dependencies
```
$ cd Backend
$ npm install or yarn install
$ npm run dev or yarn run dev
```
3.Install Frontend Dependencies
```
$ cd Frontend
$ npm install or yarn install
$ npm run dev or yarn run dev
```
### API Integration
- Facebook login
  - https://developers.facebook.com
- Google login
  - https://developers.google.com
- NASA Open APIs
  - https://api.nasa.gov
- News API
  - https://newsapi.org
### API authentication mechanisms before starting playing around with the application
I use JWT authentication mechanisms in my project, because it easy to authenticate and set up develop.
### API authentication mechanisms
In terms of API authentication mechanisms to access path in the application, the user must be authenticated by sign in before using our application. When user Sign In success user will get the token back as jute .Then the application will check user token in every path by the passport Strategy for verification. If the user doesn't have token they cannot access a function.
### Contact
- Email : Sutheera_preenan@cmu.ac.th
 
