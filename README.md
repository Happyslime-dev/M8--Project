# M8 Project - NASA Museum

## About the project
This is a website about NASA photo gallery and news site. Access to the website requires a membership or login. When the user has successfully logged in will be able to access the website and use it.
## Feature
- Sign Up
- Sign in
- Gallery
- News
## Preview Project
## Developed with
- Next.js
- Node.js
- GraphQL
- MongoDB
* writing with Typescript 
## Setup and Getting start Project
1.Clone the repositories
```
https://github.com/Jaoearn/M8--Project.git 
```
2.Install Backend Dependencies
```
$ cd Backend
$ npm install
$ npm run dev
```
3.Install Frontend Dependencies
```
$ cd Frontend
$ npm install
$ npm run dev
```
## API Integration
- Facebook login
  - https://developers.facebook.com
- Google login
  - https://developers.google.com
- NASA Open APIs
  - https://api.nasa.gov
- News API
  - https://newsapi.org
## API authentication mechanisms before starting playing around with the application
I use JWT authentication mechanisms  in my project,because it easy to authenticate and set up deverlop.
## API authentication mechanisms
 In term of API authentication mechanisms to access path in application, the user must be authenticated by login before using our application.  When user Sign In success user will get the token back as jwt .Then the application will check user token in every path by passport Strategy for verification.If user don't have token they can not access a function.
## Contact
- Email : Sutheera_preenan@cmu.ac.th
 
