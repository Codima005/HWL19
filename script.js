const universes = [
  {
    name: "Marvel",
  },
  {
    name: "DC",
  },
  {
    name: "Comix Zone",
  },
];

const heroesform = document.querySelector(`#heroesForm`);
const heroesFormName = document.querySelector(`#heroesFormName`);
const heroesFormComics = document.querySelector(`#heroesFormComics`);
const heroFavouriteInput = document.querySelector(
  `.heroFavouriteInput > input`
);

const getAvaliableComics = () => {
  let comics = [];
  universes.map((universe) => comics.push(universe.name));

  return comics;
};

heroesFormComics.innerHTML = getAvaliableComics().map(
  (comics) => `<option value="${comics}">${comics}</option>`
);

let createTR = (hr) => {
  let tr = document.createElement(`tr`);
  tbody.append(tr);

  let heroBtnDel = document.createElement(`button`);
  heroBtnDel.innerHTML = `Delete`;
  let tdDel = document.createElement(`td`);
  tdDel.classList.add(`#heroDelBut`);
  tdDel.append(heroBtnDel);

  heroBtnDel.addEventListener(`click`, (e) => {
    let storage = localStorage.getItem(`heroes`)
      ? JSON.parse(localStorage.getItem(`heroes`))
      : [];
    let heroInStorage = storage.findIndex((item) => item.name === hr.name);
    console.log(heroInStorage);
    storage.splice(heroInStorage, 1);
    localStorage.setItem(`heroes`, JSON.stringify(storage));

    tr.remove();
  });

  let heroBtnFav = document.createElement(`input`);
  heroBtnFav.type = `checkbox`;
  heroBtnFav.checked = hr.favorite;

  heroBtnFav.addEventListener(`click`, ({ currentTarget: { checked } }) => {
    let storage = localStorage.getItem(`heroes`)
      ? JSON.parse(localStorage.getItem(`heroes`))
      : [];

    let heroInd = storage.find((item) => {
      return item.name === hr.name;
    });

    heroInd.favorite = checked;
    localStorage.setItem(`heroes`, JSON.stringify(storage));
    console.log(heroInd);
  });

  let favLb = document.createElement(`label`);
  favLb.classList.add(`heroFavouriteInput`);
  favLb.textContent = `Favorite`;
  favLb.append(heroBtnFav);
  let tdFav = document.createElement(`td`);
  tdFav.append(favLb);

  let heroone = `<td>${hr.name}</td>
            <td>${hr.comics}</td>`;
  tr.innerHTML = heroone;

  tr.append(tdFav);
  tr.append(tdDel);

  return tr;
};

heroesform.addEventListener(`submit`, (e) => {
  e.preventDefault();

  let name = heroesFormName.value;
  let comics = heroesFormComics.value;
  let favorite = heroFavouriteInput.checked ? true : false;

  let hero = {
    name,
    comics,
    favorite,
  };

  let storage = localStorage.getItem(`heroes`)
    ? JSON.parse(localStorage.getItem(`heroes`))
    : [];

  let HeroExist = storage.find((item) => {
    return item.name === hero.name;
  });

  if (!HeroExist) {
    storage.push(hero);
    localStorage.setItem(`heroes`, JSON.stringify(storage));

    createTR(hero);
  } else alert(`heero already existed`);
});

let table = document.createElement(`table`);
table.className = `heroes__table`;
table.id = `heroesTable`;

let thead = `<caption> HEROES </caption>
	<thead>
		<tr>
			<th>Name Surname</th>
			<th>Comics</th>
      <th>Favourite</th>
      <th>Actions</th>
		</tr>
	</thead>`;

table.innerHTML = thead;

let body = document.querySelector(`body`);
body.append(table);

let tbody = document.createElement(`tbody`);

table.append(tbody);

let HeroInfo = localStorage.getItem(`heroes`)
  ? JSON.parse(localStorage.getItem(`heroes`))
  : [];

HeroInfo.forEach((hero) => {
  createTR(hero);
});
