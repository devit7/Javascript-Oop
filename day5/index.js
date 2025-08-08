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

const formRegister = document.getElementById("formRegister");
const formLogin = document.getElementById("formLogin");
const formChall = document.getElementById("formChall");
const makeAdmin = document.getElementById("makeAdmin");
const challUi = document.getElementById("challUi");
const idLogout = document.getElementById("idLogout");

let isChallEdit = false;
let idChallEdit;

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
    let isValid;
    try {
      isValid = platform.authLogin({
        username: inputLoginUsername.value,
        password: inputLoginPassword.value,
      });
      //console.log(platform.getAllParticipantList());
    } catch (e) {
      console.error("Error ", e);
    } finally {
      console.log(isValid.role);

      if (isValid.role == "admin") {
        return (window.location.href = "/dashboard");
      }
      window.location.href = "/home";
    }
  });
} else {
  console.log("Form login not found");
}

function makeChallenge(val) {
  if (formChall) {
    formChall.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputChallTitle = document.getElementById("inputChallTitle");
      const inputChallDesc = document.getElementById("inputChallDesc");
      const inputChallFlag = document.getElementById("inputChallFlag");
      const inputChallPoint = document.getElementById("inputChallPoint");

      if (isChallEdit) {
        updateChallenge({
          id: idChallEdit,
          title: inputChallTitle.value,
          description: inputChallDesc.value,
          flag: inputChallFlag.value,
          point: parseInt(inputChallPoint.value),
          adminId: val.id,
        });
        clearFormChallenge();
        window.location.href = "/dashboard";
      } else {
        try {
          platform.addChallenge({
            adminId: val.id,
            title: inputChallTitle.value,
            description: inputChallDesc.value,
            flag: inputChallFlag.value,
            point: inputChallPoint.value,
          });
        } catch (e) {
          console.error(e);
        } finally {
          showChallengeTable();
        }
      }
    });
  }
}

function showChallFormUI() {
  let dataChall = JSON.parse(localStorage.getItem("ls-listChall"));
  let dataParticipant = JSON.parse(localStorage.getItem("auth-user"));
  let ls_listSubmitSuccessFull = JSON.parse(
    localStorage.getItem("ls-listSubmitSuccessFull")
  )||[];
  if (challUi) {
    dataChall.forEach((item, index) => {
      // ambil data yang sesuai dengan id chall
      let submissions = ls_listSubmitSuccessFull.filter(
        (sub) => sub.chall_id == item.id
      );
      let submissionHTML = "";
      if (submissions.length > 0) {
        submissions.forEach((sub) => {
          submissionHTML += `<div class="p-1 text-sm">> ${sub.username} </div>`;
        });
      }
      const formId = `submitForm-${index}`;
      challUi.innerHTML += `<form id="${formId}" class="border">
      <h1 class="p-2 text-2xl">${item.title}</h1>
        <div class="p-2 border-y">
        ${item.description}
        <div class="text-sm bg-gray-300 w-fit px-1">
          Point : ${item.point}
        </div>
        </div>
        <div class="p-2">  
          <input id="participantId-${index}" hidden type="text" value="${dataParticipant.id}" />
          <input id="challId-${index}" hidden type="text" value="${item.id}" />
          <input id="flagInput-${index}" class="border" type="text" value="" />
          <button type="submit" class="border px-4">Submit</button>
        </div>
        <div class="flex flex-col border-t max-h-[200px] overflow-auto//">
        User Solved:
        ${submissionHTML}
        </div>
      </form>`;
    });

    dataChall.forEach((item, index) => {
      const form = document.getElementById(`submitForm-${index}`);
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const flagInput = document.getElementById(`flagInput-${index}`);
          const participantId = document.getElementById(
            `participantId-${index}`
          );
          const challId = document.getElementById(`challId-${index}`);

          console.log("Flag:", flagInput.value);
          console.log("Participant ID:", participantId.value);
          console.log("Challenge ID:", challId.value);

          platform.submitChall({
            challId: challId.value,
            flag: flagInput.value,
            participantId: participantId.value,
          });
        });
      }
    });
  }
}

function showLeaderBoardUI() {
  const showListLeaderboard = document.getElementById("showListLeaderboard");
  let dataLeaderboard =
    JSON.parse(localStorage.getItem("ls-leaderboardList")) || [];
  dataLeaderboard.forEach((item) => {
    showListLeaderboard.innerHTML += `
        <div>
              ${JSON.stringify(item)}
        </div>
      `;
  });
}

