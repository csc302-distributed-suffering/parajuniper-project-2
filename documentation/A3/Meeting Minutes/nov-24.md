# Goals
- Create an outline for A2 Postmortem.
- Come up with a brief plan for next week.

## Postmortem:
### What goals have been achieved?
 - Got basic functionality working
 - Conversion to TS, backend routing/testing, basic frontend UI elements
### What goals have been missed and my how much
See [A2 Postmortem](https://github.com/csc302-distributed-suffering/parajuniper-project-2/blob/main/documentation/A3/A2%20Post%20Mortem.md) for details. These are rough notes.
- Scrapped CircleCI, not enough time to implement in a meaningful way
- Discussion about frontend testing - even worth it?
- Scrap frontend testing, too much trouble
- App is small enough to verify on our own 
- How plans were adjusted, in light of that information, including goals or features that were dropped
- CircleCI, frontend snapshot testing dropped
- Some deadlines were adjusted

## Plan for Next Week:
### Backend:
1. Parse the data returned by the $everything query for a single patient. <br/>
   <br/>
   This will require us to put each type of resource assosciated with a patient into separate buckets so that the UI can make use of them. The following categories need to be taken care of: 'Annotation', 'Signature', 'Account', 'AdverseEvent', 'AllergyIntolerance', 'Appointment',
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
    'SupplyRequest', 'Task', 'VisionPrescription'</br>
    </br>
2. Decide on the datastructure for 1. <br/>
   <br/>
   This will likely be an object with a key that maps to a list of resource objects for every single resource mentioned in 1.</br>
   </br>
3. Ensure that among the resource buckets created in 2. there is also a bucket for the general patient information that we retrieve. </br>
 </br>

4. Frontend will have to manually page patient data due to FHIR limitations. <br/> 
   </br>
   This only really applies to the query that retrieves basic information for all patients.
   
### Frontend:
1. Expand patient information when a card is clicked. <br/>
   <br/>
   Display all relevant patient information (per category) when the patient card is expanded. <br/>
   <br/>
2. Option to download data. </br>
   <br/>
   We want the user to have an option to download the data as a JSON object.</br>
   <br/>
3. UI needs to be fleshed out a bit based on mockup. </br>
</br>

### General
1. Leave time to test stuff and write docs.
   <br/>
   Aim to be done with the implementation by Dec 3.
