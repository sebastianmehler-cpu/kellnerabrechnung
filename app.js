let drinks = [];
let deductions = [];

function addDrink() {

    drinks.push({
        name:"Neues Getränk",
        qty:0,
        price:0
    });

    render();
}

function addDeduction() {

    deductions.push({
        name:"Neuer Abzug",
        qty:0,
        price:0
    });

    render();
}

function render() {

    localStorage.setItem(
        "drinks",
        JSON.stringify(drinks)
    );

    localStorage.setItem(
        "deductions",
        JSON.stringify(deductions)
    );
}

function calculate() {

    let revenue = 0;
    let deductionTotal = 0;

    drinks.forEach(d=>{
        revenue += d.qty * d.price;
    });

    deductions.forEach(d=>{
        deductionTotal += d.qty * d.price;
    });

    let provisionRate =
        Number(document.getElementById("provision").value);

    let provision =
        revenue * provisionRate / 100;

    let payout =
        revenue - provision - deductionTotal;

    document.getElementById("result").innerHTML =
        `
        Umsatz: ${revenue.toFixed(2)} €
        <br>
        Provision: ${provision.toFixed(2)} €
        <br>
        Abzüge: ${deductionTotal.toFixed(2)} €
        <hr>
        Auszahlung: ${payout.toFixed(2)} €
        `;
}