To improve the user experience and make debugging easier, add more specific error handling.  Check for common issues like invalid email format and weak passwords before attempting authentication.  Provide more detailed error messages to the user, guiding them towards correcting the input.

```javascript
function createUser(email, password) {
  //Basic Email validation
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    throw new Error('Invalid email format');
  }
  //Password validation - add more rules as needed
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('User created:', user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/email-already-in-use') {
      //Handle the error more gracefully
       throw new Error('Email address is already in use.');
    } else if (errorCode === 'auth/weak-password') {
      throw new Error('Password is too weak. Please use a stronger password.');
    } else if (errorCode === 'auth/invalid-email'){
        throw new Error('Invalid email address.');
    } else {
      throw new Error('An unexpected error occurred. ' + errorMessage);
    }
  });
}
```