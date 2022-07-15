const foodName=document.getElementById('food-name');
const foodImage=document.getElementById('food-img');
const ingredients=document.getElementById('ingredients');
const description=document.getElementById('description');
const favBtn =document.getElementById('fav-btn');
const vidBtn=document.getElementById('vid-btn');
const url=window.location.href;

//creating xhrrequest
var xhrRequest = new XMLHttpRequest();

xhrRequest.onload=function(){
    var resObj=JSON.parse(xhrRequest.response);
    resObj=resObj["meals"][0];

    // adding dynamic name
    foodName.innerHTML=resObj["strMeal"];

    //adding dynamic description
    description.innerHTML=resObj["strInstructions"];

    //adding dynamic image
    foodImage.src=resObj["strMealThumb"];
    var items="";

    //chaging ingredients
    for(let i=1;i<21;i++){
        if(resObj["strIngredient"+i] ){
            items+=`<li class="list-group-item">
            <input class="form-check-input me-1 " type="checkbox" >
            <span class="fw-bold text-secondary"> ${resObj["strIngredient"+i]}</span> <span> : ${resObj["strMeasure"+i]}</span>
            </li>`
        }
    }
    ingredients.innerHTML=items;
    
    //video button click :redirect to youtube video link
    vidBtn.addEventListener('click',function(){
        location.href=resObj["strYoutube"];
    })

};
xhrRequest.open("GET", "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+url.split("?id=")[1]);

xhrRequest.send();

