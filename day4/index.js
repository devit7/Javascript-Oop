import CTFPlatform from "./oop/ctfplatform.js";

const platform = new CTFPlatform("IHC-London");

// platform.addAdmin({
//   name: "Admin Pusat",
//   username: "admin_pusat",
//   email: "adminpusat@gmail.com",
//   password: "12345678",
// });

// platform.addChallenge({
//   title: "SQLI",
//   description: "Flag terselubung pada https://example",
//   flag: "FLAG{123}",
//   point: 200,
//   adminId: 1,
// });

// console.log(platform.getAllAdminList());
// console.log(platform.getAllParticipantList());
// console.log(platform.getAllChallenge());

// console.log("=== Submit Chall ===");
// platform.submitChall("FLAG{123}", 3, 2);

// console.log("=== Succesfull Submit ===");
// console.log(platform.listSubmitSuccessFull);

// platform.addReview({
//   challId: 3,
//   participantId: 2,
//   title: "Nice Chall",
//   description: "I solve this with sqlmap",
//   rating: 10,
// });

// console.log("=== Check Review Chall ===");
// console.log(platform.getReviewChall({ challId: 3 }));

const formRegister = document.getElementById("formRegister");
const formLogin = document.getElementById("formLogin");

if (formRegister) {
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputEmail = document.getElementById("inputEmail");
    const inputName = document.getElementById("inputName");
    const inputUsername = document.getElementById("inputUsername");
    const inputPassword = document.getElementById("inputPassword");
    const inputCampus = document.getElementById("inputCampus");

    try {
      platform.registerParticipant({
        name: inputName.value,
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value,
        campus: inputCampus.value,
      });

      console.log(platform.getAllParticipantList());
    } catch (e) {
      console.error("Error ", e);
    } finally {
      window.location.href = "/login";
    }
  });
} else {
  console.log("Form register not found");
}

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputLoginUsername = document.getElementById("inputLoginUsername");
    const inputLoginPassword = document.getElementById("inputLoginPassword");

    try {
      platform.authLogin({
        username: inputLoginUsername.value,
        password: inputLoginPassword.value,
      });
      console.log(platform.getAllParticipantList());
    } catch (e) {
      console.error("Error ", e);
    } finally {
      window.location.href = "/home";
    }
  });
} else {
  console.log("Form not found");
}

//window.addEventListener("load",()=>{
/*   console.log("loaded") */
if (window.location.pathname == "/home") {
  let loginStatus = document.getElementById("isLogin");
  loginStatus.innerText = `AUTH : ${data.name}`;
  console.log("halaman home");
} else {
  console.log("Dwad");
}
//})
