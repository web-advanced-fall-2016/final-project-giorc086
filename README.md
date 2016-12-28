# Web Advanced Final Assignment 
For my final assignment I developed a full stack focused project. The idea stems from my thesis which is trying to create a web resource for skiing resorts. For the purpose of this project I created an app that allows users to search for resorts in colorado through a UI search field. When one location is clicked the temperature of that location is shown.

#### The architecture of my app
![Alt text](/ArchitectureWebFinal.png?raw=true "Architecture")

The first step to build this app was to use the API On The Snow to gather the list of resorts in Colorado and the temperature in each one. The list of the resorts and the temperature is requested from the API every hour and it gets saved in the MongoDB database. 
In order to display the data from the database I created an API that gets the name of all the resorts. 


| Verb    | URL endpoint  | Resource Description             |
| --------|:-------------:| --------------------------------:|
| GET     | /resort       | Get list of resort, ids and temp |
| GET     | /resort/id    | Get one resort                   |

Database module from Mongoose is called: Resort
![Alt text](/Mongoose_Module.png?raw=true "Architecture")

##### Before running the code the following dependencies need to be installed from NPM:
Request
Express
Body Parser
JSON Parser

##### No-SQL Database used:
MongoDB with Mongoose

##### Bugs:
The app currently works with a chrome extension called Allow-Control-Allow-Origin, which allows my site to make requests with Ajax from any source. As of now, unless CORS is enabled the app won’t run. 

The second bug is that the temperature of the location selected on the client side doesn’t get displayed. There is an error either in the app.js or the script.js. 


:fire::fire::fire:
