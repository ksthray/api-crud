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
  addEmployesAndValidate();
});

function addEmployesAndValidate() {
  const inputs = document.querySelectorAll("input");
  if (!mat.value) {
    inputs[0].style.borderBottom = "1px solid red";
  }
  if (!nom.value) {
    inputs[1].style.borderBottom = "1px solid red";
  }
  if (!prenom.value) {
    inputs[2].style.borderBottom = "1px solid red";
  }
  if (!email.value) {
    inputs[3].style.borderBottom = "1px solid red";
  }
  if (!age.value) {
    inputs[4].style.borderBottom = "1px solid red";
  }
  if (!poste.value) {
    inputs[5].style.borderBottom = "1px solid red";
  }
  if (!tel.value) {
    inputs[6].style.borderBottom = "1px solid red";
  }
  if (!statut.value) {
    inputs[7].style.borderBottom = "1px solid red";
  }
  if (!pays.value) {
    inputs[8].style.borderBottom = "1px solid red";
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
    inputs[0].style.border = "";
    inputs[1].style.border = "";
    inputs[2].style.border = "";
    inputs[3].style.border = "";
    inputs[4].style.border = "";
    inputs[5].style.border = "";
    inputs[6].style.border = "";
    inputs[7].style.border = "";
    inputs[8].style.border = "";
    console.log(inputs[3]);

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
}
