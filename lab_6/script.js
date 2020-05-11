var basket;
var goodname;
var goodprice = 0;

class Good{
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Basket{
    goodList = [];
    constructor(basket) {
        if (basket==null) return;
        for (let good of basket.goodList){
            let g = new Good(good.name, good.price);
            g.count = good.count;
            this.goodList.push(g);
        }
    }
    putProduct(product){
        for (let good of this.goodList){
            if (good.name === product.name){
                good.count+=1;
                return;
            }
        }
        product.count = 1;
        this.goodList.push(product);
    }
    countTotalNumber(){
        let count = 0;
        for (let good of this.goodList){
            count+=good.count;
        }
        return count;
    }

    countTotalPrice(){
        let count = 0;
        for (let good of this.goodList){
            count+=good.price*good.count;
        }
        return count;
    }

}

function initPage(){
    let JSONBasket = localStorage.getItem("basket");
    if (JSONBasket!=null){
        try {
            let temp = JSON.parse(JSONBasket);
            basket = new Basket(temp);
            console.log(basket);
        }catch (e) {
            basket = null;
        }
    }
    if (basket==null){
        basket = new Basket();
    }
    let goodNameField = document.getElementById("name");
    if (goodNameField!=null){
        goodname = goodNameField.innerHTML;
    }
    let goodPriceField = document.getElementById("price");
    if (goodPriceField!=null){
        goodprice = goodPriceField.innerHTML;
    }
    let buyButton = document.getElementById("buy-button");
    if (buyButton != null){
        buyButton.onclick = addGoodToBasket;
    }
    let clearButton = document.getElementById("clear-button");
    if (clearButton != null){
        clearButton.onclick = clearBasket;
        if (basket.countTotalNumber()!==0){
            basketToScreen();
        }else {
            showEmptyBasket();
        }

    }
}

function addGoodToBasket(){
    let product = new Good(goodname, parseInt(goodprice));
    basket.putProduct(product);
    let JSONBasket = JSON.stringify(basket);
    localStorage.setItem("basket", JSONBasket);
    alert("Товар добавлен в корзину");
    console.log("basket size: "+basket.countTotalNumber());
    console.log("basket price: "+basket.countTotalPrice());
}

function clearBasket(){
    if (basket.countTotalNumber()===0) return;
    basket = new Basket();
    let JSONBasket = JSON.stringify(basket);
    localStorage.setItem("basket", JSONBasket);
    deleteBasketFromScreen();
    console.log("basket size: "+basket.countTotalNumber());
    console.log("basket price: "+basket.countTotalPrice());
}

function basketToScreen(){
    let basketPlace = document.getElementById("basket-place");
    let newDiv = document.createElement("div");
    newDiv.className = "newDiv";
    newDiv.innerHTML = basketToHTML();
    basketPlace.appendChild(newDiv);
}

function deleteBasketFromScreen() {
    let basketPlace = document.getElementById("basket-place");
    basketPlace.innerHTML = "";
    showEmptyBasket();
}

function basketToHTML(){
    let htmlText = "";
    for (let good of basket.goodList){
        htmlText+="<div class=\"row\">\n" +
            "        <p class=\"col-4\">"+good.name+"</p>\n" +
            "        <p class=\"col-2\">"+good.price+"</p>\n" +
            "        <p class=\"col-1\">"+good.count+"</p>\n" +
            "    </div>\n" +
            "    <div class=\"row\">\n" +
            "        <div class=\"line col-4\"></div>\n" +
            "        <div class=\"line col-2\"></div>\n" +
            "        <div class=\"line col-1\"></div>\n" +
            "    </div>"
    }
    htmlText+="\n<div class=\"row\">\n" +
        "        <h3 style=\"margin-top: 20px; margin-bottom: 20px\"><b>Итого: "+basket.countTotalPrice()+"</b></h3>\n" +
        "    </div>"
    return htmlText;
}

function showEmptyBasket(){
    let basketPlace = document.getElementById("basket-place");
    let newDiv = document.createElement("div");
    newDiv.className = "newDiv";
    newDiv.innerHTML= "\n<div class=\"row\">\n" +
        "        <p class=\"col-7\" style=\"color: darkgray\">Корзина пуста</p>\n" +
        "    </div>";
    basketPlace.appendChild(newDiv);
}

window.onload = initPage;

