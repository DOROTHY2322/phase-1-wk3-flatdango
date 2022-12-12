// Your code here
let url = 'http://localhost:3000/films'
const filmTime = document.getElementById('films')
document.addEventListener('DOMContentLoaded', ()=>{
    
    document.getElementsByClassName('film item')
    fetchMovies(url)

    // event handlers
function handleSubmit(e){
    e.preventDefault()
    let movieobj ={
        title:e.target.title.value,
        runtime:e.target.runtime.value,
        capacity:e.target.capacity.value,
        showtime:e.target.showtime.value,
        tickets_sold:e.target.tickets_sold.value,
        description:e.target.description.value,
        poster:e.target.posterurl.value
    }

renderMovie(movieobj)
addmovie(movieobj)
}
//DOM Render function
function renderMovie(movie){
    // add a movie
    let card = document.createElement('new')
    card.className ='card'
    card.textContent =`
    <img src="${movie.posterurl}">
    <div class ="content">
    <h4>${movie.name}</h4>
    <p> $<span class ="description">${movie.description}</span>
    </p>
    </div>
    <div class="button">
    <button> buy ticket </button>
    </div>

    `

}
//fetch data from server
function fetchMovies(url){
    fetch(url)
    .then(response => response.json())
    .then(movies => {
        movies.forEach(movie => {
            displayMovie(movie)
        });
    })
   
}
// post request
function addmovie(movieobj){
    
    fetch(url,{
        method:'POST',
        headers: {
            "content-Type":"application/json"
        },
        body:JSON.stringify(movieobj)
    })
    .then(response => response.json())
    .then(movie => console.log(movie))
}

// displaying the movies
function displayMovie(movie){
   
    const li = document.createElement('li')
    li.style.cursor="pointer"
    li.textContent= (movie.title).toUpperCase()
    filmTime.appendChild(li)
    addClickEvent()
}
// event listeners
function addClickEvent(){
    let children=filmTime.children
    // console.log(children)

    for(let i=0; i<children.length; i++){
        let child=children[i]
        // console.log(child)

        child.addEventListener('click',() => {
            fetch(`${url}/${i+1}`)

            .then(res => res.json())
            .then(movie => {
                document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                setUpMovieDetails(movie)
            })

        })
    }
}
// movies description
function setUpMovieDetails(childMovie){
    const preview = document.getElementById('poster')
    preview.src = childMovie.poster;

    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = childMovie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${childMovie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = childMovie.description;
    const showTime = document.querySelector('#showtime')
    showTime.textContent = childMovie.showtime;
    const tickets  = document.querySelector('#ticket-num')
    tickets.textContent = childMovie.capacity -childMovie.tickets_sold;
}
//number of tickets remaining
const btn = document.getElementById('buy-ticket')

        btn.addEventListener('click', function(e){
            let remTickets = document.querySelector('#ticket-num').textContent
            e.preventDefault()
            if(remTickets > 0){
                document.querySelector('#ticket-num').textContent  = remTickets-1
                
            }
            // change the button
            else if(parseInt(remTickets, 10)===0){
                btn.textContent = 'Sold Out'
            }
    })
})
