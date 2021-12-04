// format: group_name: [[column_name, column width]]
// put column width as 0 if you want the default [100]
// for columns like id they should be wider

const GROUP_MAPS = {
    'Patient': [['birthDate', 0], ['gender', 0], ['id', 300]],
    'CarePlan': [["id", 300], ["status", 0]]

}



export default GROUP_MAPS