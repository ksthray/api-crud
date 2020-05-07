const submit = document.getElementById("form");
const table = document.querySelector("tbody");
const updateBtn = document.querySelector(".update-btn");
const addBtn = document.querySelector(".add-btn");
const search = document.getElementById("search");

let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let estMarie = document.getElementById("estMarie");
let pays = document.getElementById("pays");
let email = document.getElementById("email");
let poste = document.getElementById("poste");
let tel = document.getElementById("numeroTelephone");

function reloadPage() {
  history.go(0);
}
axios
  .get("https://restcountries.eu/rest/v2/all")
  .then((res) => initialiseCountries(res.data))
  .catch((error) => console.log(error));

function getSeletectValueCountries() {
  let result = pays.value;
}

let situation;

function getSeletectValueStatut() {
  if (estMarie.value === "Marié") {
    situation = true;
    console.log(situation);
  } else {
    situation = false;
    console.log(situation);
  }
}

function initialiseCountries(countriesData) {
  const countries = countriesData;
  let option = "";
  for (countrie of countries) {
    option += `<option>${countrie.name}</option>`;
  }
  pays.innerHTML = option;
}

let searchEmploye = [];

search.addEventListener("keyup", (e) => {
  const stockTab = searchEmploye[0].data;
  const searchString = e.target.value.toLowerCase();
  const filterCaracteres = stockTab.filter((caractere) => {
    return (
      caractere.nom.toLowerCase().includes(searchString) ||
      caractere.prenom.toLowerCase().includes(searchString)
    );
  });
  insertEmploye(filterCaracteres);
});

const getEmploye = async () => {
  try {
    let response = await Promise.all([
      axios.get("http://167.71.45.243:4000/api/employes?api_key=ozvcwxy"),
    ]);
    searchEmploye = response;
    insertEmploye(response[0].data);
  } catch (err) {
    console.log(err);
  }
};
getEmploye();

function insertEmploye(employes) {
  const travailleur = employes
    .map((employe) => {
      return `
      <tr>
      <td>${employe.nom}</td>
      <td>${employe.prenom}</td>
      <td>${employe.email}</td>
      <td>${employe.poste}</td>
      <td>${employe.numeroTelephone == undefined ? "" : employe.numeroTelephone}
      </td>
      <td>${employe.estMarie ? "Marié" : "celibataire"}</td>
      <td>${employe.pays}</td>
      <td>
        <button class="btn btn-primary bouton" id="edit-${
          employe._id
        }">modifier</button>
        <button class="btn btn-primary" id="deleted-${
          employe._id
        }">supprimer</button>
      </td>
      </tr>
    `;
    })
    .join("");
  table.innerHTML = travailleur;
  for (emp of employes) {
    deletedAndUpdate(emp);
  }
}

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  addEmployesAndValidate();
});

function addEmployesAndValidate() {
  const regexEmail = /^(([\-\w]+)\.?)+@(([\-\w]+)\.?)+\.[a-zA-Z]{2,4}$/;
  if (!nom.value) {
    nom.classList.add("error");
  }
  if (!prenom.value) {
    prenom.classList.add("error");
  }
  if (!estMarie.value) {
    estMarie.classList.add("error");
  }
  if (!regexEmail.test(email.value)) {
    email.classList.add("error");
  }
  if (!poste.value) {
    poste.classList.add("error");
  }
  if (!tel.value) {
    tel.classList.add("error");
  }
  if (!pays.value) {
    pays.classList.add("error");
  }

  if (
    nom.value.length &&
    prenom.value.length &&
    estMarie.value.length &&
    email.value.length &&
    poste.value.length &&
    tel.value.length
  ) {
    nom.classList.remove("error");
    prenom.classList.remove("error");
    estMarie.classList.remove("error");
    email.classList.remove("error");
    poste.classList.remove("error");

    getSeletectValueStatut();

    axios
      .post("http://167.71.45.243:4000/api/employes?api_key=ozvcwxy", {
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        poste: poste.value,
        numeroTelephone: tel.value,
        estMarie: situation,
        pays: pays.value,
      })
      .then((response) => {
        console.log(response);
        alert("L'employé ajouté avec succèss");
        reloadPage();
      })
      .catch((error) => {
        alert("Une erreure est survenue");
        console.log(error.response);
      });
  }
}
function deletedAndUpdate(employe) {
  const btnEdit = document.getElementById(`edit-${employe._id}`);
  const btnDelete = document.getElementById(`deleted-${employe._id}`);

  btnDelete.addEventListener("click", () => {
    if (
      confirm(
        `Êtes-vous sûr de supprimer l'employé ${employe.prenom} ${employe.nom} ?`
      )
    ) {
      deleteEmploye(employe);
    }
  });
  btnEdit.addEventListener("click", (e) => {
    e.stopPropagation();
    getSeletectValueStatut();
    nom.value = employe.nom;
    prenom.value = employe.prenom;
    email.value = employe.email;
    poste.value = employe.poste;
    tel.value = employe.numeroTelephone;
    estMarie.value == undefined ? situation : situation;
    pays.value = employe.pays;

    console.log(situation);
    addBtn.style.display = "none";
    updateBtn.style.display = "block";
    if (btnEdit) {
      updateBtn.addEventListener("click", () => {
        console.log(employe);
        const changeEmploye = {
          nom: nom.value,
          prenom: prenom.value,
          email: email.value,
          poste: poste.value,
          //tel: tel.value,
          estMarie: estMarie.value === "Marié" ? true : false,
          pays: pays.value,
        };
        console.log(changeEmploye.estMarie);
        updateEmploye(employe._id, changeEmploye);

        updateBtn.style.display = "none";
        addBtn.style.display = "block";

        nom.value = "";
        prenom.value = "";
        email.value = "";
        poste.value = "";
        tel.value = "";
        estMarie.value = "";
        pays.value = "";
      });
    }
  });
}

function deleteEmploye(employe) {
  axios
    .delete(
      `http://167.71.45.243:4000/api/employes/${employe._id}?api_key=ozvcwxy`
    )
    .then((response) => {
      alert("L'employé supprimé avec succèss");
      reloadPage();
    })
    .catch(function (error) {
      alert("Une erreure est survenue");
      console.log(error.response);
    });
}

function updateEmploye(id, employe) {
  axios
    .put(
      `http://167.71.45.243:4000/api/employes/${id}?api_key=ozvcwxy`,
      employe
    )
    .then((response) => {
      alert("L'employé modifié avec succèss");
      reloadPage();
    })
    .catch(function (error) {
      console.log("Une erreure est survenue");
      console.log(error.response);
    });
}
