let listArr = [];

const addbtn = document.getElementById('#addBtn');

const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '17a5369cc5mshb97d539e3024166p1308bajsn3ec30dac136c',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

async function loadMovie() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

function displayMovie() {
    loadMovie().then(data => {
        const list = data;
    
        i = 0;
    
        data.map((item) => {
    
            if(i < 10) {
                const name = item.title;
                const image = item.image;
                const id = item.id;
                const movie = `
                    <div class="col"> 
                        <div class="card" id="${id}">
                            <img src="${image}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="btn btn-primary" id="addBtn" onclick="addMovie()">Add to Watchlist</p>
                            </div>
                        </div>
                    </div>`;
                document.querySelector('#movies').innerHTML += movie;
                i++;
            } else {
                return;
            }
        })
    })
}

function displayWatch() {
    if(listArr.length == 0) {
        document.getElementById("noMovie").innerHTML =
        '<h3 style="text-align: center">There are Currently No Movies in your Watchlist</h3>';

        document.getElementById("table-div").style.display = 'none'

        return;
    }
    
    document.getElementById("table-div").style.display = 'block'

    loadMovie().then(data => {
        const list = data;
        console.log(list);
        console.log(listArr);

        list.forEach(item => {
            let foundItem = listArr.find(obj => obj.no == item.id);
            console.log(foundItem);

            if(foundItem) {
                const markup = `
                <tr style="background-color: #c1abd2">
                    <td style="background-color: #c1abd2; border-bottom: #c1abd2;">${item.title}</td>
                    <td style="background-color: #c1abd2; border-bottom: #c1abd2;" id="${item.id}stats">${foundItem.status}</td>
                    <td style="background-color: #c1abd2; border-bottom: #c1abd2;"><p class="btn btn-success" 
                    id="${item.id}" onclick="changeStatus()">Change Status</p></td>
                    <td style="background-color: #c1abd2; border-bottom: #c1abd2;"><p class="btn btn-danger" 
                    id="${item.id}" onclick="deleteItem()">Delete</p></td>
                </tr>`;
    
                document.querySelector('#addedMovie').innerHTML += markup;
            }
        })
    });
}

function addMovie() {
    const id = event.target.parentElement.parentElement.id;

    if(listArr.includes(id)) {
        return;
    }

    const movie = {no: id, status: "Not Watched"};

    listArr.push(movie);
    console.log(listArr);
    setStorage();
}

function changeStatus() {
    const id = event.target.id;
    let name = '#';
    name += id;
    name += 'stats';

    let status = document.querySelector(name).textContent;

    if(status == "Not Watched") {
        document.querySelector("#"+id+"stats").innerHTML = 'Watched';
        listArr.forEach(item => {
            if(item.no == id) {
                item.status = 'Watched';
            }
        })
    } else {
        document.querySelector("#"+id+"stats").innerHTML = 'Not Watched';
        listArr.forEach(item => {
            if(item.no == id) {
                item.status = 'Not Watched';
            }
        })
    }

    setStorage();
}

function deleteItem() {
    const id = event.target.id;

    let row = event.target.parentElement.parentElement;
    row.remove();

    const newList = listArr.filter((item) => item.no !== id);
    console.log(newList);
    listArr = newList;
    setStorage();
}


// Local Storage

function setStorage() {
    localStorage.setItem('watchlist', JSON.stringify(listArr));
}

function getStorage() {
    const data = JSON.parse(localStorage.getItem('watchlist'));

    if(!data) {
        console.log("empty");
        return;
    }

    listArr = data;
}

function resetStorage() {
    localStorage.removeItem('watchlist');
    location.reload();
}


