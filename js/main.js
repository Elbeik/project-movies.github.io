/// <reference path="../typings/globals/jquery/index.d.ts" />

// side bar function 
let contientBar = $('#contientBar').innerWidth();
let toolsBar = $('#toolsBar').innerWidth();
let closeOpen = document.getElementById('closeOpen');
let sideBar = contientBar + toolsBar;
let sideNeg = sideBar-contientBar;
$('#contientBar').css('left', `-${contientBar}`);
$('#toolsBar').css('left', '0px');
$('#close').addClass('d-none')
let manuShowUp = document.getElementsByClassName('manuShowUp')
let menu = [...manuShowUp];
console.log(menu);
$('.closeOpen').click(function(){  

    if($('#contientBar').css('left') == '0px')
    {
        

        $('#contientBar').animate({'left': `-${contientBar}`}, 500);
        $('#toolsBar').animate({'left': `0px`}, 500, function(){

            
          
                $('.manuShowUp').eq(0).animate({'top':'120vh'},50, function(){
                    $('.manuShowUp').eq(1).animate({'top':'120vh'},50, function(){
                        $('.manuShowUp').eq(2).animate({'top':'120vh'},50, function(){
                            $('.manuShowUp').eq(3).animate({'top':'120vh'},50, function(){
                                $('.manuShowUp').eq(4).animate({'top':'120vh'},50, function(){
                                    $('.manuShowUp').eq(5).animate({'top':'120vh'},50)  
                                })  
                            })  
                        })  
                    })  
                }) 

            
            
        });
        
        closeOpen.innerHTML = '<span class="  fw-bolder" id="open">☰ </span>';
        
    }else{
        $('#contientBar').animate({'left': `0px`}, 500);
        $('#toolsBar').animate({'left': `${contientBar}`}, 500, function(){
            // for(let i = 0; i<menu.length; i++)
            // {
            //     $('.manuShowUp').eq(i).animate({'top':'0px'},500)  
            // }
             $('.manuShowUp').eq(0).animate({'top':'0px'},200, function(){
                    $('.manuShowUp').eq(1).animate({'top':'0px'},200, function(){
                        $('.manuShowUp').eq(2).animate({'top':'0px'},200, function(){
                            $('.manuShowUp').eq(3).animate({'top':'0px'},200, function(){
                                $('.manuShowUp').eq(4).animate({'top':'0px'},200, function(){
                                    $('.manuShowUp').eq(5).animate({'top':'0px'},200)  
                                })  
                            })  
                        })  
                    })  
                }) 
        });
        closeOpen.innerHTML = '<i class="fa fa-close " id="close"></i>';
        
        
    }
    
})



