// format: group_name: [[column_name, column width]]
// You can add a "." followed by an alternative name for column name
// put column width as 0 if you want the default [100]
// for columns like id they should be wider
// third column optional and contains path to field if it is nested
// fourth column needed if third column is provided, "r" means the final field is in an array

const GROUP_MAPS = {
    'Patient': [['birthDate', 0], ['gender', 0], ['id', 300]],
    'CarePlan': [["id", 300], ["category", 300, "text", "r"], ["status", 0]],
    'Consent': [["id", 0], ["category", 300, "text", "r"]],
    'ClinicalImpression': [["id", 0], ["assessor", 300, "reference", "s"], ["meta.updated", 200, "lastUpdated", "s"]],
    'Condition': [["id", 300], ["code.text", 300, "text", "s"], ["clinicalStatus", 0, "coding.code", "r"]],
    'Coverage': [["id", 0], ["type", 0, "coding.display", "r"], ["period.ends", 0, "end", "s"]],
    'Device': [["id", 0], ["deviceName", 300, "name", "r"]],
    'DiagnosticReport': [["id", 300], ["code", 300, "text", "s"], ["issued", 300]],
    'Group': [["id", 300]],
    'MedicationRequest': [["id", 300], ["medicationCodeableConcept.medication", 300, "text", "s"], ["status", 0]],
    'Observation - Laboratory': [["code.name", 300, "text", "s"], ["valueQuantity.value", 0, "value", "s"], ["valueQuantity.unit", 0, "unit", "s"], ["issued", 0]],
    'Observation - Survey': [["code.name", 200, "text", "s"], ["valueCodeableConcept", 200, "text", "s"], ["issued", 0]],
    'Observation - Vital Signs': [["code.name", 300, "text", "s"], ["valueQuantity.value", 0, "value", "s"], ["valueQuantity.unit", 0, "unit", "s"], ["issued", 0]],
    'Procedure': [["id", 300], ["code.name", 300, "text", "s"], ["status", 0]],
    'ServiceRequest': [["id", 0], ["code.text", 300, "text", "s"], ["meta.updated", 200, "lastUpdated", "s"]]
}



export default GROUP_MAPS