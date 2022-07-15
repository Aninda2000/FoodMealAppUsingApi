const mealCard= document.getElementById('meal-card');
const searchbtn=document.getElementById('search-autocomplete');
const favbtn= document.getElementById('fabouriteMeal');

let cardHtml="";

//calling random api runction
function callRandomApi(){
    var xhrRequest = new XMLHttpRequest();
     
    xhrRequest.onload=function(){
        var resObj=JSON.parse(xhrRequest.response);
        resObj=resObj["meals"][0];
        
        cardHtml+= `<div class="col-md-4">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="${resObj["strMealThumb"]}" data-holder-rendered="true">
          <div class="card-body">
            <p class="card-text">${resObj["strInstructions"].substring(0,160)}&nbsp <a class="link-primary text-decoration-none" > ... read more</a></p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
              <button type="button" onclick="setFavHelper(${resObj["idMeal"]})" class="btn btn-secondary " id="fav-btn-${resObj["idMeal"]}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
              </svg>
            </button>
                <a type="button" class="btn btn-sm btn-outline-secondary" href="./MealDetailsPage.html?id=${resObj["idMeal"]}" target="_blank">View Details</a>
              </div>
              <small class="text-muted">${resObj["strCategory"]}</small>
            </div>
          </div>
        </div>
      </div>`;

    //   console.log(cardHtml);

    }
    xhrRequest.open("GET", "https://www.themealdb.com/api/json/v1/1/random.php",false);
    xhrRequest.send();

    
}
// callRandomApi();
//calling random api for 9 times


for(let i=0;i<9;i++){
  callRandomApi();
    
}
mealCard.innerHTML=cardHtml;


//handleing search button event
searchbtn.addEventListener('click',function(){
  searchbtn.addEventListener('input',function(eventinput){
    if(eventinput.target.value.length>0){
      document.getElementById("search-autocomplete-list").className="list-group fixed-top";
    }else{
      document.getElementById("search-autocomplete-list").className="list-group fixed-top visually-hidden";
    }
    if(eventinput.target.value.length%2==1){
      console.log(eventinput.target.value,"calling the search api");
      searchApi(eventinput.target.value);
    }
  })
});


function searchApi(searchText){
  var xhrRequest = new XMLHttpRequest();
     
    xhrRequest.onload=function(){
      var resObj=JSON.parse(xhrRequest.response);
      resObj=resObj["meals"];
      let mealName="";
      for(let meal of resObj){
        console.log(meal["strMeal"]);
        
        mealName+=`<a href='./MealDetailsPage.html?id=${meal["idMeal"]}' target="_blank" class='list-group-item list-group-item-action'>${meal["strMeal"]} </a>`
        
      }
      document.getElementById("search-autocomplete-list").innerHTML=mealName;
    }
    xhrRequest.open("GET", "https://www.themealdb.com/api/json/v1/1/search.php?s="+searchText);
    xhrRequest.send();
}

function setFavHelper(foodId){
  if(setFav(foodId)){
    document.getElementById('fav-btn-'+foodId).className="btn btn-danger ";
  }else{
    document.getElementById('fav-btn-'+foodId).className="btn btn-secondary ";
  }
}

//handeling fabourites button click event
favbtn.addEventListener('click',function(){
  location.href='./fabouriteMeals.html';
});

