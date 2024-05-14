# IOT-Sensor-Management

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Pre-requisites

- Node.js installed on your local machine
- npm (Node Package Manager), this comes with Node.js
- Visual Studio Code

### Installation

1. Open your terminal

2. Clone the repository from Github:

   `git clone <repository-url>`

3. Navigate into the project directory:

   `cd <project-directory>`

4. Install the required node modules:

   `npm install`

### Running the application

1. Open the project in Visual Studio Code by using the 'Open Folder' option

2. Start the application

   `npm start`

   The app will run in the development mode.
   Open (http://localhost:3000) to view it in your browser.
   The page will reload when you make changes.

3. Open a new terminal window, navigate into the 'data' folder and concurrently start up the JSON server with this command

   `json-server --watch db.json --port 3001`

### Running the tests

1. Run the unit tests with the following command:

   `npm test`

   Replace `<repository-url>` and `<project-directory>` with the actual values for the project.
