'use strict';
const URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const options = {
  client_id: '813125366757-7kgoij176hgog7ji4og0f8qcvo8qik5f.apps.googleusercontent.com', 
  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  response_type: 'code',
  redirect_uri: `https://edusavior.herokuapp.com/oauth`,
};

const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
  })
  .join('&');
const authUrl = `${URL}?${queryString}`;
const link = document.getElementById('googleOauth');
link.setAttribute('href', authUrl);

//linkedIn
let URL_linkedIn='https://www.linkedin.com/oauth/v2/authorization';
let option={
  response_type:'code',
  client_id:'77y0bfyk5tckn8',
  redirect_uri: 'https://edusavior.herokuapp.com/linkedinoauth',
  scope:'r_liteprofile',
};
let QueryString=Object.keys(option).map((key)=>{
  return `${key}=`+encodeURIComponent(option[key]);
}).join('&');
let aoutUrl=`${URL_linkedIn}?${QueryString}`;
let linkedIn =document.getElementById('linked');
linkedIn.setAttribute('href',aoutUrl);
