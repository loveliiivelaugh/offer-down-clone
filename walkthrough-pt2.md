## Docs for walkthrough

[Setting up Authentication Web](https://firebase.google.com/docs/auth/web/start)

## Guide

1. Create a form that allows new users to register with your app using their email address and a password. I'm personally not the first to jumping on building a form from scratch. So it's time to grab a UI library. I'm going with [MaterialUI](https://material-ui.com/) on this one.

2. Follow the quick start installation guide on their [page](https://material-ui.com/).

3. `$ npm install @material-ui/core`

4. Link the style sheet, copy the snippet into your `<head>` tag in `./index.html`.
`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />`

5. Be sure to follow the full MaterialUI installation docs to install MUI icons as well. 

6. Go to the Templates tab and we will just incorporate our use cases implementing the free MaterialUI templates. I'm not so much a designer so this is my easy and quick way out of all that design work.

7. `mkdir components && cd components && touch SignIn.js`

8. From the Material UI templates follow the links to view the code for the SignIn example and copy and paste the code into your newly created SignIn.js. Cmd + s to save.

9. Go into `App.js` and `import SignIn from './components/SignIn.js';` at the top underneath the other imports.

10. To handle our form data I am using hooks.
```
export default function SignIn() {
  const classes = useStyles();
  const [pending, setPending] = React.useState()
  const [authData, setAuthData] = React.useState({
    email: '',
    password: ''
  })

  const { email, password } = authData;

  //function to update form data state upon form change
  const onChange = e => (
    setAuthData({ ...authData, [e.target.name]: e.target.value })
  );

  const handleSubmit = (data) => {
    setPending(true);

    const { email, password } = data;
    
    const clearValues = () => {
      setAuthData({
        email: '',
        password: ''
      })
    }
    clearValues();

    setPending(false);  
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form 
          className={classes.form} 
          noValidate
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(authData);
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={authData ? email : "email"}
            onChange={onChange}
            autoFocus
          />
          
          // ...
```

11. Let's test our form data handling. And works beautifully! 

12. Now that that little detour is over back to the [Firebase Authentication docs](https://firebase.google.com/docs/auth/web/start). Next, in `./SignIn.js`, `import firebase from './../util/firebase.js'`, and then, plug this code in the handleSubmit function right underneath the destructuring of `data`.

```
const handleSubmit = (data) => {
  setPending(true);

  const { email, password } = data;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.info(user)
      if (user) {
        alert("Successfully logged in as: ", user)
      }
      // ...
    })
    .catch((error) => {
      console.info(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      if (error) {
        alert({
          errorCode: errorCode,
          errorMessage: errorMessage
        })
      }
      // ...
  });
```

13. In the `./Dashboard.js` component,

```

import firebase from './../util/firebase';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.info({
      message: "Successfully signed in!",
      userId: user.uid
    })

  } else {
    // No user is signed in.
    console.info("Oh no something happened?!")
  }
});

const Dashboard = (props) => {
  const {
    title,
    subtitle,
    body,
  } = props;

  const user = firebase.auth().currentUser;
  let name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; 
  }
  console.info(name, email, photoUrl, uid, emailVerified);

  return (
    <>
      <h1>{title}</h1>
      <p>You are successfully logged in as {email}.</p>
      <p>Your User ID is -- {uid}</p>
      <p>{body}</p>
      <div>
        Your data will go here...
      </div>
    </>
  )
}
```

14. Boom, and there we have it. We have successfully created a user using Firebase authentication services and we have a stored user in our Firestore database with an active User ID that we can query as well as use for other operations.

15. Next steps would be to refactor our code so our firebase methods are not exposed in the UI components as well as add the rest of the Firebase functionality like sign out, sign up, sign in, forgot pass, etc...

----

Stay tuned for pt 3. for Database integration.