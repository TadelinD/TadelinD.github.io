let qMario = document.getElementById("qMario");
let qKirby = document.getElementById("qKirby");
let qYoshi = document.getElementById("qYoshi");
let grandTotal = document.getElementById("grandTotal");

let subMario = document.getElementById("subMario");
let subKirby = document.getElementById("subKirby");
let subYoshi = document.getElementById("subYoshi");

let shippingChoice = document.getElementById("shippingChoice");

let shippingPrice = 7;

qMario.dataset.price = 18.99;
qKirby.dataset.price = 16.99;
qYoshi.dataset.price = 16.99;

qMario.addEventListener("change", displayTotal(qMario));
qKirby.addEventListener("change", displayTotal(qKirby));
qYoshi.addEventListener("change", displayTotal(qYoshi));
shippingChoice.addEventListener("change", displayTotal(shippingChoice));



function displayTotal(quantity){
    return function(){
        if(quantity == shippingChoice){
            if(shippingPrice == 7){
                shippingPrice = 5;
            }
            else{
                shippingPrice = 7;
            }
        }
        else{
            let idName = quantity.id.slice(1,quantity.id.length);
            let subTotalName = "sub" + idName;
            let subTotal = document.getElementById(subTotalName);
            let calculation = parseInt(quantity.value) * quantity.dataset.price;
            subTotal.value = calculation.toFixed(2);
        }
        grandTotal.value = (parseFloat(subMario.value) + parseFloat(subKirby.value) + parseFloat(subYoshi.value) + parseFloat(shippingPrice)).toFixed(2);
    }
}

let myform = document.forms[3];
myform.addEventListener("submit", function(event){
    event.preventDefault();
    let text = "<h2>Thanks for visiting our website! Here is your receipt!</h2><ul>";
    if(grandTotal.value == "7.00" || grandTotal.value == "5.00"){
        alert("No Items were selected");
        return;
    }

    let productsPurchase = "";

    if(qMario.value > 0){
        productsPurchase += "<p> You have purchased " + qMario.value + " Penguin Mario(s): $" + subMario.value + " </p>";
    }
    if(qKirby.value > 0){
        productsPurchase += "<p> You have purchased " + qKirby.value + " Heart Kirby(s): $" + subKirby.value + " </p>";
    }
    if(qYoshi.value > 0){
        productsPurchase += "<p> You have purchased " + qYoshi.value + " Red Yoshi(s): $" + subYoshi.value + " </p>";
    }

    let shippingMethod = "";
    for(let i = 0; i < myform.elements.length - 2; i++){
        let element = myform.elements[i];
        if(element.type == "radio" && element.checked){
            if(element.value == "willCall"){
                shippingMethod = "Will Call";
            }
            else if(element.value == "directShip"){
                shippingMethod = "Direct Ship";
            } 
        }
    }

    productsPurchase += "<p>" + shippingMethod + " Cost: $" + shippingPrice + "</p> <hr>";
    productsPurchase += "<p> For a total of: $" + ((parseFloat(grandTotal.value)).toFixed(2)) + "</p>";
    text += productsPurchase;

    for(let i = 0; i < myform.elements.length - 2; i++){
        let element = myform.elements[i];
        element.style.backgroundColor = "white";
        if(element.type == "radio" && !element.checked){
            continue;          
        }

        if(element.id == "creditCardNumber"){
            let creditNumber = document.getElementById("creditCardNumber").value;
            if(creditNumber.length != 16){
                element.focus();
                element.select();
                element.style.backgroundColor = "#FCC";
                alert("Credit Card Number is not 16 digits");
                return;
            }
        }

        if(element.id == "zipCode"){
            let zipCode = document.getElementById("zipCode").value;
            if(zipCode.length != 5){
                element.focus();
                element.select();
                element.style.backgroundColor = "#FCC";
                alert("Zip Code is not 5 digits");
                return;
            }
        }

        if(element.value === null || element.value === ""){
            element.focus();
            element.select();
            element.style.backgroundColor = "#FCC";
            alert(element.name + " is empty");
            return;
        }

        formatName = "";
        for(let i = 0; i < element.name.length; i++){
            const chr = element.name[i];
            if(i == 0){
                formatName += chr.toUpperCase();
            }
            else{
                formatName += chr;
            }

            if(!(i == element.name.length - 1)){
                const nextChr = element.name[i + 1];
                if(nextChr === nextChr.toUpperCase()){
                    formatName += " ";
                }
            }   
        }
        if(i == (myform.elements.length - 3) || i == (myform.elements.length - 4)){
            text += "<li> " + formatName + ": " + shippingMethod;
        }
        else if(element.id != "creditCardNumber"){
            text += "<li> " + formatName + ": " + element.value;
        }
        else{
            let creditNumber = document.getElementById("creditCardNumber").value;
            formatNumber = "************" + creditNumber.slice(12,16);
            text += "<li> " + formatName + ": " + formatNumber ;
        }

    }
    text += "</ul>";
    const receiptWindow = window.open();
    receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt</title>
        <link rel='stylesheet'  href='receipt.css' />
        </head>
        <body>
            ${text}
        </body>
        </html>
    `);
    receiptWindow.document.close();
})