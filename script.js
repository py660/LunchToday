import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js';

const SERVER_URL = "https://script.google.com/macros/s/AKfycbwDMmO7vCfKa44sVCpupGBZQgJIN-I0I4NbDpa2okiDRkT5-LnR9CAppp4NJPzGfmAZaw/exec?";


/*Method 	Description
tip()       	Show gray toast with any valid HTML you passed in
info()      	Show blue toast with any valid HTML you passed in
warning()   	Show orange toast with any valid HTML you passed in
success() 	  Show green toast with any valid HTML you passed in
alert() 	    Show red toast with any valid HTML you passed in
async() 	    Show async toast, until passed Promise will be completed
modal() 	    Show modal window
confirm()   	Show confirmation window
asyncBlock() 	Show popup which blocks the screen, until passed Promise will be completed

*/

let notifier = new AWN({position: "top-right"});

window.onerror = function (message, file, line, col, error) {
  notifier.alert(error.message);
  return false;
};

window.addEventListener('unhandledrejection', function (e) {
  notifier.alert(e.error.message);
});


const firebaseConfig = {
  apiKey: "AIzaSyDT0lSZpFCEcXMmklrw61Whyr9NojUz47A",
  authDomain: "enter-password-660.firebaseapp.com",
  projectId: "enter-password-660",
  storageBucket: "enter-password-660.appspot.com",
  messagingSenderId: "307769319803",
  appId: "1:307769319803:web:623c484f33b9d7cdab1dde",
  measurementId: "G-LFM92GJKJZ"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
// Add the public key generated from the console here.

onMessage((payload) => {
  console.log('Message received. ', payload);
  alert(payload);
});


let success = false;

function subscribe(){
  notifier.asyncBlock(new Promise((resolve, reject) => {
    try{
      setTimeout(reject, 30*1000, "Could not get permissions! Please reload and try again.");
      requestPermission(resolve, reject);
    }catch(e){
      console.log(e);
      reject(e);
    }
  }), ()=>{
    if (success){
      notifier.success("Registration successful!")
    }
    else{
      notifier.alert("An unexpected error occurred. Please reload and try again.")
    }
  });
}

function requestPermission(resolve, reject){
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted'){
      console.log('Notification permission granted!');
      getToken(messaging, { vapidKey: 'BCA3U7fn_wiiI2t__LnxA7ASyQ_93q-rKU8EaKUPpWtjfYLLXSUGZCHcmEpuZoa1WozAR7EfXjKqFwN2rV85J2k' }).then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          
          fetch(SERVER_URL, {
            redirect: "follow",
            method: "POST",
            body: currentToken,
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            }
          }).then(()=>{success=true;resolve()}).catch((e)=>reject(e));
        }
        else {
          // Show permission request UI
          console.log('No registration token, requesting...');
          requestPermission(resolve, reject);
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        setTimeout(requestPermission, 500, resolve, reject);
        // ...
      });
    }
    else{
      console.log("Permission denied :(");
      reject("Notification permission denied. Please reset all permissions for this site and try again.");
    }
  })
}

function unsubscribe(){
  notifier.asyncBlock(new Promise((resolve, reject) => {
    setTimeout(reject, 30*1000, "Could not unsubscribe! Please reload and try again.");
    getToken(messaging, { vapidKey: 'BCA3U7fn_wiiI2t__LnxA7ASyQ_93q-rKU8EaKUPpWtjfYLLXSUGZCHcmEpuZoa1WozAR7EfXjKqFwN2rV85J2k' }).then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        
        fetch(SERVER_URL + "path=unsubscribe&token="+currentToken, {
          redirect: "follow",
          method: "GET",
        }).then(()=>{resolve("Successfully unsubscribed.")}).catch((e)=>{reject(e)});
      }
      else {
        reject("You can't unsubscribe something you haven't subscribed to!");
      }
    }).catch((err) => {
      reject("You can't unsubscribe something you haven't subscribed to!");
      // ...
    });
  }), "Successfully unsubscribed.");
}

function debug(){
  getToken(messaging, { vapidKey: 'BCA3U7fn_wiiI2t__LnxA7ASyQ_93q-rKU8EaKUPpWtjfYLLXSUGZCHcmEpuZoa1WozAR7EfXjKqFwN2rV85J2k' }).then((currentToken) => {
    if (currentToken) {
      notifier.confirm(`FCM Registration ID: ${currentToken}`);
    }
    else {
      notifier.confirm(`FCM Registration ID: Not registered`);
    }
  }).catch((err) => {
    notifier.confirm(`FCM Registration ID: Not registered`);
    // ...
  });
}

document.getElementById("subscribe").addEventListener("click", subscribe);
document.getElementById("unsubscribe").addEventListener("click", unsubscribe);
document.getElementById("debug").addEventListener("click", debug);