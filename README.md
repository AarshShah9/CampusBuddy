
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=for-the-badge)
![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![Express Badge](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge)
![Prisma Badge](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=for-the-badge)
![PlanetScale Badge](https://img.shields.io/badge/PlanetScale-000?logo=planetscale&logoColor=fff&style=for-the-badge)
![MySQL Badge](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=for-the-badge)


# CampusBuddy

This repo houses the CampusBuddy Tech Start project. We're aiming to build an application that streamlines campus engagement in many different ways. Keep an eye out for our MVP!

## Contributors
- Aarsh Shah (Project Manager/ Technical Lead)
- Yang Liu (Business Strategist)
- Rafi (UI Designer)
- James Robert (Front-end Developer)
- Johnny Tran (Front-end/ UI Developer)
- Ajaypal Sallh (Front-end/ UI Developer)
- Noman Sanjari (Backend Developer)
- JC Pretorius (Backend Developer)
- Stalin Cunha (Backend Developer)

## Timeline/ Roadmap
- Ideation/ Tech Mapping
- Market Research/ Empathy Mapping
- UI Set-up
- Development
- Testing
- Production Release


### Expo Tips
- If you can't see the QR code in the terminal, simply press 'c'.

## Setup

### Accounts
- ngrok (https://ngrok.com/signup) - used for local development.
1. Create an account. 
2. Go to the dashboard and copy the auth token from https://dashboard.ngrok.com/get-started/your-authtoken.
3. Also make a custom domain from https://dashboard.ngrok.com/cloud-edge/domains
4. now go set these in the environment variables in the .env file as NGROK_AUTHTOKEN and URL respectively.
5. Also set the custom domain in the frontend .env file as URL.


### Installations
- Node.js (https://nodejs.org/en/download/)
- Expo CLI
- Node Version Package Manager (nvm: https://github.com/nvm-sh/nvm)
```
npm install -g expo-cli
```
- Git (https://git-scm.com/downloads)
- IDE of your choice

### USER NOTES

Windows
- Should simply be able to run the entire application
```
./start.sh
```

Linux/ Mac OS (UNIX)
The same command as windows should still work as separate scripts are used depending on the OS however you will have to give execution permissions to the following scripts:
- start.sh
- /scripts/install.sh

To do this you will have to do the following on all of the commands.
1. Ensure you are in the working directory of the script. For instance, you may have to run ```cd scripts``` for all of the scripts that are in the folder
2. Run ```chmod a+x <script-name>```. This essentially changes the permissions to add execution instructions for all users. 'a' = all, '+' = add, x = execution.
3. Then you can run the start script to start the application (make sure you are again in the working directory). ```./start.sh```


### Database

```
$ npx prisma generate // reflect model chages locally (for nodejs, backend, ORM)
$ npx prisma db push // push model changes to remote db instance
$ npx prisma db seed // seed the database with data
```


### IDE's

- JetBrain's Webstorm
- VSCode

### Code Formatting

The project uses a common Prettier config file to maintain consistent code formatting. Install the Prettier extension and configure your IDE to use Prettier as your default code formatter and set it to format on save.
- Please use `// prettier-ignore` to ignore Prettier formatting for all styled-components code.

### Git

- To streamline new branch creation you can use this command to automatically set up an upstream
```
$ git config --global push.default current
```

- Naming Convention:
Please use the following naming convention for branches:
```
<your name>/<feature-ticket-number/name>
```

- Common git commands:
```
$ git checkout -b <branch-name> # Creates a new branch and switches to it
$ git add . # Adds all file changes and tracks files
$ git commit -am "<commit-message>" # Adds all file changes and commits them (non-tracked files will not be included)
$ git merge origin main # please run this before making a PR and resolve any merge conflicts.
```


Development Testing:

- Download the Expo app on your phone
- Run the following command in the project directory
```
npm run start
```
- Then scan the QR code with your phone camera
- The app should open up on your phone

### Google Maps API
- Refer to these docs:
  - https://docs.expo.dev/versions/latest/sdk/map-view/


