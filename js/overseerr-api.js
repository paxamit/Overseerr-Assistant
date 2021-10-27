let xhr = null;

function getLoggedUser(callback) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', `${origin}/api/v1/auth/me`, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Api-Key', serverAPIKey);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.hasOwnProperty('error')) {
                    if (callback) callback(false, response.error);
                } else {
                    if (callback) callback(true, null, response);
                }
            } catch {
                if (callback) callback(false, 'Server unreachable');
            }
            xhr = null;
        }
    }
    xhr.timeout = 5000;
    xhr.ontimeout = function() {
        if (callback) callback(false, 'Server unreachable');
    }
    xhr.send();
}
