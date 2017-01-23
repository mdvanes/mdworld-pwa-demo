const homescreen = {
    template:
        `<article v-once>
            <h2 id="homescreen">Homescreen</h2>
            <p>
                Following the <a href="https://developer.chrome.com/multidevice/android/installtohomescreen">Homescreen</a> spec, it's possible to install this site like an app to the Homescreen of an Android device.
                To install:
            </p>
            <ul>
                <li>Open this site on Chrome Mobile 47 or higher</li>
                <li>Use the menu to select "Save to homescreen"</li>
                <li>Now an icon will be added to the homescreen of the Android device</li>
                <li>When started with this icon, a splash screen will be shown. This splash screen is generated from the web app manifest.json.</li>
                <li>The app now runs as a standalone process.</li>
            </ul>
            <p>These features can be further explained based on my manifest.json:</p>
            <pre>
{
  "name": "mdworld-pwa-demo",
  "description": "Demo for Progressive Web App",
  // Path to the icon that can be used on the homescreen
  "icons": [
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192",
      "type": "image/png",
      "density": 4.0
    }
  ],
  "start_url": ".",
  "display": "standalone",      // Run like a standalone app, not as a Chrome tab
  "orientation": "portrait",
  "theme_color": "blue",        // This should work, but I still need the theme-color meta tag in the HTML
  "background_color": "red",
  "gcm_sender_id": "0123456789" // For notification API, see below
}</pre>
        </article>`
};

export {homescreen};