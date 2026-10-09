/* Public website Firebase content bridge. Firestore document: siteContent/main */
(function () {
  const config = {
    apiKey: "AIzaSyBllxOdXfXwV52bUZPswqKgmnqVB0qKPTo",
    authDomain: "darcx-dash.firebaseapp.com",
    projectId: "darcx-dash",
    storageBucket: "darcx-dash.firebasestorage.app",
    messagingSenderId: "152656445635",
    appId: "1:152656445635:web:f7b59998310a633e9c2276",
    measurementId: "G-2XQN8TB2CS"
  };
  try {
    if (!firebase.apps.length) firebase.initializeApp(config);
    firebase.firestore().doc("siteContent/main").onSnapshot(function (snap) {
      if (!snap.exists) return;
      const data = snap.data();
      if (window.DARCX_APPLY_CONTENT) window.DARCX_APPLY_CONTENT(data);
      else window.__DARCX_PENDING_CONTENT = data;
    }, function (err) { console.warn("DARCX content sync unavailable; showing bundled content.", err.code || err.message); });
  } catch (err) { console.warn("DARCX Firebase unavailable; showing bundled content.", err); }
})();
