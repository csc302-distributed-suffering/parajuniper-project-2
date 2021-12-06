# A3 Overview

In this Document:
- [Task Breakdown](#task-breakdown)
- [Project Features](#project-features):
    - [Tagged Search](#tagged-search)
    - [Patient Data Download](#patient-data-download)
    - [Viewing Patient Data for a Resource Category](#viewing-patient-data-for-specific-resource-category)
    - [Preview Patient Summary in a Modal Window](#preview-patient-summary-in-a-modal-window)
- [Features and Tasks that were Missed](#features-and-tasks-that-were-missed)
- [Client Acceptance Criteria Documenation](#additional-acceptance-criteria-documenation)

Other places of intereset:
- [A2 Postmortem](https://github.com/csc302-distributed-suffering/parajuniper-project-2/blob/main/documentation/A3/A2%20Post%20Mortem.md)
- [A3 Meeting Minutes](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/A3/Meeting%20Minutes)
- [All Meeting Minutes](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/All%20Meeting%20Minutes)

# Task Breakdown
1. Adjust Backend Tests for new Routes - Viktar - Complete
    - Our routes were changed with A3 and some tests started failing since the routing logic changed. These were tests that validate our most important /info and /list routes for patients. 
    

    #### Acceptance Criteria:
    1. The new tests pass.
    
<br/>    
 
2. Create a workflow to parse patient data and collect it in category-based buckets - Viktar - Complete

    - We want to be able to display all data for a single patient and for that we need to organize this data into categories when we get it from FHIR. Therefore, we created a new data parsing function in order to collect this data from FHIR and organize it in an object that our UI can work with.

    #### Acceptance Criteria:
    1. The user is able to search for a patient and view all data relating to that patient.
    2. The following categories of data should be included:  'Annotation', 'Signature', 'Account', 'AdverseEvent', 'AllergyIntolerance', 'Appointment',
 'AppointmentResponse', 'AuditEvent', 'Basic', 'BiologicallyDerivedProduct', 'BodyStructure',
'CarePlan', 'CareTeam', 'ChargeItem', 'Claim', 'ClaimResponse', 'ClinicalImpression',
'Communication', 'CommunicationRequest', 'Composition', 'Condition', 'Consent', 'Contract',
'Coverage', 'CoverageEligibilityRequest', 'CoverageEligibilityResponse', 'DetectedIssue',
'Device', 'DeviceRequest', 'DeviceUseStatement', 'DiagnosticReport', 'DocumentManifest',
'DocumentReference', 'Encounter', 'EnrollmentRequest', 'EpisodeOfCare', 'ExplanationOfBenefit',
'FamilyMemberHistory', 'Flag', 'Goal', 'Group', 'GuidanceResponse', 'ImagingStudy',
'Immunization', 'ImmunizationEvaluation', 'ImmunizationRecommendation', 'Invoice', 'List',
'MeasureReport', 'Media', 'MedicationAdministration', 'MedicationDispense', 'MedicationRequest',
'MedicationStatement', 'MolecularSequence', 'NutritionOrder', 'Observation', 'Person',
'Procedure', 'Provenance', 'QuestionnaireResponse', 'RelatedPerson', 'RequestGroup',
'ResearchSubject', 'RiskAssessment', 'Schedule', 'ServiceRequest', 'Specimen', 'SupplyDelivery',
'SupplyRequest', 'Task', 'VisionPrescription', 'Practitioner', 'Organization', 'Patient',
'Location'

<br/>

3. Paging for patient data - Nikita - Complete
    - The volume of resources that can be related to a single FHIR Patient resource tends to be very large as one patient can have mutliple conditions, medications and other related information. Therefore, we need a mechanism to page such queries based on the total, current count of results and page offset.

    #### Acceptance Criteria:
    1. Large volumes of data are paged at 40 entries per page.
    2. The user is able to click "Next" and "Previous" buttons on the UI to go back and forth between pages.

<br/>

4. Paging for patients - Nikita - Complete
    - The volume of data returned by FHIR can be very large, especially for queries listing multiple patients. Therefore, we need a paging mechanism that will allow us to search each query based on the returned page. This will involve keeping track of the current page being displayed and calculating what page to query next if we decide to go forwards or backwards on the UI.

    #### Acceptance Criteria:
    1. Large volumes of data are paged at 40 entries per page.
    2. The user is able to click "Next" and "Previous" buttons on the UI to go back and forth between pages.

<br/>

5. Searching patients by tag - Complete
    - We need to be able to choose what attribute we search patients by since there are multiple identifiers for a single patient. It can be a name or an id of the patient in the database. 

    #### Acceptance Criteria:
    1. The user is able to choose a combination of attributes and values to search the database for. This combination should come from {first name, last name, id}.
    2. The user is then able to view only results matching this combination or none if nothing exists in the database.

<br/>

6. Finalize UI functionality - Eric and Felicia - Complete
    - The UI needs to be finilized including inputs for search parameters, button positions, patient card display, 

    #### Acceptance Criteria:
    1. The different resources for a patient are displayed in a table per resource category.
    2. The user is able to cycle between views for different resources.
    3. The user is able to clearly see what parameters they are performing their searches on.


<br/>

7. Patient Data Download - Felicia - Complete
    - We want to enable the user to download all data for a specific patient as well as data for a single resource for a single patient. This should be done through the UI. 

    #### Acceptance Criteria:
    1. The user is able to download all data for a specific patient in a JSON.
    2. The user is able to download all data for a specific category of resource for a specific patient in a CSV.
    3. Two download option buttons are visible in the UI for every category of resources that a patient has.

<br/>

8. Presentation and A3 Overview - Viktar, Nikita and Felicia - Complete
    - We need to decide parts for each group member for the final presentation. Everyone should get an about equal part of the presentation.

    #### Acceptance Criteria:
    1. The presentation should have an accompanying powerpoint.
    2. The presentation should include a video demo of our application.
    3. The presentation should include about equal parts for everyone.
    4. The following topics should be addressed: what our app is/does, why is it important, decisions made in the process, testing/verification information and any adjustments made during the retrospectives.

<br/>

9. A2 Postmortem - Eric, Felicia, Nikita and Viktar - Complete
    - A2 postmortem has to be completed 
    
    #### Acceptance Criteria:
    1. The postmortem should contain the following sections: What goals have been achieved (split into frontend and backend), what goals have been missed and by how much and adjustments that were made or are to be made.
    2. The postmortem should use complete sentences.

<br/>

10. Bug fixes - Felicia, Nikita and Viktar - Complete
    - At the beginning of A3 there were several visual issues (mostly items not being aligned properly) that need to be addressed.
    
    #### Acceptance Criteria:
    1.  The UI is free of visual issues.

<br/>

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

Front end tests: 
- React component testing was done with snapshotting and Jest. Components are provided constant data and rendered to check visual elements do not change unexpectedly during runtime. 

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

### More elaborate front-end testing
Although we ended up deciding automated front-end testing wasn't as important due to the limited functionality of the app which could just be tested manually, 
It would've been helpful to create proper test cases to check if components responded correctly compared with the snapshot testing that was done. Snapshot testing 
can help discover unexpected changes, but provides limited coverage for any component logic. 

### Customizable downloads 
In the original wireframe designs we had on figma, we wanted to allow the user to download specific fields of data by selecting them via checklist. Due to time constraints, this was not implemented 

<br/>


## Additional Acceptance Criteria Documenation
This is a document confirming our confirmation of the acceptance criteria for the application and its features with our industry partners. <br/>

<br/>

![image](https://user-images.githubusercontent.com/44914019/144769899-e916d7b2-888e-45d7-ae70-c5165a1915a2.png)

<br/>

We also verified acceptance criteria by reviewing each other's PRs. These serve as a documentation of our code verification process. In general,the approval processes required two different people to approve another person's PR. During this time the two reviewers would checkout the branch being merged locally and test it in addition to reviewing the code. Many changes were made during these reviews as a result. <br/>

<br/>

The PRs are organized from earliest to latest. So PR 1 is the very first PR of our application. 

<br/>

1. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/2
2. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/3
3. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/4
4. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/5
5. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/6
6. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/7
7. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/8
8. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/9
9. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/10
10. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/11
11. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/12
12. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/16
13. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/17
14. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/18
15. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/19
16. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/20
17. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/21
18. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/25
19. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/26
20. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/27
21. https://github.com/csc302-distributed-suffering/parajuniper-project-2/pull/24






