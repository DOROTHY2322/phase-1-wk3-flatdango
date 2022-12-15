// Define the url variable in the current scope
let url = 'https://phase-1-wk3-flatdango.vercel.app/project/db.json'
//get a reference to the list element
const listHolder = document.querySelector('.films ul');
//a reference to the movie poster
document.querySelector('#poster');

document.addEventListener('DOMContentLoaded', () => {

    
    fetchMovies(url)

})

    //Create fetch function
function fetchMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            //loop through the moviesand call the displaymovie()for each movie
            movies.films.forEach(movie => {
                displayMovie(movie)
            });
        })

}


function displayMovie(movie) {

    const li = document.createElement('li')
    li.style.cursor = "pointer"
    li.textContent = (movie.title).toUpperCase()
    listHolder.appendChild(li)
    //add a click event listener to the list item
    li.addEventListener('click',(event)=>{
        //update the movie poster element to display the clicked movies poster
        poster.src = movie.poster;
        //call the addclickevent() function to get the movie details
        addClickEvent(event)
    })
    
}

function addClickEvent(url){
    let children=listHolder.children
    // console.log(children)

    for(let i=0; i<children.length; i++){
        let child=children[i]
        // console.log(child)

        child.addEventListener('click',() => {
            
            fetch(`${'https://phase-1-wk3-flatdango.vercel.app/project/db.json'}/${i+1}`)
           

            .then(res => res.json())
            .then(movie => {
                document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                setUpMovieDetails(movie)
            })

        })
    }
}
addClickEvent(url)
function setUpMovieDetails(childMovie) {
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
    const tickets = document.querySelector('#ticket-num')
    tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}
const btn = document.getElementById('buy-ticket')

btn.addEventListener('click', function (e) {
    let remTickets = document.querySelector('#ticket-num').textContent
    e.preventDefault()
    if (remTickets > 0) {
        document.querySelector('#ticket-num').textContent = remTickets - 1

    }
    else if (parseInt(remTickets, 10) === 0) {
        btn.textContent = 'Sold Out'
    }
})

   


