// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const URL_BASE = "http://localhost/universe-orm";
export const URL_BASE_FIREBASE = "http://localhost:3000/api";
// export const URL_BASE = 'https://5f3b0f8c466f.ngrok.io';
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAMoa4y9cmDNDkbeBpeGiLsMK2V7sQ3Vfo',
    authDomain: 'booststoreapp-1db40.firebaseapp.com',
    databaseURL: 'https://booststoreapp-1db40-default-rtdb.firebaseio.com',
    projectId: 'booststoreapp-1db40',
    storageBucket: 'booststoreapp-1db40.appspot.com',
    messagingSenderId: '532058823480',
    appId: '1:532058823480:web:08e49a27d7f942a90d7fcd',
    measurementId: 'G-N2GH6P5YS9',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
