import {getCookie} from "../utils/cookies";
import axios from "axios";

let base = 'http://localhost:8000/';
export function baseUrl(endpoint) {
    return `${base}${endpoint}`;
}

export function imageBaseUrl(endpoint) {
    return `${base +'media/'}${endpoint}`;
}

export const transformRequest = (data) => {
    let fd = data ? new FormData() : null;
    if (data) {
        let keys = Object.keys(data);
        keys.map(function (key) {
            let value = data[key];
            // Is it a file?
            if (value instanceof File || value instanceof Blob) {
                if (value.size <10000000) {
                    fd.append(key, value, value.name);
                }
            }
            // Is it an object?
            else if (typeof value === 'object') {
                if(value === null){
                    fd.append(key, value);
                }else{
                    fd.append(key, JSON.stringify(value));
                }
            } else {
                fd.append(key, value);
            }
        });
    }
    return fd;
};

export function isUrl(url){
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    return regex.test(url);
}

function forEachSorted(obj, iterator, context) {
    let keys = Object.keys(obj).sort();
    for (let i = 0; i < keys.length; i++) {
        iterator.call(context, obj[keys[i]], keys[i]);
    }
    return keys;
}
export function isFunction(value) { return typeof value === 'function'; }
export function isObject(value) { return value !== null && typeof value === 'object'; }
export function isUndefined(value) { return typeof value === 'undefined'; }
export function isNumber(value) {return typeof value === 'number';}
export function isArray(arr) {
    return Array.isArray(arr) || arr instanceof Array;
}

export function isDate(value) {
    return toString.call(value) === '[object Date]';
}
export function isWindow(obj) {
    return obj && obj.window === obj;
}

function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%3B/gi, ';').
    replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
}

function toJsonReplacer(key, value) {
    let val = value;

    if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
        val = undefined;
    } else if (isWindow(value)) {
        val = '$WINDOW';
    } else if (value &&  window.document === value) {
        val = '$DOCUMENT';
    }
    return val;
}

function toJson(obj, pretty) {
    if (isUndefined(obj)) return undefined;
    if (!isNumber(pretty)) {
        pretty = pretty ? 2 : null;
    }
    return JSON.stringify(obj, toJsonReplacer, pretty);
}

function serializeValue(v) {
    if (isObject(v)) {
        return isDate(v) ? v.toISOString() : toJson(v);
    }
    return v;
}

export const httpParamSerializer = data => {
    if (!data) return '';
    let parts = [];
    forEachSorted(data, function(value, key) {
        if (value === null || isUndefined(value) || isFunction(value)) return;
        if (isArray(value)) {
            value.map(v => {
                parts.push(encodeUriQuery(key)  + '=' + encodeUriQuery(serializeValue(v)));
            })
        } else {
            parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(value)));
        }
    });
    return parts.join('&');
};

export const getUrlDomain = (url) => {
    let domain;
    if (url.indexOf('://') > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
    return domain;
};


export const apiController = (url, method, data, authorization) => {
    const config = {
        method: method,
        url: url,
        withCredentials: true,
        headers: {
            // 'X-CSRFToken': getCookie('csrftoken'),
        }
    };

    if(authorization)
        config['headers']['authorization'] = "Token " + authorization

    if(data){
        if(method === 'GET'){
            config['params'] = data;
        }else{
            config['data'] = data;
        }
    }
    return axios.request(config)
        .then(response => {
            console.log('API response', response)
            return response;
        }).catch(error => {
            console.log("==== service error ========");
            console.log(error);
            return error;
        });
};

const apiFilesCall = (url, method, data) => {
    const config = {
        method: method,
        url: url,
        withCredentials: true,
        transformRequest: transformRequest,
        headers: {
            'x-csrftoken': getCookie('csrftoken'),
        }
    };
    if(data){
        config['data'] = data;
    }
    return axios.request(config);
};
