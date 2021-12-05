const getPatientsWName = async (firstName, lastName, count) => {   
    
    const given = firstName === '' ? '' : `&given=${firstName}`;
    const family = lastName === '' ? '' : `&family=${lastName}`;
    
    const url = `/patients/list?_count=${count}${given}${family}`;
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

const getPatientList = async (params) => {
    const qParams = [];
    for (const key in params) {
        qParams.push(`${key}=${params[key]}`);
    }
    const url = '/patients/list?' + qParams.join('&');

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
        console.error(JSON.stringify(error));
        throw new Error(error)
    }
}

const getPatientByID = async (id, count) => {
    const url = `/patients/info?id=${id}&_count=${count}`
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

        console.log(jsonData);

        return {status: response.status, data: jsonData}
    } catch (error) {
        throw new Error(error)
    }
}

const getPage = async (url) => {
    console.log(url);
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
        console.error(JSON.stringify(error));
        throw new Error(error)
    }
}



export {getPatientsWName, getPatientByID, getPatientList, getPage}
