// firebase-messaging-sw.js
// Service Worker riêng cho Firebase Cloud Messaging

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyALoTwRXs-ddu6756M8Dj6RGeb1aN1oWnc",
  authDomain: "anvatlamthao.firebaseapp.com",
  projectId: "anvatlamthao",
  storageBucket: "anvatlamthao.firebasestorage.app",
  messagingSenderId: "1018828516701",
  appId: "1:1018828516701:web:59c3c36e414a14d9858cb4"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

/**
 * Nhận thông báo khi website đang đóng hoặc chạy nền
 */
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Nhận thông báo:",
    payload
  );

  const notificationTitle =
    (payload.notification && payload.notification.title) ||
    "Ăn Vặt Lâm Thao";

  const notificationBody =
    (payload.notification && payload.notification.body) ||
    "Bạn có thông báo mới.";

  const notificationOptions = {
    body: notificationBody,

    // Logo website
    icon: "/logowed.png",
    badge: "/logowed.png",

    data: payload.data || {},

    // Gom các thông báo đơn hàng vào cùng nhóm
    tag: "anvatlamthao-order",

    // Cho phép thông báo mới hiện lại
    renotify: true
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

/**
 * Khi khách bấm vào thông báo
 */
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function (clientList) {

      // Nếu website đang mở thì đưa khách về website
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      // Nếu website chưa mở thì mở website
      if (clients.openWindow) {
        return clients.openWindow("/");
      }

    })
  );
});
