# A3 Overview

In this Document:
- Project Features:
    - [Tagged Search](#tagged-search)
    - [Patient Cards](#cards)
    - [Patient Data Download](#patient-data-download)
    - [Viewing Patient Data for a Resource Category](#viewing-patient-data-for-specific-resource-category)
    - [Preview Patient Summary in a Modal Window](#preview-patient-summary-in-a-modal-window)
- [Features and Tasks that were Missed](#features-and-tasks-that-were-missed)
- [Client Acceptance Criteria Documenation](#client-acceptance-criteria-documenation)

Other places of intereset:
- [A2 Postmortem](https://github.com/csc302-distributed-suffering/parajuniper-project-2/blob/main/documentation/A3/A2%20Post%20Mortem.md)
- [A3 Meeting Minutes](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/A3/Meeting%20Minutes)
- [All Meeting Minutes](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/All%20Meeting%20Minutes)

# Project Features

## Tagged Search: 
Create tag searches, where each tag is structured as fieldtype: fieldvalue. The user first selects a tag to search by from the dropdown and then enters a value for it by typing in the search bar. The user confirms the tag by pressing ENTER and then they are able to add additional tags. They user can alternatively click "Search" right away to search based on the current entered tags. Tags can be cleared by pressing the X on their float. Please refer to the below visuals for clarification.

### Instructions:
1. Select the tag you want to search by from the dropdown menu.
2. Type in a value for the tag in the input box.
3. Press ENTER to create a tag. 
4. You can now click "Seach" or add more tags.
5. To clear a tag press the X button on the tag.

### Negotiated Verification Criteria:
Please see: [Client Acceptance Criteria Documenation](#client-acceptance-criteria-documenation) for documentation on our conversation with the industry partner. <br/>

1. The user is able to search a patient by any single parameter and any combination of parameters from {first name, last name, id}

### Tests:
<br/>


## Patient Data Download
When viewing patient information in a modal, the user is able to then download the data for the current patient. The user has two choices for the download: download all of the resources associated with the patient or download a csv file for the resource category being viewed.

### Details:
The feature works by retrieving all of the resources associated with a patient by running an $everything query search for the given patient in the database. The UI then processes the information into buckets (per resource category) and displays it in a table format.

The download packages this information into either a CSV or the raw JSON returned by the $everything query. 

### Instructions:
1. Search for a patient.
2. Click on “Details” inside a patient’s card.
3. Select the resource information that you want to download from the dropdown.
![image](https://user-images.githubusercontent.com/44914019/144776671-13112cac-b9cd-436b-b6e5-2402d4d16642.png)

<br/>


4. Click “Download Table” for a csv file of the displayed table.
5. To download data from all resources for this patient in a single JSON, click “Download All”
![image](https://user-images.githubusercontent.com/44914019/144777222-540d38ae-8003-4fe3-ae2e-bfaac7986a5c.png)

<br/>

### Negotiated Verification Criteria:
Please see: [Client Acceptance Criteria Documenation](#client-acceptance-criteria-documenation) for documentation on our conversation with the industry partner. <br/>

From our discussions with our industry partner we agreed that accessing patient information in its entirety was an important use case. As such this is one of the features developed to enable the user to do just so. Since the user is a clinician they might want to save the data they are accessing for later use. 

As such, the acceptance criteria for this feature are:
1. The user is able to access all data for a given patient.
2. The user is able to download the data in a common file format (CSV or JSON).

### Tests:
Automated backend tests ensure that correct information is retrieved.
Please see the following tests that validate this functionality on the backend.

- server\routes\tests\patients.test.ts: 152
    - Validates that the server response contains correct information for an existing patient.
- server\routes\tests\patients.test.ts: 167
    - Validates that a 400 status code is correctly returned for a malformed query.
- server\routes\tests\patients.test.ts: 175
    - Validates that a 404 status code is correctly returned for a non-existing patient.
- server\routes\tests\patients.test.ts:  185
    - Validates that a 500 status code is correctly returned in case of a server error.

<br/>

## Viewing Patient Data for Specific Resource Category:
Patients have a lot of data associated with them such as what conditions they have, when have they visited their GP, what medications they are on, etc… All of this data is organized in resource categories by FHIR. Using our application a clinician is able to access all information for a specific resource category associated with a particular patient.

### Details:
When a patient card is clicked (user clicks on “Details” button), we make a query to our FHIR server to retrieve all of the information associated with the patient whose card the user clicked on. This is achieved through the use of the $everything query on the given patient (using the patient’s id).

This information is then organized into tables by the UI with the ability to change which resource category the user is viewing.

By default, the user will see the general identification information for a patient such as their name, address, gender and birth date. The user can then use a drop down to select any other information they may want to view.

### Instructions: 
1. Search for a patient using our tag search system.
![image](https://user-images.githubusercontent.com/36054510/144776798-a4db79ad-6190-4bae-9124-44de63eb3b1e.png)

2. Select the patient you want to view and click “Details”.
![image](https://user-images.githubusercontent.com/36054510/144777030-8d52cfc3-a14c-48bc-bec9-6abca7e7ff24.png)

3. Use the drop down menu to choose the category of information that you want to view.
![image](https://user-images.githubusercontent.com/36054510/144777063-1de62b19-23a3-4c23-8775-4b505e884a9f.png)


### Negotiated Verification Criteria:
Please see: [Client Acceptance Criteria Documenation](#client-acceptance-criteria-documenation) for documentation on our conversation with the industry partner. <br/>

From our discussions with our industry partner we agreed that accessing patient information in its entirety was an important use case. As such this is one of the features developed to enable the user to do just so. Since the user is a clinician they might want to save the data they are accessing for later use. 

As such, the acceptance criteria for this feature are:
1. The user is able to access all data for a given patient in a categorized manner.
2. The user is able to access detailed, single category information in a single table for a given patient.

#### Tests:
Automated backend tests ensure that correct information is retrieved.
Please see the following tests that validate this functionality on the backend.

- server\routes\tests\patients.test.ts: 152
    - Validates that the server response contains correct information for an existing patient.
- server\routes\tests\patients.test.ts: 167
    - Validates that a 400 status code is correctly returned for a malformed query.
- server\routes\tests\patients.test.ts: 175
    - Validates that a 404 status code is correctly returned for a non-existing patient.
- server\routes\tests\patients.test.ts:  185
    - Validates that a 500 status code is correctly returned in case of a server error.

<br/>

## Preview Patient Summary in a Modal Window:
Searching for a specific patient using a tag presents you with a grid of Modal cards per patient. These display basic patient information (name and date of birth). Then the user is able to view more detailed information by clicking the “Details” button on a specific patient.

This allows you to see patients with duplicate names (if you searched by name) or whether a patient with a given name/id even exists in the database. 

### Details:
When a patient card is clicked (user clicks on “Details” button), we make a query to our FHIR server to retrieve all of the information associated with the patient whose card the user clicked on. This is achieved through the use of the $everything query on the given patient (using the patient’s id).

This information is then organized into tables by the UI with the ability to change which resource category the user is viewing.

By default, the user will see the general identification information for a patient such as their name, address, gender and birth date. The user can then use a drop down to select any other information they may want to view.

This query is paged and the user can use the “Next” and “Previous” buttons at the bottom of the page to see the next or previous set of results.

### Instructions: 

1. Search for a specific patient by name using the tag search and observe how a single or multiple results (with the same value for the attribute you searched by) are returned.

### Negotiated Verification Criteria:
Please see: [Client Acceptance Criteria Documenation](#client-acceptance-criteria-documenation) for documentation on our conversation with the industry partner. <br/>

Our app is mostly based on simply retrieving patient information and previewing the results. As discussed with our industry partner, some way of previewing search results would be helpful to users in identifying patients with the same name or patients that do not exist.

As such, the acceptance criteria for this feature are:
1. When the user searches for a patient name that exists in the database, they get a preview of every patient with that name.
2. The user is able to view search results in a paged manner.

### Tests:
Automated backend tests ensure that correct information is retrieved.
Please see the following tests that validate this functionality on the backend. <br/>

- server\routes\tests\patients.test.ts: 93
    - Validates that patients with duplicate names are correctly returned.
- server\routes\tests\patients.test.ts: 115
    - Validates that non-existing patients result in an empty response.
- server\routes\tests\patients.test.ts: 125
   - Validates that a 404 status code is correctly returned for a non-existing patient.
- server\routes\tests\patients.test.ts: 136
   - Validates that a 500 status code is correctly returned in case of a server error.

<br/>

## Features and Tasks that were Missed:

### API Documentation
For our milestone 3 (which is effectively A3 when combined with milestone 4) we were aiming to have documentation of our internal API. However, due to unforeseen issues with some key features (FHIR server now working as expected and UI styling working differently for different browsers) we voted on not delivering this for our final submission.

### Defects backlog never implemented
We were planning on having a defects backlog to keep track of issues that need to be fixed on Github. We decided to not implement this to save time as we were all aware of issues with our specific areas (frontend and backend) and therefore trusted each other to fix them as necessary. Most of our communication was done through a Discord chat which provided a better alternative to asynchronous communication on Github. Therefore, it was more efficient for us to assign work through Discord.

### Code coverage stayed at 78%
Code coverage remains at 78% for the backend. Our goal was to increase this to 85% by the final submission, but we were unable to achieve it due to some functions requiring a more sophisticated testing environment than we had access to.


### User testing was not performed
User testing was another goal we were unable to achieve for our final submission. However, we decided that it was enough for us to manually test the application. We agreed that user testing would not make sense for an application with a small scope such as ours.

For the majority of the decisions made we did a vote either in one of our meetings or in Discord as necessary.

<br/>

## Client Acceptance Criteria Documenation
This is a document confirming our confirmation of the acceptance criteria for the application and its features with our industry partners. <br/>

<br/>

![image](https://user-images.githubusercontent.com/44914019/144769899-e916d7b2-888e-45d7-ae70-c5165a1915a2.png)






