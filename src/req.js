
function GetJSON(uri) {
    let params = {
        method: 'GET',
        accept: 'application/json',
    }

    return fetch(uri, params).then((res) => {
        if (res.status === 403) {
            return null
        }

        return res.json()
    })
}