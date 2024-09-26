// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz2cHQ0ho7CHt6eyyRueN-XkBgbl4Bas4",
    authDomain: "mos-evaluation.firebaseapp.com",
    projectId: "mos-evaluation",
    storageBucket: "mos-evaluation.appspot.com",
    messagingSenderId: "672620926047",
    appId: "1:672620926047:web:a755c5cd997de39e43b7ea",
    measurementId: "G-4320F2Z87L"
  };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const auth = firebase.auth();

// Register the user and save user info in Firestore
// function register() {
//     const name = document.getElementById('name').value;
//     const firstLanguage = document.getElementById('first-language').value;
//     const age = document.getElementById('age').value;
//     const sex = document.getElementById('sex').value;
//     const email = document.getElementById('email').value;

//     console.log("Register button clicked!");
//     console.log("Name: ", name);
//     console.log("First Language: ", firstLanguage);
//     console.log("Age: ", age);
//     console.log("Sex: ", sex);
//     console.log("Email: ", email);

//     if (name && firstLanguage && age && sex && email) {
//         auth.createUserWithEmailAndPassword(email, "default_password").then(userCredential => {
//             const user = userCredential.user;
//             // Save user info in Firestore
//             db.collection("users").doc(user.uid).set({
//                 name: name,
//                 firstLanguage: firstLanguage,
//                 age: age,
//                 sex: sex,
//                 email: email,
//                 registeredAt: new Date()
//             }).then(() => {
//                 document.getElementById('register-section').style.display = 'none';
//                 document.getElementById('evaluation-section').style.display = 'block';
//                 loadNextSample();
//             }).catch(error => {
//                 console.error("Error saving user info:", error);
//             });
//         }).catch(error => {
//             console.error("Error registering user:", error);
//         });
//     } else {
//         alert('Please fill in all fields');
//     }
// }

// Function to submit and save rating
function submitRating() {
    const feedback = document.getElementById('feedback').value;
    const rating = document.querySelector('input[name="mos"]:checked')?.value || 
                   document.querySelector('input[name="cmos"]:checked')?.value;
    
    if (!rating) {
        alert('Please select a rating');
        return;
    }

    const user = auth.currentUser;
    if (user) {
        let evaluationType;
        if (currentEvaluationType === 'MOS') {
            evaluationType = 'MOS';
        } else if (currentEvaluationType === 'CMOS') {
            evaluationType = 'CMOS';
        } else if (currentEvaluationType === 'SMOS-Timbre') {
            evaluationType = 'SMOS-Timbre';
        } else if (currentEvaluationType === 'SMOS-Accent') {
            evaluationType = 'SMOS-Accent';
        }

        db.collection("evaluations").add({
            userId: user.uid,
            evaluationType: evaluationType,
            sampleIndex: currentSampleIndex,
            rating: rating,
            feedback: feedback,
            timestamp: new Date()
        }).then(() => {
            currentSampleIndex++;
            loadNextSample();
        }).catch(error => {
            console.error("Error saving evaluation:", error);
        });
    } else {
        alert('User not logged in');
    }
}


