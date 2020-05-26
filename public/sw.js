self.addEventListener("install", event => {
  console.log("['service worker'] installing service worker...", event);
});

self.addEventListener("activate", event => {
  console.log("['service worker'] activating service worker...", event);
  return self.clients.claim();
})
