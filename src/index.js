import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  collection,
  addDoc,
  getDocs,
  where,
  query,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4c2OycAAjcVGB6yBFOO64Exs8vo-94zY",
  authDomain: "n423-data-harrell.firebaseapp.com",
  projectId: "n423-data-harrell",
  storageBucket: "n423-data-harrell.appspot.com",
  messagingSenderId: "187657843004",
  appId: "1:187657843004:web:3cee58a9d206c7209a6e39",
  measurementId: "G-98FJJCDDW9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// var loginBtn = document.getElementById("login");
// var logoutBtn = document.getElementById("logout");
// var addUserBtn = document.getElementById("addUser");
// var getAllDataBtn = document.getElementById("getAllData");
// var getAllAlbumsBtn = document.getElementById("getAllAlbums");

// var getQueryButton = document.getElementById("getQueryButton");

// loginBtn.addEventListener("click", login);
// logoutBtn.addEventListener("click", logout);
// addUserBtn.addEventListener("click", addUserToDB);
// getAllDataBtn.addEventListener("click", getAllData);
// getAllAlbumsBtn.addEventListener("click", getAllAlbums);

// getQueryButton.addEventListener("click", queryData);

// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log("logged in", user);
//   } else {
//     console.log("no user");
//   }
// });

// function addUserToDB() {
//   let fn = document.getElementById("fName").value.toLowerCase();
//   let ln = document.getElementById("lName").value.toLowerCase();
//   let em = document.getElementById("email").value.toLowerCase();
//   let pw = document.getElementById("pw").value.toLowerCase();

//   let person = {
//     firstName: fn,
//     lastName: ln,
//     email: em,
//     password: pw,
//   };

//   addData(person);
// }

// async function addData(person) {
//   try {
//     const docRef = await addDoc(collection(db, "People"), person);

//     console.log("Doc id: ", docRef.id);
//     document.getElementById("fName").value = "";
//     document.getElementById("lName").value = "";
//     document.getElementById("email").value = "";
//     document.getElementById("pw").value = "";
//   } catch (e) {
//     console.log(e);
//   }
// }
// async function getUser(userId) {
//   const docRef = doc(db, "People", userId);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     let user = docSnap.data();
//     $("#userData").html(
//       `<input class="name" type="text" id="userFN" value="${user.firstName}" disabled />`
//     );
//   } else {
//     console.log("no document exists");
//   }
// }
// function addUserEditBtnListener() {
//   $("#allData button").on("click", (e) => {
//     console.log(e.currentTarget.id);
//     getUser(e.currentTarget.id);
//   });
// }

// async function getAllData() {
//   document.getElementById("allData").innerHTML = "";
//   const querySnapshot = await getDocs(collection(db, "People"));
//   let htmlString = "";
//   querySnapshot.forEach((doc) => {
//     htmlString += `<div>
//         <p class="name">${doc.data().firstName}</p>
//         <p class="name">${doc.data().lastName}</p>
//         <p class="name">${doc.data().email}</p>
//         <button id="${doc.id}">Get User</button>
//         </div>`;
//   });
//   document.getElementById("allData").innerHTML = htmlString;

//   addUserEditBtnListener();
// }

// async function queryData() {
//   let searchName = $("#query-input").val();
//   const q = query(
//     collection(db, "People"),
//     where("firstName", "==", searchName)
//   );
//   const querySnapshot = await getDocs(q);
//   console.log("query ", querySnapshot.docs);
//   if (querySnapshot.docs.length > 0) {
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//     });
//   } else {
//     console.log("no data");
//   }
// }

// function login() {
//   signInAnonymously(auth)
//     .then(() => {
//       console.log("signed in");
//     })
//     .catch((error) => {
//       console.log(error.code);
//     });
// }

// function logout() {
//   signOut(auth)
//     .then(() => {
//       console.log("signed out");
//     })
//     .catch((error) => {
//       console.log(error.code);
//     });
// }
var getAllSongs = document.getElementById("allSongs");
var getFolkPopAlbums = document.getElementById("folk-pop");
var getPopRockAlbums = document.getElementById("pop-rock");
var getCountryAlbums = document.getElementById("country");

var getSearchBtn = document.getElementById("searchBtn");

getAllSongs.addEventListener("click", getAllAlbums);
getFolkPopAlbums.addEventListener("click", getAllFolkPop);
getPopRockAlbums.addEventListener("click", getAllPopRock);
getCountryAlbums.addEventListener("click", getAllCountry);

getSearchBtn.addEventListener("click", searchForAlbum);

