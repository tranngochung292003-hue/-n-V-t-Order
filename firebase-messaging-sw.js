importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "ĐIỀN_API_KEY",
  authDomain: "ĐIỀN_AUTH_DOMAIN",
  projectId: "ĐIỀN_PROJECT_ID",
  storageBucket: "ĐIỀN_STORAGE_BUCKET",
  messagingSenderId: "ĐIỀN_MESSAGING_SENDER_ID",
  appId: "ĐIỀN_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Nhận thông báo:',
    payload
  );

  const notificationTitle =
    payload.notification?.title || 'Ăn Vặt Lâm Thao';

  const notificationOptions = {
    body:
      payload.notification?.body ||
      'Bạn có thông báo mới.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: payload.data || {}
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
