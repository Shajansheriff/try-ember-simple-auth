import Mirage from 'ember-cli-mirage';
function login(db, request) {
    let urlEncodedParts = request.requestBody.split('&');

    let userCredentials = urlEncodedParts.reduce((a, urlEncodedPart) => {
        let [key, value] = urlEncodedPart.split('=');
        a[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        return a;
    }, {});

    let expiry = new Date();
    if (userCredentials.username === 'john' && userCredentials.password === 'admin') {
        if (userCredentials.remember_me === true) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            expiry.setHours(expiry.getHours() + (24 * 30));
        } else {
            expiry.setHours(expiry.getHours() + 24);
        }
        return { "access_token": "secret token!", "account_id": 1 };
    } else {
        return new Mirage.Response(422);
    }
}

export { login };