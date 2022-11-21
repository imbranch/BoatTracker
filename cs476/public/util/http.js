function getData(url) {
    if (url) {
        const task = new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.open('GET', url);
            http.send();
            http.onload = function() {
                http.status === 200 ? resolve(http.response) : reject(Error(http.statusText));
            }
            http.onerror = function(error) {
                reject(Error(`Network Error: ${error}`));
            }
        });
        return task;
    }
    return false;
}

function postData(url) {
    if (url) {
        const task = new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.open('POST', url);
            http.send();
            http.onload = function() {
                http.status === 200 ? resolve(http.response) : reject(Error(http.statusText));
            }
            http.onerror = function(error) {
                reject(Error(`Network Error: ${error}`));
            }
        });
        return task;
    }
    return false;
}

function putData(url) {
    if (url) {
        const task = new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.open('PUT', url);
            http.send();
            http.onload = function() {
                http.status === 200 ? resolve(http.response) : reject(Error(http.statusText));
            }
            http.onerror = function(error) {
                reject(Error(`Network Error: ${error}`));
            }
        });
        return task;
    }
    return false;
}

function deleteData(url) {
    if (url) {
        const task = new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.open('DELETE', url);
            http.send();
            http.onload = function() {
                http.status === 200 ? resolve(http.response) : reject(Error(http.statusText));
            }
            http.onerror = function(error) {
                reject(Error(`Network Error: ${error}`));
            }
        });
        return task;
    }
    return false;
}

export default { getData, postData, putData, deleteData }