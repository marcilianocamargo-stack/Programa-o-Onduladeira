/* Consulta OC Prime — service worker (app shell só, sem cache de dados —
   os dados sempre vêm das pastas locais via File System Access API).
   Para forçar atualização nos aparelhos: mude o número da versão e faça o commit. */
const VERSAO = 'consulta-oc-v1';
const ARQUIVOS = ['consulta.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(VERSAO).then(c => c.put(e.request, copia)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request))
  );
});
