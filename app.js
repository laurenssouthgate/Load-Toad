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


const unitDifference = 1000;

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
        handleAddLoad();
    };
});

loadList.addEventListener('click', function deleteLoadButton(event) {
    const item = event.target;
    deleteLoad(item);
    handleDelete(item);
    handleEmptyList();
});

unitSelect.addEventListener('change', function changeUnits() {
    if (unitSelect.value === 'kilograms') {
        handleKgs()
    } else if (unitSelect.value === 'tonnes') {
        handleTonnes()
    }
    updateHTML()
    updateLoadList()
})

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

function handleAddLoad () {
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
}

function deleteLoad (item) {
    if(item.classList[0] === "delete-btn") {
        const load = item.parentElement;
        load.remove();
    };
}

function handleDelete (item) {
    let contents = item.parentElement.innerText;
    let itemWeight= 0;
    extractNumber(contents, itemWeight);
    loadWeight =- Number (itemWeight);
    calculateRemaingingWeight();
}

function handleEmptyList () {
    if (loadItems.length === 0){
        empty.classList.remove('hidden');
    };
}

function extractNumber(s, n) {
    s = s.split('-');
    n = s[s.length - 1].replace(/[^0-9\.]/g, ''), 10;
    return s, n;
}

function handleKgs () {
    unitType = 'kg';
    if (remainingWeight !== 0) {
        loadWeight = loadWeight * unitDifference;
        remainingWeight = remainingWeight * unitDifference;
        maxWeight = maxWeight * unitDifference;
        totalWeight = totalWeight * unitDifference;
    }
    vehicleWeightInput.value = vehicleWeightInput.value * unitDifference;
    maxVehicleWeightInput.value = maxVehicleWeightInput.value * unitDifference;
}

function handleTonnes () {
    unitType = 't';
    if (remainingWeight !== 0) {
        loadWeight = loadWeight / unitDifference;
        remainingWeight = remainingWeight / unitDifference;
        maxWeight = maxWeight / unitDifference;
        totalWeight = totalWeight / unitDifference;
    }
    vehicleWeightInput.value = vehicleWeightInput.value / unitDifference;
    maxVehicleWeightInput.value = maxVehicleWeightInput.value / unitDifference; 
}

function updateHTML () {
    document.querySelector('.vehicle-weight-label').innerHTML = `Vehicle weight unloaded (${ unitType }):`;
    document.querySelector('.max-weight-label').innerHTML = `Max vehicle weight (${ unitType }):` ;
    document.querySelector('.load-weight-label').innerHTML = `Load weight (${ unitType }):` ;
    document.querySelector('.weight').innerHTML = `${ remainingWeight } ${ unitType }`;
}

function updateLoadList () {
    for (let i = 0; i < loadItems.length; i++) {
        let text = loadItems[i].innerText;
        text = text.split('-');
        let loadItemWeight = parseFloat(text[text.length - 1].replace(/[^0-9\.]/g, ''), 10);
        if (unitType === 'kg') {
            loadItemWeight = loadItemWeight * unitDifference;
        } else {
            loadItemWeight = loadItemWeight / unitDifference;
        };
        loadItems[i].innerText = `${ text[0] } - ${ loadItemWeight }  ${ unitType }`;
    };
}
