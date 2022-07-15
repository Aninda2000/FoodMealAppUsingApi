if(!localStorage.getItem('foodMealFav')){
    localStorage.setItem('foodMealFav','');
}

function getAllFav(){
    
    let allItem= localStorage.getItem('foodMealFav');
    allItem=allItem.split(',');
    if(allItem[0]==''){
        allItem.pop();
    }
    return allItem ;
}

function setFav(foodId){
    let prevItem=getAllFav();

    if(prevItem.indexOf(foodId+"")==-1){
        prevItem.push(foodId);
        localStorage.setItem('foodMealFav',prevItem.toString());
        
        return true;
    }else{
        let index=prevItem.indexOf(foodId+"");
        prevItem.splice(index,1);
        localStorage.setItem('foodMealFav',prevItem.toString());
        return false;
    }
    
}