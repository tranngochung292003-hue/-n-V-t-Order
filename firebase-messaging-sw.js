importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyALoTwRXs-ddu6756M8Dj6RGeb1aNloWnc",
  authDomain: "anvatlamthao.firebaseapp.com",
  projectId: "anvatlamthao",
  storageBucket: "anvatlamthao.firebasestorage.app",
  messagingSenderId: "1018828516701",
  appId: "1:1018828516701:web:59c3c36e414a14d9858cb4"
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
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
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
