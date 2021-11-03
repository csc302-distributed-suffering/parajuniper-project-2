

const getPatientsWName = async (firstName, lastName, count) => {    
    
    const url = `/patients/list?name=${firstName}&${lastName}&count=${count}`
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    try {
        const response = await fetch(request)
        const jsonData = await response.json()

        return {status: response.status, data: jsonData}
    } catch (error) {
        throw new Error(error)
    }
}

const getPatient = async (id, count) => {    
    
    const url = `/patients/info?id=${id}&count=${count}`
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    try {
        const response = await fetch(request)
        const jsonData = await response.json()

        return {status: response.status, data: jsonData}
    } catch (error) {
        throw new Error(error)
    }
}



export {getPatientsWName, getPatient}
