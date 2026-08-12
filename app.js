let drinks =
JSON.parse(localStorage.getItem("drinks")) || [
    {name:"Bier",qty:0,price:3},
    {name:"Weizen",qty:0,price:3.5},
    {name:"Cola",qty:0,price:2.5}
];

let deductions =
JSON.parse(localStorage.getItem("deductions")) || [
    {name:"Gutscheine",qty:0,price:5},
    {name:"Biermarken",qty:0,price:3}
];

function save(){

    localStorage.setItem(
        "drinks",
        JSON.stringify(drinks)
    );

    localStorage.setItem(
        "deductions",
        JSON.stringify(deductions)
    );
}

function addDrink(){

    drinks.push({
        name:"Neues Getränk",
        qty:0,
        price:0
    });

    render();
}

function addDeduction(){

    deductions.push({
        name:"Neuer Abzug",
        qty:0,
        price:0
    });

    render();
}

function deleteDrink(index){
    drinks.splice(index,1);
    render();
}

function deleteDeduction(index){
    deductions.splice(index,1);
    render();
}

function render(){

    let drinkHtml = "";

    drinks.forEach((d,index)=>{

        drinkHtml += `
        <div class="row">
            <input value="${d.name}"
             onchange="drinks[${index}].name=this.value;save();">

            <input type="number"
             value="${d.qty}"
             onchange="drinks[${index}].qty=parseFloat(this.value)||0;calculate();">

            <input type="number"
             value="${d.price}"
             onchange="drinks[${index}].price=parseFloat(this.value)||0;calculate();">

            <button class="delete"
             onclick="deleteDrink(${index})">
                🗑
            </button>
        </div>`;
    });

    document.getElementById("drinkList").innerHTML =
        drinkHtml;

    let deductionHtml = "";

    deductions.forEach((d,index)=>{

        deductionHtml += `
        <div class="row">
            <input value="${d.name}"
             onchange="deductions[${index}].name=this.value;save();">

            <input type="number"
             value="${d.qty}"
             onchange="deductions[${index}].qty=parseFloat(this.value)||0;calculate();">

            <input type="number"
             value="${d.price}"
             onchange="deductions[${index}].price=parseFloat(this.value)||0;calculate();">

            <button class="delete"
             onclick="deleteDeduction(${index})">
                🗑
            </button>
        </div>`;
    });

    document.getElementById("deductionList").innerHTML =
        deductionHtml;

    calculate();
}

function calculate(){

    save();

    let revenue = 0;
    let deductionTotal = 0;

    drinks.forEach(d=>{
        revenue += d.qty * d.price;
    });

    deductions.forEach(d=>{
        deductionTotal += d.qty * d.price;
    });

    const provisionRate =
        parseFloat(
            document.getElementById("provision").value
        ) || 0;

    const provision =
        revenue * provisionRate / 100;

    const payout =
        revenue -
        provision -
        deductionTotal;

    document.getElementById("output")
    .innerHTML =
    `
    Umsatz: ${revenue.toFixed(2)} €<br>
    Provision: ${provision.toFixed(2)} €<br>
    Abzüge: ${deductionTotal.toFixed(2)} €<hr>
    Auszahlung: <b>${payout.toFixed(2)} €</b>
    `;
}

render();
