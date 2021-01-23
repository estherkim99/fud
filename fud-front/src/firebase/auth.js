import firebase from 'firebase/app';
import "firebase/auth";

export const signUpWithEmailAndPassword = async ({ firstName, lastName, email, password }) => {
    let newUser;
    await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (user) => {
        await user.user
            .updateProfile({ displayName: `${firstName} ${lastName}` })
            .then(() => {
                newUser = user.user;
            });
        })
        .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
            alert(error.message);
        } else {
            throw error;
        }
        });
    return newUser;
}

export const signInWithEmailAndPassword = async ({email, password}) => {
    let newUser;
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        newUser = userCredential.user;
    })
    .catch((error) => {
        if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/invalid-email" ||
            error.code === "auth/user-not-found"
        ) {
            alert(error.message);
        } else {
            throw error;
        }
    })
    return newUser;
}

export const signInWithGoogle = async () => {
    let newUser;
    var provider = new firebase.auth().GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        // var credential = result.credential;
        // var token = credential.accessToken;
        // var user = result.user;
        newUser = result.user;
    }).catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // var email = error.email;
        // var credential = error.credential;
        throw error;
    })
    return newUser;
}

export const signOut = async () => {
    firebase.auth().signOut().then(() => {
        // signout succesful
    }).catch((error) => {
        throw error;
    })
}