import Cookies from 'js-cookie';


export async function csrfFetch(url, options = {}) {
    //if there is no method, set options.method to get
    options.method = options.method || 'GET';
    //set options.headers to an empty object if there are no headers
    options.headers = options.headers || {};

    //if the options.method isn't 'get', set the content-type header to
    //application/json and set the xsrf-token header ot hte value of xsrf-token cookie
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    //call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);

    //if the response status code is 400 or above, throw an error with the
    //error as the response
    if (res.status >= 400) throw res;

    //if the response status code is under 400, then return the response to the 
    //next promise chain
    return res;
}


export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}