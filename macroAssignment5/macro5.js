const button_add = document.getElementById('addNew');
const panel_add_new_item = document.getElementById('panel_add_new_item');
const item_cancel = document.getElementById('item_cancel');
const item_add = document.getElementById('item_add');
const panel_item_container = document.getElementById('panel_item_container');
const item_title = document.getElementById('item_title');
const item_season = document.getElementById('item_season');
const item_description = document.getElementById('item_description');
let tile = document.getElementsByClassName("tile");
let body = document.body;
let filter = document.getElementById("filter");
let didCheck = false;


filter.onchange = function(){
    if(filter.value == "all"){
        for(let i = 0; i < tile.length; i++){
            tile[i].style.display = "inline";
        }
    }
    else if(filter.value == "completed"){
        for(let i = 0; i < tile.length; i++){
            if(tile[i].dataset.completed == "true"){
                tile[i].style.display = "inline";
            }
            else{
                tile[i].style.display = "none";
            }
        }
    }
    else if(filter.value == "uncompleted"){
        for(let i = 0; i < tile.length; i++){
            if(tile[i].dataset.completed == "true"){
                tile[i].style.display = "none";
            }
            else{
                tile[i].style.display = "inline";
            }
        }
    }
    else{
        for(let i = 0; i < tile.length; i++){
            if(tile[i].dataset.season == filter.value){
                tile[i].style.display = "inline";
            }
            else{
                tile[i].style.display = "none";
            }
        }
    }
}
button_add.onclick = function() {
    panel_add_new_item.classList.remove('hidden');
};

item_add.onclick = function(event) {
    event.preventDefault();

        //check everything is filled
        let myform = document.forms[0];
        let notCompleted = document.getElementById("notCompleted");
        for(let i = 0; i < myform.elements.length - 2; i++){
            let element = myform.elements[i];
            if(element.value === ""){
                element.focus();
                element.select();
                notCompleted.classList.remove("hidden");
                return;
            }
        }
        notCompleted.classList.add("hidden");

        //make new sticky
        const item = document.createElement('div');
        item.classList.add('tile');
        item.classList.add(item_season.value);

        //Dataset values
        item.dataset.title = item_title.value;
        item.dataset.season = item_season.value;
        item.dataset.descripion = item_description.value;
        item.dataset.completed = "false";
        let firstMade = new Date();
        let formatFirstMade = formatDate(firstMade);
        item.dataset.created = formatFirstMade;

        //function for info Panel
        item.onclick = function(){
            let tile = document.getElementsByClassName("tile");
            if(didCheck == true){
                didCheck = false;
                return;
            }
            for(let i = 0; i < tile.length; i++){
                if(tile[i] == item){
                    let panelInfo = document.getElementById("panelInfo");
                    panelInfo.style.display = "inline";
                    panelInfo.style.lineHeight = "12px";
                    let titleDisplay = document.getElementById("titleDisplay");
                    let seasonDisplay = document.getElementById("seasonDisplay");
                    let descriptionDisplay = document.getElementById("descriptionDisplay");
                    let createdDisplay = document.getElementById("createdDisplay");
                    let lastAccessed = document.getElementById("lastAccessed");

                    titleDisplay.innerText = item.dataset.title;
                    descriptionDisplay.innerText = item.dataset.descripion;
                    seasonDisplay.innerText = "Season: " +  item.dataset.season;
                    createdDisplay.innerText = "Created: " + item.dataset.created;

                    let lastAccessedTime = new Date();
                    let formatlastTime = formatDate(lastAccessedTime);
                    lastAccessed.innerText = "Last Accessed: " + formatlastTime;

                    let close = document.getElementById("close");
                    close.onclick = function(){
                        panelInfo.style.display = "none";
                    }
                }
            }
  
        }

        item.onmouseover = function(){
            deleteBt.classList.remove("hidden");
        }

        item.onmouseout = function(){
            deleteBt.classList.add("hidden");
        }
        
        item.innerText = item_title.value;
        panel_item_container.appendChild(item);

        let deleteBt = document.createElement("img");
        deleteBt.classList.add("deleteDecor");
        deleteBt.classList.add("hidden");
        deleteBt.src = "images/delete_button.png";
        deleteBt.addEventListener("click", deleteItem(item));
        item.appendChild(deleteBt);

        let complete = document.createElement("img");
        complete.id = "complete";
        complete.src = "images/emptyCheck.png";
        complete.addEventListener("click", check(item));
        complete.classList.add("didTask");
        complete.innerText = "Check Complete";
        item.appendChild(complete);

        panel_add_new_item.classList.add('hidden');
        item_title.value = '';
        item_description.value = '';
        filter.value = "all";
        for(let i = 0; i < tile.length; i++){
            tile[i].style.display = "inline";
        }
    
};

item_cancel.onclick = function(event) {
        event.preventDefault();
        panel_add_new_item.classList.add('hidden');
        item_title.value = '';
        item_description.value = '';
}

function deleteItem(item){
    return function(){
        item.remove();
    }
}

function check(item){
    return function(){
    let panelInfo = document.getElementsByClassName("panelInfo");
    let children = item.children;
    let check;
    for(let i = 0; i < children.length; i++){
        if(children[i].id = "complete"){
            check = children[i];
        }
    }
   
    if(item.dataset.completed == "false"){
        item.dataset.completed = "true";
        check.src = "images/check.png";
    }
    else{
        item.dataset.completed = "false";
        check.src = "images/emptyCheck.png";
    }
    didCheck = true;
}
}

function formatDate(timeObj){
    let result = "";
    let month = timeObj.getMonth() + 1;
    let day = timeObj.getDate();
    let year = timeObj.getFullYear();
    let hour = timeObj.getHours();
    let minutes = timeObj.getMinutes();
    let AmPm = "";

    if(hour >= 12){
        if(hour > 12){
            hour = hour - 12;
        }
        AmPm = "pm";
    }
    else{
        AmPm = "am";
    }

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    result += month + "/" + day + "/" + year + " " + hour + ":" + minutes + " " + AmPm;
    return result;
}