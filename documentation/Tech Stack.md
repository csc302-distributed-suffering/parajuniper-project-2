# Tech Stack
Here we provide an overview of our technological stack and the reasons why we chose each one of its parts.

### Overview
We are building a web app with a React frontend and Node/Express backend. The application will allow users to search for patient data
based on multiple parameters that will be determined in Milestone 2. The application will run in the two most popular browsers (Firefox and Chrome).
Making API requests to our server will parse the request data and pass it on to the FHIRKit Client object which will query the demo FHIR database for
the data. The data will then be parsed again to the server and passed tot he UI which will display it to the user.

### Language
Both the frontend and backend are going to be written in TypeScript. There are typings available for the FHIRKit Client, React and Node that will enable us to support
TypeScript. Currently, the stub application uses regular JS, but that will be updated in Milestone 2. The main reasons we chose TypeScript/JS are:
- Widely used therefore easy for developers to get started with if they wish to extend our app.
- All team members are proficient in JS already and are willing to learn TS.
- TS provides typings that will help organize our code and enforce some constraints in terms of how the application is built when compared to regular JS.

### Frontend 
We decided to use React for our frontend. The options we considered were React and vanilla JS. Three quarters of our team have limited UI experience
so what we wanted from our frontend framework is that everyone is relatively familiar with it and can implement features quickly. For that reason we
decided not to consider frameworks other than React since all of our team members were already comfortable with it. Vanilla JS was briefly considered
and React was chosen over it for the following reasons:
 - React's components make the code easier to maintain, fix and test.
 - React provides a better way of organizing frontend code.
 - React is a widespread framework which allows this app to be easily extendible by other developers.
 - React also provides familiar routing functionality with React-Router and React-Router-Dom
 
### Backend
Our backend consists of Node running an Express server. Express is what most of us are familiar with in terms of server-side technology for Node. Working with something
familiar will enable us to deliver features quicker and with a higher degree of quality, as well as enabling us to build more complex APIs. Other reasons for this choice include:
- Express is well-maintained meaning we can find a lot of support for any issues we run into. 
- Express is also widely used, making the app easy to extend.

### FHIR Implementation
Because we are working with React and Node the two main FHIR implementations we considered were FHIRKit Client for Node and the SMART JS Client Library. Since this is new 
technology to all members of our team, we were looking for an implementation with good documentation and that is easy to set up, and extend. We settled on FHIRKit Client for these and additional
reasons:
- Has Node support allowing us to run it in the backend.
- Has typings for TypeScript available for download as a package.
- Currently being actively maintained.
- Fast to set up and easy to extend.

### Containerization
The main choices we considered for our container solution were Docker and Google Cloud. Docker was chosen for the following reasons:
- Some of our team members have already had limited experience with it.
- It is quick to set up and does not require additional steps when compared to Google Cloud which requires users to have a Google account to access the container.
  This was a very important point for us as we want the experience of installing and running a container with our application in it to be as simple as possible so users
  with a varied technical experience can do it. 
- Docker offered fast and clear tutorials.
- Docker is one of the most widely used container technologies meaning if this project gets passed on to another developer, they can get started with it quickly as most developers
  are already used to working with Docker.

### QA
For testing we decided to initially use Enzyme for frontend testing and Jest for backend testing. We also want to integrate CircleCI for continuous integration to ensure
a high degree of quality in the code that we produce. We considered Enzyme as one of our team members is familiar with it and it enables us to quickly create snapshot tests for 
our React components. Unfortunately, due to difficulties with setting it up, we decided to use Jest for backend and frontend testing instead of Enzyme. Jest was chosen due to its simplicity and 
built-in mocking. We considered Mocha as well, but decided to not use it since it does not have built-in mocking and requires a lot of extra dependencies to enable it. <br/>
<br/>
Lastly, we decided to use a continuous integration solution to improve code quality. CirclCI was chosen since it is easy to integrate with Github and at least one of our teammates was already familiar with it.



