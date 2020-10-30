function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  
  
  console.table(restaurantList);
  const div = document.createElement('div');
  div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(restaurantList[0])}<br /><br />`;
  $('body').append(div);

  const dataShape= restaurantList.reduce((collection, item, i) => {
    const findCat = collection.find((finditem) => finditem.label === item.category);

    if(!findCat){
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      findCat.y += 1;
    }
    return collection;
  }, []);
  list = restaurantList;
  return list;
}

/* const arrayOfTenItems = range(10);
const randomRestaurantsArray = arrayOfTenItems.map((item) => {

  console.table(randomRestaurantsArray);
  const div = document.createElement('div');
  div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurantsArray[0])}<br /><br />`;
  $('body').append(div);

  const dataShape= randomRestaurantsArray.reduce((collection, item, i) => {
    const findCat = collection.find((finditem) => finditem.label === item.category);

    if(!findCat){
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      findCat.y += 1;
    }
    return collection;
  }, []);

  console.table(dataShape);

  const div2 = document.createElement('div');
  const obj = {
    label: randomRestaurants[0].category,
    y: randomRestaurants.length
  };
  div2.innerHTML = `<h2>What we want</h2> <br /><h4>A category, how many things are in the category</h4><pre><code ="language-javascript">${JSON.stringify(obj)}<br /><br />`;

  $('body').append(div2);
})

window.onload = loadData; */

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Change This Title'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Change This Title',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: []} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});