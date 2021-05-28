## Notes / Guide / Tutorial

 1. `create-react-app`

 2. `cd <your-new-project-directory>`

 3. Gut sample React starter code and layout basic dashboard component.

 4. Go to [Firebase](https://console.firebase.google.com/u/0/) and create a new project.

 5. In the project settings tab, create a web app, and copy the returned config code snippet.

```
const firebaseConfig = {
  apiKey: <your-api-key>,
  authDomain: <your-auth-domain>,
  projectId: <your-project-Id>,
  storageBucket: <your-storage-bucket>, //if you need this service, *optional.
  messagingSenderId: <your-messagingSender-Id>, // ^^^
  appId: <your-app-id>,
  measurementId: <your-measurement-id>
};
```

 6. In the terminal in your project.
`mkdir util && cd util && touch firebase.js`

 7. Paste the copied Firebase sdk config snippet copied from a step earlier.

 8. Install and import Firebase libraries and dependencies.

 9. `npm i --save firebase`

 10. In `./firebase.js` import the sdk and products wanted.
 ```
 // Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
```

11. Initialize Firebase in your app.
```
// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  // ...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

12. Export initialized firebase from firebase.js
```
import firebase from "firebase/app";
import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  ...
};

if (!firebase.apps.length) { 
  firebase.initializeApp(firebaseConfig)
}
  
export default firebase;
```
13. Use Firebase in your app! Tada!

