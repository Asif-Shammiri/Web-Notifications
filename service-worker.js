﻿
console.log('I am a Service Worker!');
self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', function (event) {

  event.notification.close();

  event.waitUntil(clients.matchAll({
      type: "window"
  }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == '/' && 'focus' in client)
              return client.focus();
      }
      if (clients.openWindow)
          return clients.openWindow('Your web address Here');
  }));
});
