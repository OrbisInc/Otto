																		 _______ __________________ _______ 
																		(  ___  )\__   __/\__   __/(  ___  )
																		| (   ) |   ) (      ) (   | (   ) |
																		| |   | |   | |      | |   | |   | |
																		| |   | |   | |      | |   | |   | |
																		| |   | |   | |      | |   | |   | |
																		| (___) |   | |      | |   | (___) |
																		(_______)   )_(      )_(   (_______)
																		
																		  David Melnyk and Paul Creighton


This readme file is an in-depth explanation of how the Orbis Ticket Tracking Organizer henceforth known as: OTTO - works.
It contains explanations for both the Backend and Frontend Code. This document has last been updated
on February 11th 2020 by David Melnyk.

OTTO's usage is for Orbis Communications to effectively track and organize various company-wide events. This includes things such as 
Birthdays, Vacations, Events, JIRA Tickets, ZenDesk Tickets, Deployments, Announcements and other company-wide related issues. It is displayed on the two television screens present on both
the top and middle floors to allow employees to obtain an 'at-a-glance' notice at what is currently happening within the company. The software's front end is hosted on a 
Raspberry Pi which is present next to the television, and all the servers back ends are hosted on a computer on Michael Samborski's desk.

OTTO contains both a front end and a back end which will be explored in the following document. 
  _____                _                 _ 
 |  ___| __ ___  _ __ | |_ ___ _ __   __| |
 | |_ | '__/ _ \| '_ \| __/ _ \ '_ \ / _` |
 |  _|| | | (_) | | | | ||  __/ | | | (_| |
 |_|  |_|  \___/|_| |_|\__\___|_| |_|\__,_|
 
References: https://vuejs.org/v2/guide/
			https://www.youtube.com/watch?v=4deVCNJq3qc
 
Run: Execute the batch file 'RunOttoFrontend.bat' - or to do manually navigate to the folder in Command Prompt using Cd and once in the otto/frontend folder use 'npm run dev'.
(Why do I have to run a frontend?) Vue.js is not typical JavaScript or HTML - so in order for the browser to understand it the Vue code has to be compiled.

OTTO's front end is written in Vue.js with a Nuxt.js framework:

-> Vue.js is a JavaScript library (or framework depending who you ask) that sets up custom JavaScript to allow easier organization and custom scripts for 'component' usage.

-> Nuxt.js is a Vue.js framework that creates a file hiearchy and organizational system for Vue code to live within.

Vue works similarily to React.js and uses hot-loading and component-based architecture. Vue's ease of use allows for custom made directives to be embedded into traditional HTML Tags 
to allow further functionality and access in directives (custom Vue attributes) such as 'V-for' which is used in multiple modules. NUXT provides additional functionality to Vue in file organization and 
architecture and better engine searching.

The process begins with app.html. App.html serves as the main document which means it sources all of the scripts, CSS and libraries that OTTO utilizes. Google Charts and jQUery 
are two examples of this. However app.html does not contain very much html because this document links to index.vue which serves as the main HTML template for OTTO.

Index.vue follows the traditional vue architecture of having a <template> where all of the relevant HTML is stored. Inside of the Template are multiple Vue components that serve to 
populate OTTO with it's content. These Vue components are self-contained 'objects' which typically contain the template HTML, the component methods and scripts, and the component CSS. 
These Vue components are imported in Index.vue through the import command:

import Weather from "../components/widgets/Weather"

and then registered within Vue like so:

components: {
	            Event,
	            Birthday,
	            Weather,    <----
	            Vacation,
			}
			
Once the component has been imported it can referenced in the global template through use of the name you gave it in the import. Something like:

<Weather/>

Calling the component will then dump the components internal HTML as well as any methods and CSS you gave it into the parent html document - which in this case is index.vue.
This allows for re-usability and organization as projects become scaled out. Additionally present on this page are the 'props' that many components contain. These props 
act similar to 'arguments' for functions in that they are passing a value from the parent that calls the object to the object itself. Otto utilizes one chief prop which is
called url:

<Event :url="this.hostURL"/>

This url is passed into the Event Component and then utilized by the Event Component to point to where the server is located. 

Of other interests are the methods that Index.vue contains. These methods (loadData and registerSocketEvents) set up a socket to the server. Traditionally communication is built upon the 
client sending a request to the server and the server responding and then all other avenues of communication are closed until the client makes a new request. A socket abolishes
that form of communication and allows the client to set up a permanent handle or 'socket' on the server which allows continuous conversation. This socket allows the client
and server to speak in real time with none of the rote of the previous method. Best used for when the client and server are going to be in constant conversation. 

To run the front end, navigate to the frontend folder in Command Prompt using cd (ex: cd documents/github/otto/frontend) and run the 'npm run dev' command to start
the front end in a development environment.

There are many comments littered throughout the relevant code that gives indications as to what the code is used for. If there is any further confusion on how vue.js operates please see
the references at the top of the screen for additional help.

  ____             _                  _ 
 | __ )  __ _  ___| | _____ _ __   __| |
 |  _ \ / _` |/ __| |/ / _ \ '_ \ / _` |
 | |_) | (_| | (__|   <  __/ | | | (_| |
 |____/ \__,_|\___|_|\_\___|_| |_|\__,_|

References: https://sailsjs.com/documentation/reference
			https://www.youtube.com/watch?v=AmjiDC_JUt4
			
Run: Execute the batch file 'RunOttoBackend.bat' - or to do manually navigate to the folder in Command Prompt using Cd and once in the otto/frontend folder use 'node app.js'.
 
OTTO's back end is run using Node.js with a Sails.js framework:

-> Node.js is a JavaScript runtime environment which allows JavaScript to be executed outside of the browser. Typically Node.js is used to allow JavaScript to act as a server.

-> Sails.js is a framework for Node.js that creates a file hiearchy and organizational system - optimized for the use of data interaction.

The backend contains a database (aptly named otto.db) which contains all of the relevant tables with relevant fields for all of the data required in Otto. This server is run on localhost:1337 by default.
This back end handles all of the requests sent out by the front end - typically in regards to using the database. There are multiple configuration files present in the back end 
- including the controllers and models which Sails will generate for you. 

The controllers and models are located in the api folder and controllers or models. The controllers handle as to how the server responds to these requests, and the models represent
the data being acted upon - which is then stored in otto.db. Some of the models have certain attributes which dictate as to how they are to be handled, such as a required attribute or 
executing a custom function.

There are additional configuration files of interest such as app.js which is where Node.js executes out with, or the other configuration files which are stored in the config 
folder in the backend. 

To run the back end, navigate to the frontend folder in Command Prompt using cd (ex: cd documents/github/otto/backend) and run the 'node app.js' command to start
the back end. Additionally - using the '1' key - you can start Sails in an Alter mode for handling data. 

