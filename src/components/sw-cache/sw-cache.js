const swCache = {
    template:
        `<article>
            <h2 id="cache-api">Service Worker Cache API</h2>
            <p>
                The Cache API should give an offline experience, like a native/hybrid app. Even when an App requires
                a connection to be fully functional, it can and should provide some features when offline or when
                the network connection is not optimal. Normal browser cache would not work when the browser is offline
                and the existing AppCache spec is (becoming) outdated. The Cache API allows for a very flexible solution
                for adding offline experience to an App.<br/>
                To test this, toggle offline mode in the browser console (or disable the network connection in a
                different way) and reload the application.<br/>
                Also note that the toggle for "show notifications" behaves differently when the device is offline.
            </p>
        </article>`
};

export {swCache};