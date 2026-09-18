importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');


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

  const notificationTitle =
    payload.notification.title;

  const notificationOptions = {

    body: payload.notification.body,

    icon: "/icon-192.png"

  };


  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});
