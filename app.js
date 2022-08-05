var vehicleWeightInput;
var maxVehicleWeightInput;
var vehicleWeightButton = document.querySelector(".vehicle-weight-btn");
var remainingWeight;

vehicleWeightButton.addEventListener("click", calculateWeight);

function calculateWeight(e){
    e.preventDefault();
    vehicleWeightInput = document.getElementById("vehicle-weight-input").value;
    maxVehicleWeightInput = document.getElementById("max-vehicle-weight-input").value;
    remainingWeight = maxVehicleWeightInput - vehicleWeightInput;
    document.getElementById("weight").innerHTML = remainingWeight + " kg";
}
