# inventory-app-backend

# Tools Installation
- Download and install nodeJs (V.14) and set the path in envirnement => https://nodejs.org/en/download/

- Download and install mongodb => https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-5.0.6-signed.msi

- Download and install mongodb compass tool to view database locally => https://downloads.mongodb.com/compass/mongodb-compass-1.30.1-win32-x64.msi

# Install and run the application

- Extract the zip file to the working directory or clone repository from git => https://github.com/mca27/inventory-app-backend.git.

- Open Project in VScode => dowonload and install from => https://code.visualstudio.com/download

- Open up the terminal in the project directory.

- run command => npm install => this will install all libraries which are being used in the application

- once npm install is done run => npm run start => this will start the backend server on the port: 3000 => http://localhost:3000

# About the APIs
- Have built requested APIs for product the CRUD operation.
- Get All Products with category filter and server side pagination
- Add new Product
- Get single product
- Update existing product.
- Delete existing product.


## Files and directories
- config => this directory has database configurations.

- constants => This directory has all the constants which are being used in the application seperated in the different files.

- controller => This direcotry has actual logic for all the APIs.

- models => In the directory we are creating all the database (mongdb) collections which are requested and required.
- routes => This directory has all the routes which are buing used to build the APIs.

- services => This directory has the service files to create, validate JWT token.

- utils => This directory has all the utilities which are being used in the application.

- app.js => this is the main file where are doing all server configurations.

- package.js => this file has all the packages which are being used in the application and configuration for running the applications.

- Other files and directories are auto-generated on application installtion.

# Latest code
- The latest branch in this is ==> development