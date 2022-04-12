/* API: https://digimon-api.vercel.app/ */
const btn = document.querySelector("#getDigi");
const digiName = document.querySelector("h2");
const level = document.querySelector("span");
const digiPicture = document.querySelector("img");
const randomDigi = document.querySelector("#random");
const mainURL = 'https://digimon-api.vercel.app/api/digimon';

btn.addEventListener("click", masterControl);
randomDigi.addEventListener("click", getRandoMambo);

// if it is a valid name with a space fix it and continue with getFetch, or if there is nothing in the input then go for inCaseOfMistakes
function masterControl() {
  const name = document.querySelector("input").value.toLowerCase();
  if (name == '') {
    inCaseOfMistakes();
  } else if (name.search(' ') !== '1') {
    fixName(name);
  } else {
    getFetch(name)
  }
}

// in case there is a space in a valid name
function fixName(wrd) {
  let arr = wrd.split(' ');
  return getFetch(arr.filter(item => item !== ' ').join(''));
}

// with correct input
function getFetch(name) {   
  const url = `https://digimon-api.vercel.app/api/digimon/name/${name}`;
console.log(url)
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      digiName.textContent = data[0]["name"];
      level.textContent = data[0]["level"];
      digiPicture.src = data[0]["img"];
      digiPicture.alt = `Image of ${name}`;
    })
    .catch((err) => {
    lookup(mainURL, name);
      console.log(`error ${err}`);
    });
}

// if the random button is clicked
function getRandoMambo() {
  const random = Math.floor(Math.random() * 209);

  fetch(mainURL)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      digiName.textContent = data[random]["name"];
      level.textContent = data[random]["level"];
      digiPicture.src = data[random]["img"];
      digiPicture.alt = `Image of ${data[random]["name"]}`;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// if there is nothing on the input and the button gets clicked
function inCaseOfMistakes() {
    digiName.textContent = `That wasn't a digimon so here's a dog`;
    digiPicture.src = 'https://picsum.photos/id/237/200/300';
    level.textContent = 'ultimate, yes, ultimate'
}

// if an invalid name was on the input
function lookup(arr, name) {
  let str = name.split('');
  let rearranged = str[0].toUpperCase() + str.slice(1).join('');
  let bul = true;
  for (let i = 0; i < arr.length; i++) {
    if (name !== arr[i][0]) {
      bul = false;
    }
  }
  return !(bul) ? inCaseOfMistakes() : console.log('it was real');
}
