const CryptoJS = require("crypto-js");

function sign(query) {

    let signature = '';
    const timestamp = 0;

    const ts  = Date.now();

    let paramsObject = {};

    const binance_api_secret = process.env.BINANCE_API_SECRET;
    const parameters = query;

    Object.keys(parameters).map((key) => {
        if (key != 'signature' &&
            key != 'timestamp' &&
            ! is_empty(parameters[key])
        ) {
            paramsObject[key] = parameters[key];
            //console.log(encodeURIComponent(parameters[key]));
            //pm.environment.set(key, encodeURIComponent(parameters[key]));
        }
    });

    Object.assign(paramsObject, {'timestamp': ts});

    if (binance_api_secret) {
        const queryString = Object.keys(paramsObject).map((key) => {
            return `${key}=${paramsObject[key]}`;
        }).join('&');

        signature = CryptoJS.HmacSHA256(queryString, binance_api_secret).toString();
    }

    Object.assign(paramsObject, {'signature': signature});

    return paramsObject;
}

function is_empty(str) {
    if (typeof str == 'undefined' ||
        !str ||
        str.length === 0 ||
        str === "" ||
        !/[^\s]/.test(str) ||
        /^\s*$/.test(str) ||
        str.replace(/\s/g,"") === "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

exports.sign = sign;
