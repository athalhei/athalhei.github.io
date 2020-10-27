// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(math.random() * 100 + 1);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

function myFunction() {
  const countries = [];
  countries = range(10);
  sortFunction(countries);
  return countries;
}



document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      var countryList = document.createElement("ol");
      countryList.className = 'flex-inner';
      document.getElementById('ee').prepend(countryList);
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});