/* Registers the service worker and wires up the PWA install prompt. */

(function () {
  'use strict';

  /* ---------- Service worker registration ---------- */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').then(function (registration) {
        // If a new worker is waiting, offer the user a refresh.
        registration.addEventListener('updatefound', function () {
          var worker = registration.installing;
          if (!worker) return;
          worker.addEventListener('statechange', function () {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              notifyUpdate(registration);
            }
          });
        });
      }).catch(function (error) {
        console.warn('Falha ao registrar o service worker:', error);
      });
    });

    var waitingWorker;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (waitingWorker) {
        window.location.reload();
        waitingWorker = null;
      }
    });
  }

  function notifyUpdate(registration) {
    if (!('showUpdatePrompt' in registration)) return;
    var message = 'Nova versão disponível.';
    var shouldReload = window.confirm(message + ' Recarregar agora?');
    if (shouldReload) {
      waitingWorker = registration.waiting;
      if (waitingWorker) waitingWorker.postMessage('SKIP_WAITING');
    }
  }

  /* ---------- Install prompt ---------- */

  var deferredPrompt = null;
  var installButton = document.querySelector('[data-install]');

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredPrompt = event;
    if (installButton) installButton.hidden = false;
  });

  if (installButton) {
    installButton.addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () {
        deferredPrompt = null;
        installButton.hidden = true;
      });
    });
  }

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    if (installButton) installButton.hidden = true;
    console.log('PWA instalada com sucesso.');
  });

  /* ---------- Connection status ---------- */

  var status = document.querySelector('[data-status]');

  function renderStatus() {
    if (!status) return;
    var online = navigator.onLine;
    status.textContent = online ? 'Online' : 'Offline — usando o cache';
    status.dataset.state = online ? 'online' : 'offline';
  }

  window.addEventListener('online', renderStatus);
  window.addEventListener('offline', renderStatus);
  renderStatus();
})();
