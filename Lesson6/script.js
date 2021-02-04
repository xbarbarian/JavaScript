"use strict"

const goodsCatalogue = {
    allGoods: [
        {
            id: "Кресло",
            qty: 1,
            price: 1500,
        },
        {
            id: "Стул",
            qty: 1,
            price: 2000,
        },
        {
            id: "Стол",
            qty: 1,
            price: 800,
        },
    ],

    renderCatalogue() {
        let catalogDiv = document.getElementById('goods-list')
        catalogDiv.insertAdjacentHTML('afterbegin', "<h2> Каталог товаров: </h2>")
        catalogDiv.insertAdjacentHTML('beforeend',
            '<table class="table"> <tbody id="tbody_cat" class="tbody_cat"></tbody></table>')
        let tbody_cat = document.getElementById("tbody_cat");

        for (let good in this.allGoods) {
            let tableRow = '<tr>'
            tableRow += "<td>" + this.allGoods[good].id + "</td" + "<td> <b> Цена: </b> "
                + this.allGoods[good].price + " руб. </td>"
                + "<td>  <button class = btn_add_good_to_cart data-good_id =" + this.allGoods[good].id
                + "> Добавить в корзину </button></td></tr>";

            tbody_cat.innerHTML += tableRow
        }
        this.addEventHandlers()
    },

    addEventHandlers() {
        document.querySelector(".tbody_cat").addEventListener('click', e => this.addToBasket(e));

    },
    addToBasket(event) {
        if (!event.target.classList.contains('btn_add_good_to_cart')) return;
        const good_id = event.target.dataset.good_id;
        goodsBasket.addToBasket(good_id);
    }
}

const goodsBasket = {
    goodsInBasket: [],

    getTotalPrice() {
        return this.goodsInBasket.reduce((total, amount) => (total)+ (amount.price * amount.qty), 0)
    },

    renderBasket() {
        let basketDiv = document.getElementById('order-list')
        basketDiv.innerHTML = ""
        if (this.goodsInBasket.length === 0) {
            basketDiv.insertAdjacentHTML('afterbegin', "<h2> Корзина товаров пуста</h2>")
        }

        else {


            basketDiv.insertAdjacentHTML('afterbegin', "<h2> Корзина товаров: </h2>")
            basketDiv.insertAdjacentHTML('beforeend', '<table class="table"> <tbody id="tbody"></tbody></table>')
            let tbody = document.getElementById("tbody");



            for (let goods in this.goodsInBasket) {
                console.log(this.goodsInBasket[goods]);
                let tableRow = '<tr>'
                tableRow += "<td>" + this.goodsInBasket[goods].id + "</td" + "<td> <b> Количество: </b>"
                    + this.goodsInBasket[goods].qty + "<td> <b> Цена: </b> "
                    + this.goodsInBasket[goods].price + " руб. </td></tr>";

                tbody.innerHTML += tableRow
            }
            basketDiv.insertAdjacentHTML('beforeend', "<h2> <b> Итого: </b>   " + this.goodsInBasket.length
                + "  товаров(а) на сумму  " + this.getTotalPrice() + " руб. </h2>")

        }
    },

    addToBasket(goods_id) {
        let add_goods = goodsCatalogue.allGoods.find(x => x.id === goods_id);
        if (goodsBasket.goodsInBasket.find(x => x.id === goods_id)) {
            goodsBasket.goodsInBasket.find(x => x.id === goods_id).qty += 1
            this.renderBasket()
            return;
        }
        this.goodsInBasket.push({ ...add_goods });
        this.renderBasket()
    }

}

goodsBasket.renderBasket();
goodsCatalogue.renderCatalogue();