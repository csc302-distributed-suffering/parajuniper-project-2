## Milestone 1: (Oct 4th)

- Decide on a containerization service
  - Docker vs. Google Cloud
- Create demo project
  - Have index.html frontend with &quot;Hello World&quot; in it (Frontend)
  - Have demo express server (can also print &quot;Hello World&quot; to confirm functionality)
- Responsibilities/Immediate Next Actions for Milestone 1:
  - Eric
    - Script for docker install and setting up docker image
  - Felicia
    - Testing framework
  - Nikita
    - Script for docker install and setting up docker image
    - CI set up for repo
  - Viktar
    - Set up React frontend
    - Set up backend server and connect it to frontend

## Milestone 2: Rough Implementation

- AC:
  - Simple but still functional UI - early stages/storyboards
    - Simple landing page with either drop down menu of patients or fields to enter patient information
    - Display some or all data upon retrieval
    - Design data display/format we are displaying it in
    - Decide on what pages we are going to have
  - Preliminary structure of backend - number and type of routes
    - Routing from front end to backend to FHIR
  - Preliminary data parsing logic when receiving response from FHIR
    - Decide on what data to retrieve from FHIR
    - Decide on what params we are using for FHIR queries
  - Documentation
    - Short function headers and module descriptions

  - Rough flow complete:
    - Request from front end to backend
    - Backend to FHIR
    - Receiving data, displaying in frontend
- Responsibilities:
  - Eric and Felicia
    - UI design
  - Nikita and Viktar
    - Preliminary structure of backend - number and type of routes
    - Preliminary data parsing logic when receiving response from FHIR

## Milestone 3: First Draft Implementation Complete

- AC:
  - All logic/routing completed
    - Efficient parsing for data based on volume
    - Data available for download
    - Cleaned up routing structure
  - Finalized UI designs
    - Data displayed &quot;prettily&quot;
    - Cleaned up fields/drop downs for patient info entry
  - Implement UI designs with React
    - Create components linking frontend/backend
  - Unit tests at 75% coverage
    - Updated as development progresses
    - CircleCI enforces coverage on commits to main
  - Defect backlog (issues on GH)
    - Defects labelled on domain and priority
    - Updated as development progresses
  - Documentation
    - Begin working on more detailed documentation for the app on Github
      - High-level description of project components. (Diagrams?)
      - More detailed documentation of API.
- Responsibilities:
  - Eric and Felicia
    - Finalized UI designs
    - Implement UI designs with React
  - Nikita and Viktar
    - All logic/routing completed (backend)
    - Query optimization and scaling (if necessary)
  - Everyone:
    - Creating unit tests for code to achieve \&gt;=75% coverage
    - Documenting issues on github to have an updated backlog

## Milestone 4: Tested/Iterated Implementation

- AC:
  - Clear defect backlog
    - Defect taken on based on priority
    - Documentation and updates of progress with defects on GH issue
  - Increase code coverage to 85%
    - Add testing to uncovered code
  - Potentially add integration and user testing time permitting
    - Integration testing with CircleCI
    - User testing with acquaintances
  - Documentation
    - Finalize documentation
- Responsibilities:
  - Everyone
    - Clear defect backlog based on area (backend/frontend)
    - Raise testing coverage to \&gt;=85%
    - Finalize documentation
    - Integration with CircleCI
