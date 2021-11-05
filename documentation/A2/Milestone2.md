# Summary:
This document is a summary of how this milestones was organized, what decisions were made and how the tasks were prioritized, partitioned and assigned. It also contains all other information required for A2. For specific information pertaining to decisions made please see the Meeting Notes section. 

When running the application, some example names that can searched are 'Chauncey Johnston', 'Clorinda Wilkinson', and 'Eddie Lankin'.

## Meeting Minutes
Can be found [here](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/A2/Meeting%20Minutes)

## Figma Mockup
Can be found [here](https://www.figma.com/file/X4uUMh7wDcmLqqV0uVRCeV/Untitled?node-id=0%3A1)

# Specific Tasks to be Accomplished


For each category the tasks/features are organized in decreasing order of priority. That is the most important tasks/features can be found at the top of the list. The rationale for how we prioritized them is given within the details of the feature/task itself. The broad categories of features and tasks are organized by priority in a similar manner. We would also like to note that Backend and Frontend had equal priority. The parts of the UI that depended on the backend would be using dummy data and placeholders so that the two can be worked on concurrently.


## Convert Project to TS:

This was important to do first since it would determine the patterns that we are using in our backend code. If this was not done first we would have to make these changes once the backend code was complete, which would make them far more difficult and time consuming.

### Tasks:
1. **Convert Backend of Project to use TS - Nikita & Viktar - Complete - Due:  31/10/2021**
    - Convert current server code
    - Add typings for FHIR

   #### Acceptance Criteria:
   1. server.js and routes.js are converted to server.ts and routes.ts
   2. Transpiling ts into js during server build.
   3. TS typings for FHIR are installed. 
   
</br>

## Backend Routing:
### Tasks:
1. **Connect our server to FHIR through FHIRKitClient - Nikita & Viktar - Complete - Due: 04/10/2021**
    - Add instance of FHIRKitClient
    - Choose FHIR server to connect to
    - Chose https://r4.smarthealthit.org/ as suggested by the client.

   #### Priority Rationale:
    - We needed to first make a decision and add a connection to the FHIR server that we would be  using in our application as this would inform all future development and what documentation documents we are using for reference. Choosing a dummy implementation and then changing it in the middle of the milestone would have added a lot of tedious and unnecessary work as we would have to review new pieces of documentation and make sure we comply with them.
   #### Acceptance Criteria:
    1. The server has an instance of a FHIR client that can be used to make queries to a FHIR server.

</br>

2. **Decide on what data will be retrieved by the queries added in this milestone - Decision - Nikita & Viktar - Complete - Due: 31/10/2021**
    - FHIR returns a lot of data. We need to decide what we are keeping and what we are dropping. 
    - After talking with our client and holding a meeting amongst ourselves, we decided to retrieve all data and give the user control over what is displayed.

   #### Priority Rationale:
    - This is the first task that had to be done before we could start writing any code. The routes we are implementing would inform the query parameters that we are using and how we prioritize future backend tasks. It would also determine how the data would be processed by both the backend and the UI as after making this decision we would know exactly what data we have to work with.

   #### Acceptance Criteria:
    1. Decision is made. (See conversation with Alex in team channel on Discord for details)

</br>

3. **Decide on what parameters will be used by our queries - Decision - Nikita & Viktar - Complete - Due: 31/10/2021**
   - FHIR queries contain a lot of parameters and we need to decide on which of them will be supported by the routes implemented in this milestone.
We support the crucial parameters of name, family, count and id. We decided that this will be enough for now as they are the most critical for displaying patient information.

   #### Priority Rationale:
    - This decision also had to be made before we started writing code since we needed to determine exactly what parameters will be supported in our routes. Without doing this first we would have to make these decisions during the development process, which would only lengthen it.
 
   #### Acceptance Criteria:
    1. Decision is made.

</br>

4. **Decide on client-side vs. server-side paging for database queries that can potentially return a large number of records - Decision - Nikita & Viktar - Due: 01/11/2021**
    - FHIR paging support is unique in that it does not support a page parameter and only accepts a count of records per query. Instead of a page parameter, it returns a URL to the next page in the case that the total number of results exceeded the count provided.

    - We decided on a client keeping track of this information and sending a request to our server with the link to the next page provided by FHIR to our server which would query the data for the UI.
       
    - The reasons for this back and forth are:
      1. If we do not do this, then either the server or the client has to keep track of what page it is on and for which query. This would be especially difficult and cumbersome for the server.
        2. Our data parsing code will be added to the backend. If we had the UI query the next page on its own, we would have to duplicate that code on the client-side or we would have to send another request to our server with the data so it can parse it. Neither of these are ideal since FHIR queries return large quantities of data and we would like to limit how many times
we transmit it and prevent processing of it on the client-side (which, in any case, should not be happening).

    - **Please note that paging was not implemented for this milestone. We only wanted to make a decision in order to implement the backend for it. The refined version will be included in Milestones 3 and 4.** 

   #### Priority Rationale:
    - This would inform what parameters our queries support and how we design them and therefore had a higher priority than the implementation itself.

   #### Acceptance Criteria:
    1. Decision is made.

</br>

5. **Add route to retrieve a list of patients that match a <First Name, Last Name> tuple - Nikita & Viktar - Complete - Due: 03/11/2021**
   - Add route for querying https://r4.smarthealthit.org/Patient?name={}&family={}&count={}
   - Parse our query parameters into FHIR query parameters.
   - Perform server side error checking (integrity of request to FHIR and the response from FHIR) and return the appropriate status code to UI.
   - Return the total number of matches as well as the next page link in our response so that we may page the data on the UI.

   #### Priority Rationale:
    - Once all of the decisions above have been made, we could start development. Being able to get a list of patients by name is more important than searching a patient by ID since you have to get the ID somehow in the first place. Doing this first would allow us to find the patient we want and then implement a query for specific data for the patient.

   #### Acceptance Criteria:
    1. A route /patients/list?name={}&family={}&count={} is added.
    2. Query parameter parsing is added to detect formatting errors.
    3. The response contains the following:
        - a list of returned patients
        - total number of matches for the query

</br>

6. **Add route to retrieve a single patient by their ID - Nikita & Viktar - Complete - Due: 03/11/2021**
   - Add route for querying https://r4.smarthealthit.org/Patient?id={}
   - Parse our query parameters into FHIR query parameters.
   - Perform server side error checking (integrity of request to FHIR and the response from FHIR) and return the appropriate status code to UI.

   #### Priority Rationale:
    - This is the least priority item as it depends on everything above it being done first and it is also not critical to the milestone. Therefore, it could be completed last.

   #### Acceptance Criteria:
    1. A route /patients/info?id={} is added.
    2. Query parameter parsing is added to detect formatting errors.
    3. The response contains the following:
        - a list of returned patients
        - total number of matches for the query

</br>

## Frontend:
### Tasks:
1. **Decide on what pages our UI is going to have when complete - Decision - Everyone - Complete - Due: 17/10/2021**
   - What pages are necessary for our application and what data should each page contain?
      - For now we have decided to have two views: a log in page and a page for searching patient records
      - The log in page is something we want to have to make our application more extensible in the future, but it will not be implemented in this milestone as we decided it was more important to focus on data retrieval and display.
   
   #### Priority Rationale:
    - This was the highest priority task for the UI. We needed to have a concrete understanding and idea of what the UI will look like so that it can be implemented efficiently.
    - Acceptance Criteria:
    - Decision is made.
 
</br> 
 
2. **Decide on display format for data - Decision - Everyone - Complete - Due: 17/10/2021**
   - Decide on how exactly patient records will be displayed.
   - Decided on a grid layout for patient cards that are loaded after a search. Clicking a card will display a floating window with detailed patient information.
   
   #### Priority Rationale:
    - In addition to the above, before development could start, we needed to decide how patient   data will be displayed. We were planning on having a mockup of the UI being done and therefore, we needed to decide on this before we started working on it.

   #### Acceptance Criteria:
   1. Decision is made.

</br>

3. **Rough mockup of the UI - Feature - Felicia - Complete - Due: 24/10/2021**
   - Mockup of the Log In and Patient Search pages in Figma.
   - Mockup for patient search results view.
   - Mockup for single patient data display.

   #### Priority Rationale:
    - This had to be done before the actual implementation of the UI as it would guide the developer as to exactly what should be done.

   #### Acceptance Criteria:
    1. The mockup contains the required pages and demonstrates the expected functionality.

</br>

4. **Dummy UI, not attached to backend made using the mockup - Feature - Eric - Complete - Due: 31/10/2021**
   - Implementation of the Figma mockup (except for the log in page)

   #### Priority Rationale:
    - First iteration of the UI that would allow us to incrementally expand on it. It had to be done before all of the tasks/features below it since they depend on this being implemented.

   #### Acceptance Criteria:
    1. The UI is implemented according to the mockup provided. (Excludes the log in page)

</br>

5. **Attach the two backend routes to the UI - Feature - Viktar - Complete - Due: 03/11/2021**
   - Provide actions for making requests on our server in the UI code for the following routes:
      - /patients/list
      - /patients/info

   - Add ability to search for patient by first and last name using the action for /patients/list
      - Split single search input into two, one for last name and one for first.
      - Connect search button to client-side actions to query the routes.

   #### Priority Rationale:
    - This had to be done before the tasks below since they require the UI to be connected to backend actions. The display of the data was agreed to be rough for this milestone so we could do it quickly and therefore, after this task was complete.

   #### Acceptance Criteria:
    1. User is able to enter the first and last names of a patient and get a list of matching patients back.
    2. Search by ID is attached to the UI (without display).

</br>

6. **Organize patient cards in a grid (or some other layout as long as we can see them) - Feature - Felicia - Complete - Due: 04/11/2021**
   - Create a view to list all patient search results.
   - Each patient returned by the query should get their own card that when clicked will display their detailed information.
   - Each card should have the basic identifying information for a patient (first name, family name, id, age).

   #### Priority Rationale:
    - This could only be done once we had the first iteration of the UI implemented. It still had higher priority than the issue below it since it is a dependency of the issue below.

   #### Acceptance Criteria:
    1. User is able to see all patients returned by the query once they run the search.
   
</br>

7. **Create patient cards for each patient returned by the backend routes and display patient-specific info in each of them - Feature - Felicia - In Progress - Due: 04/11/202**1
   - Create a patient card view that would hold all of the information returned per patient.
   - For now this will just display the raw JSON. Parsing data and organizing it on the frontend will be done in milestone 3.

   #### Priority Rationale:
    - This was the least important task in terms of the implementation order since it depends on everything above it being done. To even be able to click the patient cards, the cards have to be created first, which is done by the task above.


   #### Acceptance Criteria:
    1. User is able to click a patient card and see detailed information about that patient.

</br>

## Testing:
We need to have validation on a technical level and therefore, once development is complete, we should create tests for the code. This has lower priority as development has to be at least partially complete before testing can begin.

### Tasks:

1. **Add backend unit tests for routes - Nikita - Complete - Due: 03/11/2021**
    - Test the routes.ts file to achieve >=85% coverage

   #### Acceptance Criteria:
    1. Add tests for both new routes.
    2. Verify edge cases are covered.
    3. Ensure test run can be automated.

</br>

## Documentation:
Although important, this is last since our codebase is currently small with few maintainers. Therefore, having complete documentation immediately is less important for the milestone. Nevertheless, it is important to include it in the milestone, even if it is the item with the lowest priority.

### Tasks:

 1. **Add short function headers - Feature - Everyone - Not Done - Due: 04/11/2021**

   #### Acceptance Criteria:
- Functions inside of the following files have header docs:
    1. patients.js
    2. patients.ts
    3. App.js
    
</br>

## Validation Process:
We have the following validation process:
1. Present our plan to Alex (our client) and receive feedback from him on the plan's feasibility and acceptance by him.
2. Have acceptance criteria for each of our tasks/features that will be checked upon feature completion. Iterate and make changes as necessary until acceptance criteria are satisfied.
3. During the initial planning of Milestone 2 during A1, we came up with a list of three objectives for this milestone.
    - Requests from frontend to backend
    - Server requests to FHIR server
    - Attaching frontend to backend and displaying retrieved data

</br>

We then used these objectives and validated our application against them to see whether it successfully fulfills them. We used all of the above to evaluate the success of our implementation of Milestone 2. We first submitted our preliminary plan to Alex and received several amendment requests as well as very useful and helpful suggestions. Once Alex approved our plan, we moved onto designing acceptance criteria based on the client's feature requests. We then moved into the development stage and once each feature was complete, it was tested against its acceptance criteria and changes were made as necessary. Lastly, once the milestone was over, we compared our implementation to the goals we made for this Milestone and determined whether they were achieved or not. We believe that they were as our application has all of them agreed upon functionality. In a broad sense, for this milestone we wanted to have a rough working implementation of our application's flow (UI is able to make queries to our server which uses a FHIR client to make queries to a FHIR server). Our focus here was purely on functionality and nothing else. Milestones 3 & 4 will focus on refining our current implementation and adding new features.
 


