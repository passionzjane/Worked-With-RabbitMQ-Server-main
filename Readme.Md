# INVITATION DECIDER

### ABOUT THE APPLICATION

This is a Typescript application which accepts a CSV file with the (customerId, lon, lat) as the header.
THe application gets the record for each customer, and determine if the distance between a company located at the cordinate 52.493256, 13.446082 for longitude and latitude respectively is within 100KM. If the distance between a customer and the company is within 100KM, the customerId is save otherwise discarded. In a case where any of the column is not specified, a warning is given by the application.
Upon obtaining all customers qualified for invitation, a message queue is sent containing the ascending order of the qualified customerId to RabbitMQ (A message queuing server). A client is then set up to read the queue message from the RabbitMQ messaging serice server.

### APPLICATION INSTALLATION PROCESS

To install this application, follow the following steps;

1.  Clone the repository on your local machine
2.  Install Nodejs on you machine if you haven't done so.
3.  Open the cloned application with a text editor of your choice.
4.  Change you directory to the folder of the cloned app
5.  Run "npm init" and follow the prompt to initialize a Node application
6.  Run "tsc --init" to initialize typescript application and also to create a tsconfig.json file
7.  Run "npm install" to install all depedencies for the application.
8.  Install RabbitMQ-Server for the message queuing service if you don't have it.
9.  Create .env file in the rool folder and add the USERNAME, PASSWORD, HOST, and PORT to connect to your running RabbitMQ server.
10. Run "tsc -w" to compile the Typescript application.
11. Copy your CSV file to the "dist" folder or whatever name you specified as the outDir in your tsconfig.json file.
12. Navigate to the dist folder and run "node opener.js" to run the application and send customers qualified for invitation in your CSV file to the RabbitMQ server.
13. Navigate to the dist folder and run "node display.client.js" to run the client part of the application and display the customerId of the qualified customers for
    invitation on console.

