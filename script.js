import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js';

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


function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted'){
      console.log('Notification permission granted!');
      getToken(messaging, { vapidKey: 'BCA3U7fn_wiiI2t__LnxA7ASyQ_93q-rKU8EaKUPpWtjfYLLXSUGZCHcmEpuZoa1WozAR7EfXjKqFwN2rV85J2k' }).then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          
          fetch("https://script.google.com/macros/s/AKfycbwDMmO7vCfKa44sVCpupGBZQgJIN-I0I4NbDpa2okiDRkT5-LnR9CAppp4NJPzGfmAZaw/exec", {
            redirect: "follow",
            method: "POST",
            body: currentToken,
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            }
          });

          alert("Registration sucessful");

          onMessage((payload) => {
            console.log('Message received. ', payload);
            alert(payload);
          });
        }
        else {
          // Show permission request UI
          console.log('No registration token, requesting...');
          requestPermission();
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        setTimeout(requestPermission, 500);
        // ...
      });
    }
    else{
      console.log("Permission denied :(");
      alert("Notification permission denied. Please reset all permissions for this site and try again.");
    }
  })
}


function unsubscribe(){
  getToken(messaging, { vapidKey: 'BCA3U7fn_wiiI2t__LnxA7ASyQ_93q-rKU8EaKUPpWtjfYLLXSUGZCHcmEpuZoa1WozAR7EfXjKqFwN2rV85J2k' }).then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
        
      fetch(SERVER_URL + "path=unsubscribe&token="+currentToken, {
        redirect: "follow",
        method: "GET",
      }).then(()=>{alert("Succesfully unsubscribed")}).catch((e)=>{alert("ERROR:", e)});
    }
    else {
      alert("You can't unsubscribe something you haven't subscribed to!");
    }
  }).catch((err) => {
    alert("You can't unsubscribe something you haven't subscribed to!");
    // ...
  });
}

document.getElementById("unsubscribe").addEventListener("click", unsubscribe);