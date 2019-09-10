window.onload = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
      .then((reg) => console.log('sw registered', reg))
      .then(() => registerUserModal())
      .catch((err) => console.log('sw not registered', err));
  }
}

/*
function requestPermission() {
  if ('Notification' in window && navigator.serviceWorker) {
    return;
  }

  Notification.requestPermission((status) => {
    console.log('1 Notification permission status:', status);
    displayNotification();
  });
}

function displayNotification() {
  if ('Notification' in window && navigator.serviceWorker) {
    return;
  }

  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: '../images/icon-96.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}
*/