const submit = document.getElementById("form");
const table = document.querySelector("tbody");
const updateBtn = document.querySelector(".update-btn");
const addBtn = document.querySelector(".add-btn");
const employes = [];

let mat = document.getElementById("mat");
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let email = document.getElementById("email");
let age = document.getElementById("age");
let poste = document.getElementById("poste");
let tel = document.getElementById("tel");
let statut = document.getElementById("statut");
let pays = document.getElementById("pays");

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  addEmployesAndValidate();
});

function addEmployesAndValidate() {
  const inputs = document.querySelectorAll("input");
  if (!mat.value) {
    inputs[0].classList.add("error");
  }
  if (!nom.value) {
    inputs[1].classList.add("error");
  }
  if (!prenom.value) {
    inputs[2].classList.add("error");
  }
  if (!email.value) {
    inputs[3].classList.add("error");
  }
  if (!age.value) {
    inputs[4].classList.add("error");
  }
  if (!poste.value) {
    inputs[5].classList.add("error");
  }
  if (!tel.value) {
    inputs[6].classList.add("error");
  }
  if (!statut.value) {
    inputs[7].classList.add("error");
  }
  if (!pays.value) {
    inputs[8].classList.add("error");
  }

  if (
    mat.value.length &&
    nom.value.length &&
    prenom.value.length &&
    email.value.length &&
    age.value.length &&
    poste.value.length &&
    tel.value.length &&
    statut.value.length &&
    pays.value.length
  ) {
    inputs[0].classList.remove("error");
    inputs[1].classList.remove("error");
    inputs[2].classList.remove("error");
    inputs[3].classList.remove("error");
    inputs[4].classList.remove("error");
    inputs[5].classList.remove("error");
    inputs[6].classList.remove("error");
    inputs[7].classList.remove("error");
    inputs[8].classList.remove("error");

    const obj = {
      mat: mat.value,
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      age: age.value,
      poste: poste.value,
      tel: tel.value,
      statut: statut.value,
      pays: pays.value,
    };
    employes.push(obj);

    mat.value = "";
    prenom.value = "";
    nom.value = "";
    email.value = "";
    age.value = "";
    poste.value = "";
    tel.value = "";
    statut.value = "";
    pays.value = "";

    table.innerHTML = "";
    insertEmploye();
  }
}

function insertEmploye() {
  for (let employe of employes) {
    const tr = document.createElement("tr");
    tr.setAttribute("id", `${employe.mat}`);
    tr.innerHTML += `
            <td>${employe.mat}</td>
            <td>${employe.nom}</td>
            <td>${employe.prenom}</td>
            <td>${employe.email}</td>
            <td>${employe.age}</td>
            <td>${employe.poste}</td>
            <td>${employe.tel}</td>
            <td>${employe.statut}</td>
            <td>${employe.pays}</td>
            <td>
              <button class="btn btn-primary" onClick="updateEmploye(${employe.mat})">modifier</button> 
              <button class="btn btn-primary" onClick="deleteEmploye(${employe.mat})">supprimer</button>
            </td>`;
    table.append(tr);
  }
}

function deleteEmploye(_mat) {
  employes.map((employe) => {
    const message = confirm("Voulez vous vraiment supprimer?");
    if (message) {
      if (employe.mat == _mat) {
        let index = employes.findIndex((employe) => employe.mat === _mat);
        const removeTr = document.getElementById(_mat);
        removeTr.parentNode.removeChild(removeTr);
        employes.splice(index, 1);
      }
    } else {
      return;
    }
  });
}

function updateEmploye(_mat) {
  employes.map((employe) => {
    if (employe.mat == _mat) {
      mat.value = employe.mat;
      nom.value = employe.nom;
      prenom.value = employe.prenom;
      email.value = employe.email;
      age.value = employe.age;
      poste.value = employe.poste;
      tel.value = employe.tel;
      statut.value = employe.statut;
      pays.value = employe.pays;
    }
    addBtn.style.display = "none";
    updateBtn.style.display = "block";
  });
}

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let index = employes.findIndex((employe) => employe.mat === mat.value);
  employes.splice(index, 1, {
    mat: mat.value,
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    age: age.value,
    poste: poste.value,
    tel: tel.value,
    statut: statut.value,
    pays: pays.value,
  });

  table.innerText = "";

  insertEmploye();

  addBtn.style.display = "block";
  updateBtn.style.display = "none";

  mat.value = "";
  nom.value = "";
  prenom.value = "";
  email.value = "";
  age.value = "";
  poste.value = "";
  tel.value = "";
  statut.value = "";
  pays.value = "";
});
