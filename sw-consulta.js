/* A Consulta OC virou app próprio: https://marcilianocamargo-stack.github.io/consulta-oc/
   Este service worker antigo (da consulta.html daqui) só se desliga e apaga os caches dele
   (consulta-oc-v1…v8). Não mexe em nenhum outro cache — todos os apps da Prime dividem o
   mesmo armazenamento no github.io. Na próxima abertura, a Programação registra o sw.js dela. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => /^consulta-oc-v\d+$/.test(k)).map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
  );
});
