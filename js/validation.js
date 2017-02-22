/* AUTHOR: Junhui Xie
    CREATED: 2015-03-07
    UPDATED: 2015-03-15 */

window.addEventListener("load", function() {
    var billing = document.forms["billing"];

    var validateButton = billing["validateButton"];
    validateButton.addEventListener("click", validateBilling);
    
    var calculateButton = document.forms["delivery"]["calculateButton"];
    calculateButton.addEventListener("click", calculation);
    
    var cardNum = billing["number"];
    cardNum.addEventListener("focus", function() {
        changeColor(cardNum); 
    });
    
    var cardHolder = billing["cardholderName"];
    cardHolder.addEventListener("focus", function() {
        changeColor(cardHolder);   
    });
    
    var weight = document.forms["delivery"]["weight"];
    weight.addEventListener("focus", function() {
        changeColor(weight);
    });
    
    var copyButton = document.forms["shipping"]["copyButton"];
    copyButton.addEventListener("click", function() {
        var billing = document.forms["billing"];
        var shipName = document.getElementById("shipName");
        var billName = billing["cardholderName"]["value"];
        shipName.value = billName;
        var shipAddress = document.getElementById("shipAddr");
        var billAddress = billing["billAddress"]["value"];
        shipAddress.value = billAddress;
        var shipCity = document.getElementById("shipCty");
        var billCity = billing["billCity"]["value"];
        shipCity.value = billCity;
        var shipProvince = document.getElementById("shipPro");
        var billProvince = billing["billProvince"]["value"];
        shipProvince.value = billProvince;
        var shipPostal = document.getElementById("shipPost");
        var billPostal = billing["billPostalCode"]["value"];
        shipPostal.value = billPostal;
    });
});

function changeColor(field) {
    field.style.backgroundColor = "white";
}

function validateBilling() {
    var billing = document.forms["billing"];
    var cardNum = billing["number"];
    var cardHolder = billing["cardholderName"];
    
    var invalidMessage = "";
    var cardType = billing["cardType"]["value"];
    
    if (cardNum["value"].length !== 16 || isNaN(cardNum["value"])) {
        cardNum["style"]["backgroundColor"] = "#FFFF66";
        invalidMessage += "16 numeric characters are required!\n";
    } 
    if (cardNum["value"].charAt(0) !== "4" && cardType === "VISA") {
        cardNum["style"]["backgroundColor"] = "#FFFF66";
        invalidMessage += "Invalid Credit Card Number!\n";
    } else if (cardNum["value"].charAt(0) !== "5" && cardType === "MASTERCARD") {
        cardNum["style"]["backgroundColor"] = "#FFFF66";
        invalidMessage += "Invalid Credit Card Number!\n";
    } 
    if (cardHolder["value"] === "") {
        invalidMessage += "Cardholder name is required!\n";
        cardHolder["style"]["backgroundColor"] = "#FFFF66";
    } else {
        cardHolder["style"]["backgroundColor"] = "white";
    }
    if (invalidMessage !=="") {
        alert(invalidMessage);
    } else {
        alert("Billing Info Validated");
    }
}

function calculation() {
    var delivery = document.forms["delivery"];
    var weight = delivery["weight"];
    if (isNaN(weight["value"]) || weight["value"] <= 0) {
        weight["style"]["backgroundColor"] = "red";
        alert("Invalid weight!");
    } else {
        var price;
        var cost;
        var tax;
        
        var shippingmethod = delivery["method"]["value"];
        if (shippingmethod === "Next Day") {
            price = 25;
        } else if (shippingmethod === "Express") {
            price = 10;
        } else if (shippingmethod === "Ground") {
            price = 5;
        }
        
        cost = price * weight["value"];
        var costPrecision = cost.toFixed(2);
        var billingAddr = document.forms["billing"]["billProvince"]["value"];
        if (billingAddr === "ON") {
            tax = cost * 0.13;
            var taxPrecision = tax.toFixed(2);
        } else {
            tax = cost * 0.15;
            var taxPrecision = tax.toFixed(2);
        }
        var totalCost = (cost + tax).toFixed(2);
        
        var result = document.getElementById("details");
        result.innerHTML = "Delivery Type: " + shippingmethod + "<br/>" + 
                "Delivery Cost: $" + costPrecision + "<br/>" + "Sales Tax: $" + 
                taxPrecision + "<br/>" + "Total Cost: $" + totalCost;   
    }
}
