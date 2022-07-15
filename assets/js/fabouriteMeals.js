const mealCard= document.getElementById('meal-card');
const homebtn=document.getElementById('home-btn');
var foodHtml="";


//api function for searching by id
function callingApi(foodId){
    var xhrRequest=new XMLHttpRequest();
    xhrRequest.onload=function(){
        var resObj=JSON.parse(xhrRequest.response);
        resObj=resObj["meals"][0];
        foodHtml+=`<div class="col-md-4">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="${resObj["strMealThumb"]}" data-holder-rendered="true">
          <div class="card-body">
            <p class="card-text">${resObj["strInstructions"].substring(0,160)}&nbsp <a class="link-primary text-decoration-none" > ... read more</a></p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
              <button type="button" onclick="setFavHelper(${resObj["idMeal"]})" class="btn btn-danger " id="fav-btn-${resObj["idMeal"]}">
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
    };
    xhrRequest.open("GET", "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+foodId,false);
    xhrRequest.send();
}
// display all fabourite items
let favItems=getAllFav();
for(foodId of favItems){
    callingApi(foodId);

}
mealCard.innerHTML=foodHtml;

//setting background colour according to fabourite items after clicking fabourites button
function setFavHelper(foodId){
  if(setFav(foodId)){
    document.getElementById('fav-btn-'+foodId).className="btn btn-danger ";
  }else{
    document.getElementById('fav-btn-'+foodId).className="btn btn-secondary ";
  }
}

//home button click event: clicking on home button redirect to home page

homebtn.addEventListener('click',function(){
  location.href='./index.html';
})