// fetch data with trending
let imgPoster = document.getElementsByClassName('imgPoster');
let titleName = document.getElementsByClassName('titleName');
let response;
let result;
let movie;
async function fetchTrending(){
    response = await fetch `https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2FCTpYW_vM-DFirH3VOpN4-_V4mzbZuBrJdEm_SuFxzQIuZ5TOz5LQWpc`
    result = await response.json();
    movie = [...result.results];
    // fetch `https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
    console.log(result)
    console.log(movie)
     showMovie()
}
fetchTrending()
// let top_rated;
async function showGeneral(e){
    let now = await fetch ('https://api.themoviedb.org/3/movie/'+e+'?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    let nowResult =  await now.json();
    movie = [...nowResult.results]
    console.log(movie)
    showMovie()
}

$('#topRated').click(function(){
    showGeneral('top_rated');
})
$('#nowPlaying').click(function(){
    showGeneral('now_playing');
})
$('#popular').click(function(){
    showGeneral('popular');
})
$('#trending').click(function(){
    fetchTrending();
})
$('#upcoming').click(function(){
    showGeneral('upcoming');
})




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Search

let moviesTitle = [];
let searchWord = document.getElementById('word');

$('#word').keyup(function (){
    let searchWordValue = searchWord.value;
    let temp = [];
    for (i=0;i<20;i++){
        if (moviesTitle[i].toLowerCase().includes(searchWordValue.toLowerCase()) == true){
            if(movie[i].title == undefined)
        {
            temp+= `<div class="col-md-4">
            <div class="movie-card">
                <div class="posterMovie">
                    <img src='https://image.tmdb.org/t/p/w500/${movie[i].poster_path}' class="imgPoster w-100" alt="">
                    <div class="movieDetailes text-center">
                        <div>
                            <h2 class="titleName">${movie[i].name}</h2>
                            <p class="overView">${movie[i].overview}</p>
                            <p class="rate">rate: ${movie[i].vote_average}</p>
                            <p class="releaseDate">${movie[i].release_date}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        `;
        }
        else{
            temp+= `<div class="col-md-4">
            <div class="movie-card">
                <div class="posterMovie">
                    <img src='https://image.tmdb.org/t/p/w500/${movie[i].poster_path}' class="imgPoster w-100" alt="">
                    <div class="movieDetailes text-center">
                        <div>
                            <h2 class="titleName">${movie[i].title}</h2>
                            <p class="overView">${movie[i].overview}</p>
                            <p class="rate">rate: ${movie[i].vote_average}</p>
                            <p class="releaseDate">${movie[i].release_date}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        `;

        }
        }
        document.getElementById('DataInput').innerHTML = temp;
    }
    // searchMo(temp);
    // console.log(typeof(moviesArray[0].title))
    // console.log(allMoviesValue);
    // console.log(allMovies);
    // console.log('cartoona',cartoona);

})

let searchAll = [];
let allMovies = document.getElementById('allMovies');

async function searchMovie(e){
        let now = await fetch("https://api.themoviedb.org/3/search/movie?query="+e+"&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false");
        let nowResult =  await now.json();
        movie = [...nowResult.results]
        let allMoviesValue = allMovies.value;
    let temp ;
    for (i=0;i<20;i++){
        if (moviesTitle[i].toLowerCase().includes(allMoviesValue.toLowerCase()) == true){
            if(movie[i].title == undefined)
        {
            temp+= `<div class="col-md-4">
            <div class="movie-card">
                <div class="posterMovie">
                    <img src='https://image.tmdb.org/t/p/w500/${movie[i].poster_path}' class="imgPoster w-100" alt="">
                    <div class="movieDetailes text-center">
                        <div>
                            <h2 class="titleName">${movie[i].name}</h2>
                            <p class="overView">${movie[i].overview}</p>
                            <p class="rate">rate: ${movie[i].vote_average}</p>
                            <p class="releaseDate">${movie[i].release_date}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        `;
        }
        else{
            temp+= `<div class="col-md-4">
            <div class="movie-card">
                <div class="posterMovie">
                    <img src='https://image.tmdb.org/t/p/w500/${movie[i].poster_path}' class="imgPoster w-100" alt="">
                    <div class="movieDetailes text-center">
                        <div>
                            <h2 class="titleName">${movie[i].title}</h2>
                            <p class="overView">${movie[i].overview}</p>
                            <p class="rate">rate: ${movie[i].vote_average}</p>
                            <p class="releaseDate">${movie[i].release_date}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>`;
        console.log('search', movie)
        showMovie()
    }
}
}
}
// searchMovie("man");
$('#allMovies').keyup(function(){
   let e = allMovies.value;
    if (e == '')
    {
        fetchTrending();   
     }
    else{
        searchMovie(e);
    }
    console.log(e);
    // searchMovie()
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++

// search
function showMovie(){
    let temp='';
    if(moviesTitle.length > 0){
        while(moviesTitle.length > 0)
        {
            moviesTitle.pop();
        }
        console.log('clear',moviesTitle)
    }
    
    for(let i =0 ; i < movie.length; i++)
    {

        
       
        if(movie[i].original_title == undefined)
        {
            temp+=`
        <div class="col-md-4">
                    <div class="movie-card">
                        <div class="posterMovie">
                            <img src='https://image.tmdb.org/t/p/w500/${movie[i].poster_path}' class="imgPoster w-100" alt="">
                            <div class="movieDetailes text-center">
                                <div>
                                    <h2 class="titleName">${movie[i].name}</h2>
                                    <p class="overView">${movie[i].overview}</p>
                                    <p class="rate">rate: ${movie[i].vote_average}</p>
                                    <p class="releaseDate">${movie[i].release_date}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
        `
        moviesTitle.push(movie[i].name)
        }else if(movie[i].title == 'Lightyear'){
            temp+=`
        <div class="col-md-4">
                    <div class="movie-card">
                        <div class="posterMovie">
                            <img src='https://image.tmdb.org/t/p/w400/${movie[i].poster_path}' class="imgPoster w-100" alt="">
                            <div class="movieDetailes text-center">
                                <div class='px-2'>
                                    <h2 class="titleName">'الاشكال النجسة'</h2>
                                    <p class="overView">${movie[i].overview}</p>
                                    <p class="rate">rate: ${movie[i].vote_average}</p>
                                    <p class="releaseDate">${movie[i].release_date}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
        `
        }else{
            temp+=`
        <div class="col-md-4">
                    <div class="movie-card">
                        <div class="posterMovie">
                            <img src='https://image.tmdb.org/t/p/w400/${movie[i].poster_path}' class="imgPoster w-100" alt="">
                            <div class="movieDetailes text-center">
                                <div class='px-2'>
                                    <h2 class="titleName">${movie[i].title}</h2>
                                    <p class="overView">${movie[i].overview}</p>
                                    <p class="rate">rate: ${movie[i].vote_average}</p>
                                    <p class="releaseDate">${movie[i].release_date}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
        `
        moviesTitle.push(movie[i].title)
        }
        
    }
    document.getElementById('DataInput').innerHTML = temp;
}


// name check
$('#name').keyup(function(){
    let name = document.getElementById('name');
    let nameValue = name.value;
    if(nameValue == '')
    {
        $('#nameInvalied').css('display','block');
    }
    else
    {
        $('#nameInvalied').css('display','none');
    }
})

// phone check


$('.enterPhone').keyup(function(){
    let p = /^01[0125][0-9]{8}$/;
    let phone = document.getElementById('phone');
    let enter = phone.value;
    if(enter.match(p))
   {
    $('#phoneInvalied').css('display','none');
    console.log('enter')
   } else if(enter == ''){
    $('#phoneInvalied').css('display','none');
    console.log('enter')
   }else{  
    $('#phoneInvalied').css('display','block');
    console.log('not match')
   }

})


// email check

$('.enterEmail').keyup(function(){
    const re = /^[^]+@[^]+\.[a-z]{2,3}$/i;
    let email = document.getElementById('email');
    let enter = email.value;
    if(enter.match(re))
   {
    $('#emialInvalied').css('display','none');
    console.log('enter')
   } else if(enter == ''){
    $('#emialInvalied').css('display','none');
    console.log('enter')
   }else{  
    $('#emialInvalied').css('display','block');
    console.log('not match')
   }

})

// age valied
$('#age').keyup(function(){
    let age = document.getElementById('age');
    let ageValue = age.value;
    if(ageValue == '')
    {
        
    }
})

// submit check
$('#submit').click(function(e){
    if($('.enterPhone').value == ''   )
    {
        $('#emialInvalied').css('display','block');
    }
})


