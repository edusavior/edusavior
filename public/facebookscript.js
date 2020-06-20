/* eslint-disable no-undef */
// 'use strict';

// document.getElementById('loginbutton').addEventListener('click', loginWithFacebook, false );
// //ready to use FB object
// function loginWithFacebook(){
//   // eslint-disable-next-line no-undef
//   FB.getLoginStatus(response => {
//     const {authResponse:{accessToken, userID}} = response;
//     fetch('/login-with-facebook', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({accessToken, userID}),
//     }).then(res => {
//       console.log(res);
//     });
//     // eslint-disable-next-line no-undef
//     FB.api('/me', function(response){
//       console.log(JSON.stringify(response));
//     });
//   }, {scope: 'public_profile,email'});
//   return false;

// }
'use strict';

document.getElementById('loginbtn').addEventListener('click', loginWithFacebook, false );

function loginWithFacebook(){
  
  FB.login(response => {
    const {authResponse:{accessToken, userID}} = response;
    fetch('/login-with-facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({accessToken, userID}),
    }).then(res => {
      console.log(res);
    });
    
    FB.api('/me', function(response) {
      console.log(JSON.stringify(response));
    });
  }, {scope: 'public_profile,email'});
  return false;

}
