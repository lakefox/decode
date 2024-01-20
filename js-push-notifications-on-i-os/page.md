# JS Push Notifications on iOS

Push notifications are a great way to keep users engaged with your web application even when they're not actively using it. In this tutorial, I will guide you on how to use push notifications in JavaScript.

## Register for a Push Notification Service

To use push notifications, you need to register for a push notification service. Some popular services include Firebase Cloud Messaging, OneSignal, and Pusher. These services provide APIs for sending and receiving push notifications.

## Ask for User Permission

Before you can send push notifications, you need to get the user's permission. This is done using the Notification API in JavaScript. Here's an example of how to ask for permission:

```javascript
if (Notification.permission === "default") {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      console.log("Permission granted");
    }
  });
}
```

This code checks the current permission status and, if necessary, prompts the user for permission. If the user grants permission, a message is logged to the console.

## Create a Service Worker

To receive push notifications, you need to create a service worker. A service worker is a JavaScript file that runs in the background of your web application, independent of the user interface. Here's an example of how to create a service worker:

```javascript
self.addEventListener("push", function (event) {
  if (event.data) {
    console.log("Push notification received", event.data.text());
    const title = "My Web App";
    const options = {
      body: event.data.text(),
      icon: "/path/to/icon.png",
    };
    event.waitUntil(self.registration.showNotification(title, options));
  } else {
    console.log("Push notification received but no data");
  }
});
```

This code listens for the `push` event and displays a notification when a push notification is received. The notification includes a title, body, and icon.

## Send Push Notifications

To send a push notification, you need to use the API provided by your push notification service. Here's an example of how to send a push notification using Firebase Cloud Messaging:

```javascript
fetch("https://fcm.googleapis.com/fcm/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "key=<YOUR_SERVER_KEY>",
  },
  body: JSON.stringify({
    to: "<DEVICE_REGISTRATION_TOKEN>",
    notification: {
      title: "My Web App",
      body: "New message received",
      icon: "/path/to/icon.png",
    },
  }),
})
  .then(function (response) {
    console.log("Push notification sent", response);
  })
  .catch(function (error) {
    console.error("Error sending push notification", error);
  });
```

This code sends a push notification to the device with the specified registration token. The notification includes a title, body, and icon.

## Handle Clicks on Notifications

When the user clicks on a notification, you can handle the event in your service worker. Here's an example of how to handle clicks on notifications:

```javascript
self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked");
  event.notification.close();
  event.waitUntil(clients.openWindow("https://mywebapp.com"));
});
```

This code listens for the `notificationclick` event and closes the notification when it's clicked. It also opens a new window to the specified URL.