function showChallengeTable() {
  let dataChall = JSON.parse(localStorage.getItem("ls-listChall")) || [];
  const challTableBody = document.getElementById("challTableBody");

  if (challTableBody) {
    challTableBody.innerHTML = "";

    dataChall.forEach((item, index) => {
      const row = `
        <tr key="${index}" class="border-b hover:bg-gray-50">
          <td class="p-2">${item.id}</td>
          <td class="p-2">${item.title}</td>
          <td class="p-2">${item.point}</td>
          <td class="p-2">
            <button id="edit-${
              index + item.id
            }" class="text-white p-1 rounded-sm cursor-pointer text-xs bg-blue-500" >Edit</button>
            <button id="${
              index + item.id
            }" class="text-white p-1 rounded-sm cursor-pointer text-xs bg-red-500" >Delete</button>
          </td>
        </tr>
      `;
      challTableBody.innerHTML += row;
      const idDelete = document.getElementById(`${index + item.id}`);
      const idEdit = document.getElementById(`edit-${index + item.id}`);
      idDelete.addEventListener("click", (e) => {
        e.preventDefault();
        deleteChallenge(item.id);
      });
      idEdit.addEventListener("click", (e) => {
        e.preventDefault();
        editChallenge(item);
      });
    });
  }
}

function clearFormChallenge() {
  const inputChallTitle = document.getElementById("inputChallTitle");
  const inputChallDesc = document.getElementById("inputChallDesc");
  const inputChallFlag = document.getElementById("inputChallFlag");
  const inputChallPoint = document.getElementById("inputChallPoint");

  inputChallTitle.value = "";
  inputChallDesc.value = "";
  inputChallFlag.value = "";
  inputChallPoint.value = "";
}

function editChallenge(item) {
  isChallEdit = true;
  idChallEdit = item.id;

  const titleFormChall = document.getElementById("titleFormChall");
  const submitFormChall = document.getElementById("submitFormChall");
  const inputChallTitle = document.getElementById("inputChallTitle");
  const inputChallDesc = document.getElementById("inputChallDesc");
  const inputChallFlag = document.getElementById("inputChallFlag");
  const inputChallPoint = document.getElementById("inputChallPoint");

  titleFormChall.innerText = `Edit Chall ID: ${item.id}`;
  submitFormChall.innerText = "Edit";
  inputChallTitle.value = item.title;
  inputChallDesc.value = item.description;
  inputChallFlag.value = item.flag;
  inputChallPoint.value = item.point;
}

function updateChallenge(updatedChall) {
  let dataChall = JSON.parse(localStorage.getItem("ls-listChall")) || [];

  const index = dataChall.findIndex((chall) => chall.id === updatedChall.id);
  if (index !== -1) {
    dataChall[index] = {
      ...dataChall[index],
      title: updatedChall.title,
      description: updatedChall.description,
      flag: updatedChall.flag,
      point: updatedChall.point,
    };

    localStorage.setItem("ls-listChall", JSON.stringify(dataChall));
    console.log("Challenge updated successfully");
  } else {
    console.error("Challenge not found for update");
  }
}

function deleteChallenge(challId) {
  let dataChall = JSON.parse(localStorage.getItem("ls-listChall")) || [];
  dataChall = dataChall.filter((chall) => chall.id !== challId);
  console.log(dataChall);
  localStorage.setItem("ls-listChall", JSON.stringify(dataChall));
  showChallengeTable();
}

// home
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname == "/home") {
    authInnerText();
    showChallFormUI();
    showLeaderBoardUI();
  }

  if (window.location.pathname == "/dashboard") {
    let dataAdmin = isAdmin();
    authInnerText();
    makeChallenge(dataAdmin);
    showChallengeTable();
  }
});

function isAdmin() {
  let isAuth = JSON.parse(localStorage.getItem("auth-user"));

  if (!isAuth) {
    //if null ?
    window.location.href = "/login";
    return;
  }

  if (isAuth.role !== "admin") {
    console.log("you not an admin");
    window.location.href = "/home";
  }

  return isAuth;
}

if (makeAdmin) {
  makeAdmin.addEventListener("click", (e) => {
    e.preventDefault();
    platform.addAdmin({
      name: "Admin Pusat",
      username: "admin_pusat",
      email: "adminpusat@gmail.com",
      password: "12345678",
    });
  });
}

function authInnerText() {
  let data = JSON.parse(localStorage.getItem("auth-user"));
  let loginStatus = document.getElementById("isLogin");
  if (loginStatus && data) {
    loginStatus.innerText = `AUTH : ${data.name}`;
  }
}

if (idLogout) {
  idLogout.addEventListener("click", () => {
    localStorage.removeItem("auth-user");
    window.location.href = "/login";
  });
}
