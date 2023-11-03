const os = require('os');
const fs = require('fs');

//const filenames = ['./frontend/.env', './backend/.env', '.env'];
const filenames = ['./backend/.env'];
const attributeToMatch = 'IP';

function getIP() {
    const interfaces = Object.keys(os.networkInterfaces());

    if (interfaces.includes('Wi-Fi')) {
        return os.networkInterfaces()['Wi-Fi'][3]['address'];

    }
    else if (interfaces.includes('en1')) {
        return os.networkInterfaces()['Wi-Fi'][3]['address'];
    }
}

function createAndWriteFile(filename) {
    const newIP = getIP();
    const content = `${attributeToMatch}="${newIP}"\n`;

    console.log(`Working on file -> ${filename}`);

    // Create the .env file with the attribute and value
    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error('Error creating the .env file:', err);
        } else {
            console.log('Successfully created and wrote to the .env file.');
        }
    });
}

function modifyFile(filename) {
    const newIP = getIP();
    // Read the .env file
    console.log(`Working on file -> ${filename}`);
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the .env file:', err);
            return;
        }

        // Split the content into lines
        const lines = data.split('\n');

        // Find and replace the line that matches the attribute
        let modifiedContent = '';
        let attributeFound = false;

        for (const line of lines) {
            if (line.startsWith(attributeToMatch)) {
                modifiedContent += `${attributeToMatch}="${newIP}"\n`;
                attributeFound = true;
            } else {
                modifiedContent += line + '\n';
            }
        }

        // If the attribute was not found, append it to the end of the file
        if (!attributeFound) {
            modifiedContent += `${attributeToMatch}="${newIP}"\n`;
        }

        // Write the modified content back to the .env file
        fs.writeFile(filename, modifiedContent, (err) => {
            if (err) {
                console.error('Error writing to the .env file:', err);
            } else {
                console.log('Successfully updated the .env file.');
            }
        });
    });
}

for (const filename of filenames) {
    fs.access(filename, fs.constants.F_OK, (err) => {
        if (err) {
            // The file doesn't exist, so create it with the attribute and value
            createAndWriteFile(filename);
        } else {
            // The file exists, read and modify it
            modifyFile(filename);
        }
    });
}