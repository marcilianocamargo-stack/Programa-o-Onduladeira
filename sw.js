/* Endereço antigo da Programação: agora só redireciona.
   Programação: https://marcilianocamargo-stack.github.io/programacao-onduladeira/
   Consulta OC: https://marcilianocamargo-stack.github.io/consulta-oc/
   Este service worker só apaga os caches antigos dele (onduladeira-vN) e se desliga.
   Não mexe em nenhum outro cache: todos os apps da Prime dividem o armazenamento do github.io. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => /^onduladeira-v\d+$/.test(k)).map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
  );
});
