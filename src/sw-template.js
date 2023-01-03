/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

workbox.loadModule('workbox-background-sync');

const {registerRoute} = workbox.routing;
const {CacheFirst, NetworkFirst, NetworkOnly} = workbox.strategies;

const {BackgroundSyncPlugin} = workbox.backgroundSync;


const cachesFirst = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
]

const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events'
]


registerRoute(
    ( {url} ) => {
        if(cachesFirst.includes(url.href)) return true;
        return false;
    },
    new CacheFirst()
)

// ! Ejemplo...
// registerRoute(
//     new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'),
//     new CacheFirst()
// )
// registerRoute(
//     new RegExp('http://localhost:4000/api/auth/renew'),
//     new NetworkFirst()
// )



registerRoute(
    ({url}) => {
        if(cacheNetworkFirst.includes(url.pathname)) return true;
        return false;
    },
    new NetworkFirst()
)

// offline post

const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60
})

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
)

registerRoute(
    new RegExp(/^http:\/\/localhost:4000\/api\/events/),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'PUT'
)

registerRoute(
    new RegExp(/^http:\/\/localhost:4000\/api\/events/),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
)