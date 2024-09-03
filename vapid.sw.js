/* In the Service Worker. */

self.addEventListener('push', function(event) {
    console.log('Received a push message', event);
  
    // Display notification or handle data
    // Example: show a notification
    const title = 'New Notification';
    const body = 'You have new updates!' + event;
    //const icon = '/images/icon.png';
    const tag = 'simple-push-demo-notification-tag';
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        //icon: icon,
        tag: tag
      })
    );
  
    // Attempt to resubscribe after receiving a notification
    event.waitUntil(resubscribeToPush());
  });
  
  function resubscribeToPush() {
    return self.registration.pushManager.getSubscription()
      .then(function(subscription) {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .then(function() {
        return self.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY_HERE')
        });
      })
      .then(function(subscription) {
        console.log('Resubscribed to push notifications:', subscription);
        // Optionally, send new subscription details to your server
      })
      .catch(function(error) {
        console.error('Failed to resubscribe:', error);
      });
  }
  