async function getAllAlbums() {
  console.log("getting all songs");
  document.getElementById("allAlbums").innerHTML = "";
  document.getElementById("albumType").innerHTML = "All Genres";
  try {
    const querySnapshot = await getDocs(collection(db, "Albums"));
    let htmlString = "";
    querySnapshot.forEach((doc) => {
      htmlString += `
          <div class="albumBox" id="${doc.id}">
                    <img src="img/${doc.data().albumPhoto}" alt="${
        doc.data().albumName
      }">
                    <div class="overlay">
                        <h2>${doc.data().albumName}</h2>
                        <h3>${doc.data().artistName}</h3>
                        <p>Genre: ${doc.data().genre}</p>
                    </div>
                </div>
          
          `;
    });
    document.getElementById("allAlbums").innerHTML = htmlString;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getAllFolkPop() {
  let searchName = $("#folk-pop").html();

  document.getElementById("allAlbums").innerHTML = "";
  document.getElementById("albumType").innerHTML = "Folk-Pop";

  const q = query(collection(db, "Albums"), where("genre", "==", searchName));
  const querySnapshot = await getDocs(q);
  console.log("query ", querySnapshot.docs);
  if (querySnapshot.docs.length > 0) {
    let htmlString = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      htmlString += `
          <div class="albumBox" id="${doc.id}">
                    <img src="img/${doc.data().albumPhoto}" alt="${
        doc.data().albumName
      }">
                    <div class="overlay">
                        <h2>${doc.data().albumName}</h2>
                        <h3>${doc.data().artistName}</h3>
                        <p>Genre: ${doc.data().genre}</p>
                    </div>
                </div>
          
          `;
    });
    document.getElementById("allAlbums").innerHTML = htmlString;
  } else {
    console.log("no data");
  }
}

async function getAllPopRock() {
  let searchName = $("#pop-rock").html();

  document.getElementById("allAlbums").innerHTML = "";
  document.getElementById("albumType").innerHTML = "Pop-Rock";

  const q = query(collection(db, "Albums"), where("genre", "==", searchName));
  const querySnapshot = await getDocs(q);
  console.log("query ", querySnapshot.docs);
  if (querySnapshot.docs.length > 0) {
    let htmlString = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      htmlString += `
          <div class="albumBox" id="${doc.id}">
                    <img src="img/${doc.data().albumPhoto}" alt="${
        doc.data().albumName
      }">
                    <div class="overlay">
                        <h2>${doc.data().albumName}</h2>
                        <h3>${doc.data().artistName}</h3>
                        <p>Genre: ${doc.data().genre}</p>
                    </div>
                </div>
          
          `;
    });
    document.getElementById("allAlbums").innerHTML = htmlString;
  } else {
    console.log("no data");
  }
}

async function getAllCountry() {
  let searchName = $("#country").html();

  document.getElementById("allAlbums").innerHTML = "";
  document.getElementById("albumType").innerHTML = "Country";

  const q = query(collection(db, "Albums"), where("genre", "==", searchName));
  const querySnapshot = await getDocs(q);
  console.log("query ", querySnapshot.docs);
  if (querySnapshot.docs.length > 0) {
    let htmlString = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      htmlString += `
          <div class="albumBox" id="${doc.id}">
                    <img src="img/${doc.data().albumPhoto}" alt="${
        doc.data().albumName
      }">
                    <div class="overlay">
                        <h2>${doc.data().albumName}</h2>
                        <h3>${doc.data().artistName}</h3>
                        <p>Genre: ${doc.data().genre}</p>
                    </div>
                </div>
          
          `;
    });
    document.getElementById("allAlbums").innerHTML = htmlString;
  } else {
    console.log("no data");
  }
}

async function searchForAlbum() {
  let searchName = $("#album-input").val();
  document.getElementById("allAlbums").innerHTML = "";
  document.getElementById("albumType").innerHTML = searchName;
  const q = query(
    collection(db, "Albums"),
    where("albumName", "==", searchName)
  );
  const querySnapshot = await getDocs(q);
  console.log("query ", querySnapshot.docs);
  if (querySnapshot.docs.length > 0) {
    let htmlString = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      htmlString += `
          <div class="albumBox" id="${doc.id}">
                    <img src="img/${doc.data().albumPhoto}" alt="${
        doc.data().albumName
      }">
                    <div class="overlay">
                        <h2>${doc.data().albumName}</h2>
                        <h3>${doc.data().artistName}</h3>
                        <p>Genre: ${doc.data().genre}</p>
                    </div>
                </div>
          
          `;
    });
    document.getElementById("allAlbums").innerHTML = htmlString;
  } else {
    console.log("no data");
  }
  $("#album-input").val("");
}

$(document).ready(function () {
  getAllAlbums();
});
