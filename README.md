# CampusMobileApp
This is the repository meant to house Aarsh's TechStart project. Simply set up for now. Will update name and description soon!


# Setup

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

- Manage your packages

There will be stuff that won't install when you do npm install.
To fix this issue you need to manually install the missing packages.

- Change your IP

Remember to put in your IPv4 address in both:
-> App.tsx for Frontend
-> index.tsx for Backend
The app won't compile and run properly otherwise

- NVM being janky

If on Windows, make sure you open CMD as Admin and run your npm commands through there
If on Mac, make sure you use sudo and run your npm commands that way

### IDE's

- JetBrain's Webstorm
- VSCode

### Git

- To streamline new branch creation you can use this command to automatically set up an upstream
```
$ git config --global push.default current
```

- Naming Convention:
Please use the following naming convention for branches:
```
<your name>/<feature-ticket-number>
```

- Common git commands:
```
$ git checkout -b <branch-name> # Creates a new branch and switches to it
$ git add . # Adds all file changes and tracks files
$ git commit -am "<commit-message>" # Adds all file changes and commits them (non-tracked files will not be included)
```


Development Testing:

- Download the Expo app on your phone
- Run the following command in the project directory
```
npm run start
```
- Then scan the QR code with your phone camera
- The app should open up on your phone

