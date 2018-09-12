interface headersInterface {
    'content-type': string;
    [propName: string]: string
}

export interface bodyInterface {
    [propName: string]: string
};

export default (path: string, method: string, body?: bodyInterface, authenticate = true) => {
    const apiBaseUri = 'http://localhost:8000/';
    const appBaseUri = 'http://localhost:3000/';

    const headers: headersInterface = {
        'content-type': 'application/json',
    };
    const localStorageSessionKey = 'userData';
    if (authenticate) {
        const userData = JSON.parse(localStorage.getItem(localStorageSessionKey));
        if (!userData) {
            throw new Error('User data not set');
        }
        const token = userData.token;
        if (!token) {
            throw new Error('Token not found in storage');
        }

        headers['x-auth'] = token;
    }

    return fetch(`${apiBaseUri}${path}`, {
        body: (body) ? JSON.stringify(body) : null,
        headers,
        method,
        mode: 'cors'
    })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }

        return Promise.all([
            response.json(),
            Promise.resolve(response)
        ]);
    })
    .then((responseData) => {
        return {
            data: responseData[0],
            request: responseData[1]
        };
    })
    .catch((error: any) => {
        if (error.status === 401) {
            // unauthorized, remove session data and redirect to homepage
            localStorage.removeItem(localStorageSessionKey);
            window.location.href = appBaseUri;
        }
        return Promise.reject(error);
    });
}