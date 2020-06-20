'use strict';
const URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const options = {
  client_id: '813125366757-7kgoij176hgog7ji4og0f8qcvo8qik5f.apps.googleusercontent.com', 
  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  response_type: 'code',
  redirect_uri: `http://localhost:3000/oauth`,
};

const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
  })
  .join('&');

console.log('Query', queryString);
const authUrl = `${URL}?${queryString}`;
const link = document.getElementById('googleOauth');
link.setAttribute('href', authUrl);