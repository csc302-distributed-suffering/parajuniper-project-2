// format: group_name: [[column_name, column width]]
// put column width as 0 if you want the default [100]
// for columns like id they should be wider

const GROUP_MAPS = {
    'Patient': [['birthDate', 0], ['gender', 0], ['id', 300]],
    'CarePlan': [["id", 300], ["category", 300, "text", "r"], ["status", 0]],
    'Consent': [["id", 0], ["category", 300, "text", "r"]],
    'ClinicalImpression': [["id", 0], ["assessor", 300, "reference", "s"], ["meta.updated", 200, "lastUpdated", "s"]]
}



export default GROUP_MAPS