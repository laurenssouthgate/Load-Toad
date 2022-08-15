const vehicleWeightInput = {
    weight: 0
};
const maxVehicleWeightInput = {
    weight: 0
};
const totalWeight = {
    weight: 0
};
const loadWeight = {
    weight: 0
};
const weight = document.querySelector(".weight");
const vehicleWeightButton = document.querySelector(".vehicle-weight-btn");
const addLoadButton = document.querySelector(".add-load-btn");
const loadList = document.querySelector(".load-list");
const loadName = document.querySelector(".load-name-input");
const loadInput = document.querySelector(".load-weight-input");
const vehicleWeight = document.querySelector(".vehicle-weight-input");
const maxWeight = document.querySelector(".max-vehicle-weight-input");


vehicleWeightButton.addEventListener("click", calculateWeight);
addLoadButton.addEventListener("click", addLoad);
loadList.addEventListener("click", deleteLoad);

function calculateWeight(e){
    e.preventDefault();
    vehicleWeightInput.weight = vehicleWeight.value;
    maxVehicleWeightInput.weight = maxWeight.value;
    totalWeight.weight = maxVehicleWeightInput.weight - vehicleWeightInput.weight;
    weight.innerHTML = totalWeight.weight + " kg";
};

function addLoad(e){
    e.preventDefault();
    if (loadName.value === "") {
        loadName.value = "Unnamed Load"
    };
    if (loadInput.value === 0 || loadInput.value === "") {
        alert("Please enter a weight")
    };
    const loadDiv = document.createElement("div");
    loadDiv.classList.add("load");
    const newLoad = document.createElement("li");
    newLoad.innerText = loadName.value + " - " + loadInput.value + " kg";
    newLoad.classList.add("load-item");
    loadDiv.appendChild(newLoad);
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    deleteButton.classList.add("delete-btn");
    loadDiv.appendChild(deleteButton);
    loadList.appendChild(loadDiv);

    loadWeight.weight = loadInput.value;
    totalWeight.weight = parseInt(totalWeight.weight) - parseInt(loadWeight.weight);
    weight.innerHTML = totalWeight.weight + " kg";
    
    loadName.value = "";
    loadInput.value = "";
};

function deleteLoad(e){
    const item = e.target;
    //Delete todo
    if(item.classList[0] === "delete-btn") {
        const load = item.parentElement;
        load.remove();

    };
    const text = item.parentElement.innerText;
    const itemWeight= parseInt(text.replace(/[^0-9\.]/g, ''), 10);

    totalWeight.weight = parseInt(totalWeight.weight) + parseInt(itemWeight);
    weight.innerHTML = totalWeight.weight + " kg";
};


