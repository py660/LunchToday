if (!('serviceWorker' in navigator && 'PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    alert("nuh uh");
}

function _registerServiceWorker() {
    return navigator.serviceWorker
        .register('/sw.js')
        .then(function (registration) {
            console.log('Service worker successfully registered.');
            return registration;
        })
        .catch(function (err) {
            console.error('Unable to register service worker.', err);
        });
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function askPermission() {
    return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });
    
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error("Permission denied.");
        }
    });
}

function subscribeUserToPush() {
    return navigator.serviceWorker
        .register('/sw.js')
        .then(function (registration) {
            const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                'BDdQermocrefxi86IXKRC0c0noMd0KR6d_DH5JbsCstE_NoQ10TBb5hO8Om6U8UAIpbmZ_Ml42O8K2FeIjTF9IM',
            ),
            };
    
            return registration.pushManager.subscribe(subscribeOptions);
        })
        .then(function (pushSubscription) {
            console.log(
            'Received PushSubscription: ',
            JSON.stringify(pushSubscription),
            );
            return pushSubscription;
        });
}


document.getElementById("subscribe").addEventListener("click", subscribe);

function subscribe(){
    askPermission();
    subscribeUserToPush().then((sub) => {
        console.log(sub);
        fetch("https://script.google.com/macros/s/AKfycbwDMmO7vCfKa44sVCpupGBZQgJIN-I0I4NbDpa2okiDRkT5-LnR9CAppp4NJPzGfmAZaw/exec", {
            redirect: "follow",
            method: "POST",
            body: JSON.stringify(sub),
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            }
        });
    });
}