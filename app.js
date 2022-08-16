// various weight numbers to be used in calculation
const vehicleWeightInput = {
    weight: 0
};
const maxVehicleWeightInput = {
    weight: 0
};
const remainingWeightTotal = {
    weight: 0
};
const loadWeight = {
    weight: 0
};

// querySelectors for various elements in HTML file
const weight = document.querySelector(".weight");
const vehicleWeightButton = document.querySelector(".vehicle-weight-btn");
const addLoadButton = document.querySelector(".add-load-btn");
const loadList = document.querySelector(".load-list");
const loadName = document.querySelector(".load-name-input");
const loadInput = document.querySelector(".load-weight-input");
const vehicleWeight = document.querySelector(".vehicle-weight-input");
const maxWeight = document.querySelector(".max-vehicle-weight-input");

//event listeners
vehicleWeightButton.addEventListener("click", calculateWeightUnloaded);
addLoadButton.addEventListener("click", addLoad);
loadList.addEventListener("click", deleteLoad);

//create new element
const createElementAddClass = function(tagName, className){
    const el = document.createElement(tagName);
    el.classList.add(className);
    return el;
}

//update the weight displayed on the page
const updateWeight = function(){
    //removes over-weight class in cases where the load making vehicle overweight is removed
    weight.classList.remove("over-weight");
    weight.classList.add("weight");
    //updates weight to contain the remaining weight
    weight.innerHTML = remainingWeightTotal.weight + " kg";
    //creates alert with warning if the vehicle is overweight and changes font to red
    if (remainingWeightTotal.weight < 0) {
        weight.classList.remove("weight");
        weight.classList.add("over-weight");
        alert("Your vehicle is overweight!");

    };
}

//calculate initial unloaded weight of vehicle
function calculateWeightUnloaded(e){
    e.preventDefault();
    vehicleWeightInput.weight = vehicleWeight.value;
    maxVehicleWeightInput.weight = maxWeight.value;
    remainingWeightTotal.weight = maxVehicleWeightInput.weight - vehicleWeightInput.weight;
    updateWeight();
};

//calculate weight when load is added
const remainingWeightAddLoad = function(){
    remainingWeightTotal.weight = remainingWeightTotal.weight - loadWeight.weight;
    updateWeight();
};


//add load weights and update remaining weight
function addLoad(e){
    e.preventDefault();
    //assigns the loadname "Unnamed Load" if user leaves the name field blank
    if (loadName.value === "") {
        loadName.value = "Unnamed Load"
    };
    //creates alert if the user has not submitted vehicle weight or max weight first
    if (vehicleWeightInput.weight === 0 || maxVehicleWeightInput.weight === 0){
        alert("Please enter Vehicle Weight and Max Vehicle Weight first!");
        loadName.value = "";
        loadWeight.value = "";
    }
    //creates an alert to remind the user to enter a value if the load weight field is left blank, and clears it if so
    else if (loadInput.value === 0 || loadInput.value === "") {
        alert("Please enter a weight")
        loadName.value = "";
        loadWeight.value = "";
    }
    else {
        //creates a div
        const loadDiv = createElementAddClass("div", "load");
        //creates a li and adds it to the div with the load name and load weight inside
        const newLoad = createElementAddClass("li", "load-item");
        newLoad.innerText = loadName.value + " - " + loadInput.value + " kg";
        loadDiv.appendChild(newLoad);
        //creates the delete button to remove the load from the list
        const deleteButton = createElementAddClass("button", "delete-btn");
        deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        loadDiv.appendChild(deleteButton);
        //adds to the load list div
        loadList.appendChild(loadDiv);
        //updates the load weight total value
        loadWeight.weight = loadInput.value;
        //calculates remaining weight add updates the value on the screen
        remainingWeightAddLoad();
        //clears the field
        loadName.value = "";
        loadInput.value = "";
    };
};


function deleteLoad(e){
    const item = e.target;
    //finds whether delete button has been clicked
    if(item.classList[0] === "delete-btn") {
        //selects parent element and removes it
        const load = item.parentElement;
        load.remove();

    };
    //splits text from element at '-'
    const text = item.parentElement.innerText.split('-');
    //after split extracts number only to return the weight to be removed
    const itemWeight= parseInt(text[1].replace(/[^0-9\.]/g, ''), 10);
    //recalculates remaining weight total using item weight
    remainingWeightTotal.weight = parseInt(remainingWeightTotal.weight) + parseInt(itemWeight);
    updateWeight();

};