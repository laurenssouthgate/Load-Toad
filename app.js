let remainingWeight = 0;
let totalWeight = 0;
let loadWeight = 0;
let maxWeight = 0;

let unitType = 'kg';

const vehicleWeightInput = document.querySelector('.vehicle-weight-input');
const maxVehicleWeightInput = document.querySelector('.max-vehicle-weight-input');
const loadName = document.querySelector('.load-name-input');
const loadWeightInput = document.querySelector('.load-weight-input');
const loadList = document.querySelector('.load-list')
const submitBtn = document.querySelector('.vehicle-weight-btn');
const addLoadBtn = document.querySelector('.add-load-btn');
const unitSelect = document.querySelector('.units');
const empty = document.querySelector('.empty');
const loadItems = loadList.getElementsByTagName('li');
const weight = document.querySelector('.weight');

function createElementAddClass (tagName, className) {
    const el = document.createElement(tagName);
    el.classList.add(className);
    return el;
};

function calculateRemaingingWeight () {
    remainingWeight = Number (maxWeight) - Number (totalWeight) - Number (loadWeight);
    updateWeight();
}

function updateWeight () {
    weight.innerHTML = `${ remainingWeight } ${ unitType }`;
    if (remainingWeight < 0) {
        weight.classList.add('over-weight');
    } else {
        weight.classList.remove('over-weight');
    }
}

submitBtn.addEventListener('click', function getInitialWeight (event) {
    event.preventDefault();
    totalWeight = 0;
    maxWeight = 0;
    maxWeight = Number (maxWeight) + Number (maxVehicleWeightInput.value);
    totalWeight = vehicleWeightInput.value;
    calculateRemaingingWeight()
});

addLoadBtn.addEventListener('click', function addLoad (event) {
    event.preventDefault();
    if (loadName.value === '') {
        loadName.value = 'Unnamed Load';
    };
    if (maxWeight === 0 || totalWeight === 0) {
        alert("Please enter Vehicle Weight and Max Vehicle Weight first!");
        loadName.value = "";
        loadWeightInput.value = "";
    } else if (loadWeightInput.value === 0 || loadWeightInput.value === "") {
        alert("Please enter a weight")
        loadName.value = "";
        loadWeightInput.value = "";
    } else {
        empty.classList.add('hidden');
        const loadDiv = createElementAddClass("div", "load");
        const newLoad = createElementAddClass("li", "load-item");
        newLoad.innerText = `${ loadName.value } - ${ loadWeightInput.value } ${ unitType }`;
        loadDiv.appendChild(newLoad);
        const deleteButton = createElementAddClass("button", "delete-btn");
        deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        loadDiv.appendChild(deleteButton);
        loadList.appendChild(loadDiv);
        console.log(loadWeightInput.value);
        loadWeight = Number (loadWeight) + Number (loadWeightInput.value);
        calculateRemaingingWeight();
        loadName.value = "";
        loadWeightInput.value = "";
    };
});

loadList.addEventListener('click', function deleteLoad(event) {
    const item = event.target;
    if(item.classList[0] === "delete-btn") {
        const load = item.parentElement;
        load.remove();
    };
    const text = item.parentElement.innerText.split('-');
    const itemWeight = parseFloat(text[text.length - 1].replace(/[^0-9\.]/g, ''), 10);
    loadWeight = Number (loadWeight) - Number (itemWeight);
    calculateRemaingingWeight();

    if (loadItems.length === 0){
        empty.classList.remove('hidden');
    }
});

unitSelect.addEventListener('change', function changeUnits() {
    if (unitSelect.value === 'kilograms') {
        unitType = 'kg';
        if (remainingWeight !== 0) {
            loadWeight = loadWeight * 1000;
            remainingWeight = remainingWeight * 1000;
            maxWeight = maxWeight * 1000;
            totalWeight = totalWeight * 1000;
        }
        vehicleWeightInput.value = vehicleWeightInput.value * 1000;
        maxVehicleWeightInput.value = maxVehicleWeightInput.value * 1000;
    } else if (unitSelect.value === 'tonnes') {
        unitType = 't';
        if (remainingWeight !== 0) {
            loadWeight = loadWeight / 1000;
            remainingWeight = remainingWeight / 1000;
            maxWeight = maxWeight / 1000;
            totalWeight = totalWeight / 1000;
        }
        vehicleWeightInput.value = vehicleWeightInput.value / 1000;
        maxVehicleWeightInput.value = maxVehicleWeightInput.value / 1000;        
    }
    document.querySelector('.vehicle-weight-label').innerHTML = `Vehicle weight unloaded (${ unitType }):`;
    document.querySelector('.max-weight-label').innerHTML = `Max vehicle weight (${ unitType }):` ;
    document.querySelector('.load-weight-label').innerHTML = `Load weight (${ unitType }):` ;
    document.querySelector('.weight').innerHTML = `${ remainingWeight } ${ unitType }`;

    for (let i = 0; i < loadItems.length; i++) {
        let text = loadItems[i].innerText;
        text = text.split('-');
        let loadItemWeight = parseFloat(text[text.length - 1].replace(/[^0-9\.]/g, ''), 10);
        if (unitType === 'kg') {
            loadItemWeight = loadItemWeight * 1000;
        } else {
            loadItemWeight = loadItemWeight / 1000;
        };
        loadItems[i].innerText = `${ text[0] } - ${ loadItemWeight }  ${ unitType }`;
    };

})