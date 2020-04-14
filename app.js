const submit = document.getElementById("form");
const table = document.querySelector("tbody");
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
  addEmployes();
});

function addEmployes() {
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

  for (let employe of employes) {
    const rows = `
        <tr>
            <td>${employe.mat}</td>
            <td>${employe.nom}</td>
            <td>${employe.prenom}</td>
            <td>${employe.email}</td>
            <td>${employe.age}</td>
            <td>${employe.poste}</td>
            <td>${employe.tel}</td>
            <td>${employe.statut}</td>
            <td>${employe.pays}</td>
        </tr>`;

    table.insertAdjacentHTML("beforeend", rows);
  }
}
