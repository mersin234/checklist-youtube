self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("app-cache").then(cache => {
      return cache.addAll(["index.html", "manifest.json"]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

async function confirmAndUnlockYouTube() {
    try {
        // Definindo os parâmetros de autenticação
        const publicKey = {
            challenge: new Uint8Array(32),
            allowCredentials: [{
                type: "public-key",
                id: Uint8Array.from(JSON.parse(localStorage.getItem("fingerprintCredential")).rawId)
            }],
            timeout: 60000,
        };

        // Solicitar autenticação
        const assertion = await navigator.credentials.get({ publicKey });

        if (assertion) {
            alert("Autenticação bem-sucedida! Liberando o acesso ao YouTube...");
            // Aqui, você pode redirecionar para o YouTube ou liberar a funcionalidade.
            window.location.href = "https://www.youtube.com"; // ou desbloquear o recurso no app
        }
    } catch (error) {
        console.error("Erro na autenticação da digital:", error);
        alert("Falha na autenticação da digital. Tente novamente.");
    }
}
