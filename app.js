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

const unitType = {
    units: "kg"
};

const selector = function(className){
    const e = document.querySelector(className);
    return e;
}

const selectorEdit = function(className, text){
    const e = document.querySelector(className).innerText = text;
    return e;
}

// querySelectors for various elements in HTML file
const weight = selector(".weight");
const vehicleWeightButton = selector(".vehicle-weight-btn");
const addLoadButton = selector(".add-load-btn");
const loadList = selector(".load-list");
const loadName = selector(".load-name-input");
const loadInput = selector(".load-weight-input");
const vehicleWeight = selector(".vehicle-weight-input");
const maxWeight = selector(".max-vehicle-weight-input");
const unitSelect = selector(".units")
const item = selector(".load-item");

//event listeners
vehicleWeightButton.addEventListener("click", calculateWeightUnloaded);
addLoadButton.addEventListener("click", addLoad);
loadList.addEventListener("click", deleteLoad);
unitSelect.addEventListener("change", selectUnits);

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
    weight.innerHTML = remainingWeightTotal.weight + unitType.units;
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
    //check whether there is any items in the load list, and void the button if there are, to avoid issues
    if (loadList.innerHTML.trim() !== ""){
        void(0);
    }
    else {
        //calculate the remaining weight
        vehicleWeightInput.weight = vehicleWeight.value;
        maxVehicleWeightInput.weight = maxWeight.value;
        remainingWeightTotal.weight = maxVehicleWeightInput.weight - vehicleWeightInput.weight - loadWeight.weight;
        updateWeight();
    };
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
        newLoad.innerText = loadName.value + " - " + loadInput.value + unitType.units;
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
    const itemWeight = parseFloat(text[text.length - 1].replace(/[^0-9\.]/g, ''), 10);
    //checks whether the load list is empty and sets load weight to 0 if so
    if (loadList.innerHTML.trim() === "") {
        loadWeight.weight = 0;
    };
    //calculate remaining weight
    remainingWeightTotal.weight = parseFloat(remainingWeightTotal.weight) + parseFloat(itemWeight);
    updateWeight();
};

function selectUnits(e) {
    //if kilograms is selected
    if (unitSelect.value === "kilograms") {
        if(remainingWeightTotal.weight !== 0) {
            //multiplies all weight numbers by 1000 to convert from t to kg
            loadWeight.weight = loadWeight.weight * 1000;
            maxVehicleWeightInput.weight = maxVehicleWeightInput.weight * 1000;
            vehicleWeightInput.weight = vehicleWeightInput.weight * 1000;
            remainingWeightTotal.weight = remainingWeightTotal.weight * 1000;
        };
        //changes the values in the input fields
        vehicleWeight.value = vehicleWeight.value * 1000;
        maxWeight.value = maxWeight.value * 1000;

        //loops through load list and changes the numbers to conver from t to kg
        const loadItems = loadList.getElementsByTagName("li");
        for (var i = 0; i < loadItems.length; i++) {
            var text = loadItems[i].innerText;
            var text = text.split('-');
            var loadItemWeight = parseFloat(text[text.length - 1].replace(/[^0-9\.]/g, ''), 10);
            loadItemWeight = loadItemWeight * 1000;
            loadItems[i].innerText = text[0] + " - " + loadItemWeight + " kg";
        };

        //sets units to kg and updates all elements to reflect changes 
        unitType.units = " kg";
        weight.innerText = remainingWeightTotal.weight + unitType.units;
        selectorEdit(".vehicle-weight-label", "Vehicle weight unloaded (kg):");
        selectorEdit(".max-weight-label", "Max vehicle weight (kg):");
        selectorEdit(".load-weight-label","Load weight (kg):");

    }

    //as above but converting from kg to t
    if (unitSelect.value === "tonnes") {
        if(remainingWeightTotal.weight !== 0) {
            loadWeight.weight = loadWeight.weight / 1000;
            maxVehicleWeightInput.weight = maxVehicleWeightInput.weight / 1000;
            vehicleWeightInput.weight = vehicleWeightInput.weight / 1000;
            remainingWeightTotal.weight = remainingWeightTotal.weight / 1000;
        };
        vehicleWeight.value = vehicleWeight.value / 1000;
        maxWeight.value = maxWeight.value / 1000;
        
        const loadItems = loadList.getElementsByTagName("li");
        for (var i = 0; i < loadItems.length; i++) {
            var text = loadItems[i].innerText;
            var text = text.split('-');
            var loadItemWeight = parseFloat(text[text.length - 1].replace(/[^0-9\.]/g, ''), 10);
            loadItemWeight = loadItemWeight / 1000;
            loadItems[i].innerText = text[0] + " - " + loadItemWeight + " t";
        };

        unitType.units = " t";
        weight.innerText = remainingWeightTotal.weight + unitType.units;
        selectorEdit(".vehicle-weight-label", "Vehicle weight unloaded (t):");
        selectorEdit(".max-weight-label", "Max vehicle weight (t):");
        selectorEdit(".load-weight-label","Load weight (t):");
    };
};