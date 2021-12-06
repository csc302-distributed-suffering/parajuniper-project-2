# A3 Overview
- Project Features:
    - [Patient Data Download](#patient-data-download)
    - [Viewing Patient Data for a Resource Category](#viewing-patient-data-for-specific-resource-category)
    - [Preview Patient Summary in a Modal Window](#preview-patient-summary-in-a-modal-window)
- [Features and Tasks that were Missed](#features-and-tasks-that-were-missed)
- [Client Acceptance Criteria Documenation](#client-acceptance-criteria-documenation)


## Project Features

### Patient Data Download
When viewing patient information in a modal, the user is able to then download the data for the current patient. The user has two choices for the download: download all of the resources associated with the patient or download a csv file for the resource category being viewed.

### Details:
The feature works by retrieving all of the resources associated with a patient by running an $everything query search for the given patient in the database. The UI then processes the information into buckets (per resource category) and displays it in a table format.

The download packages this information into either a CSV or the raw JSON returned by the $everything query. 

### Steps to access the download:
1. Click on “Details” inside a patient’s card.
2. Select the resource information that you want to download from the dropdown.
3. Click “Download Table” for a csv file of the displayed table.
4. To download data from all resources for this patient in a single JSON, click “Download All”

### Acceptance Criteria:
#### Negotiated Verification Criteria:
From our discussions with our industry partner we agreed that accessing patient information in its entirety was an important use case. As such this is one of the features developed to enable the user to do just so. Since the user is a clinician they might want to save the data they are accessing for later use. 

As such, the acceptance criteria for this feature are:
The user is able to access all data for a given patient.
The user is able to download the data in a common file format (CSV or JSON).

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

### Viewing Patient Data for Specific Resource Category:

### Preview Patient Summary in a Modal Window:







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
This is a document confirming our confirmation of the acceptance criteria for the application and its features with our industry partners.
![image](https://user-images.githubusercontent.com/44914019/144769899-e916d7b2-888e-45d7-ae70-c5165a1915a2.png)






