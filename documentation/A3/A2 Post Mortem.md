# A2 Postmortem

## What Goals Have Been Achieved?

### Backend
1. We connected our application to a server that implements FHIR at: https://r4.smarthealthit.org/ </br>
</br>

2. We created queries for retrieving patient data based on first and last name, and id. We also included the ability to view all patients in the database and the ability to retrieve all data that is relevant to a patient using the $everything query parameter.</br>
</br>

3. We were also able to make several high-level decisions on the backend such as how data will be parsed in the future and how paging of the database will work.
### Frontend
1. We had a goal of creating a Figma mockup for our UI before starting work on it during A2. We were able to complete this goal and used the mockup to guide us throughout development.</br>
</br>

2. We first created a dummy UI based on the mockup from 1. and then started hooking it up to the backend.</br>
</br>

3. We created patient cards per patient with the ability to click on a card and view detailed patient information (not connected to the backend yet). We also finished implementing the grid view for all patient cards.

## What Goals Have Been Missed and by How Much?

1. We were unable to implement CircleCI integration in any meaningful way by the deadline. We had very basic integration setup from A1, but it did not do anything and we were unable to extend it by the deadline so it was removed completely.</br>
</br>

2. We did not have time to automate frontend testing. We have some stub tests, but most of our functionality had to be tested manually to validate acceptance criteria. We believe that this is fine for now since our project is small and can easily have its UI tested manually. We also have the basic setup for frontend testing working and therefore can extend from it at any point if it becomes necessary.</br>
</br>


## Adjustments to be Made?
1. We decided to completely scrap CircleCI integration due to time constraints. There was not enough time to implement it in any meaningful way and we needed to spend time on more critical features of the project. </br>
</br>

2. We decided not to implement automated frontend testing as our project is small and can be tested manually for now in order to validate acceptance criteria. The stub code for creating frontend tests is there and so it can be extended from at any point in time.</br>
</br>
