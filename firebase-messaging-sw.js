// https://stackoverflow.com/a/74030159

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDT0lSZpFCEcXMmklrw61Whyr9NojUz47A",
    authDomain: "enter-password-660.firebaseapp.com",
    projectId: "enter-password-660",
    storageBucket: "enter-password-660.appspot.com",
    messagingSenderId: "307769319803",
    appId: "1:307769319803:web:623c484f33b9d7cdab1dde",
    measurementId: "G-LFM92GJKJZ"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

/*messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: JSON.stringify(payload),
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
});*/


//messaging.onMessage((payload) => {
//    console.log('Message received. ', payload);
//    alert(payload);
//});