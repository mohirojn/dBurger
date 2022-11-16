const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    }
}

const basketBtn = document.querySelector('.wrapper__navbar-btn'),
    productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    basketModalClose = document.querySelector('.wrapper__navbar-close'),
    basketModalList = document.querySelector('.wrapper__navbar-checklist'),
    basketModalTotal = document.querySelector('.wrapper__navbar-totalprice'),
    basketModalOrder = document.querySelector('.wrapper__navbar-bottom'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')





function plusProduct(btn) {
    // Closest - это метод, который позволяет найти ближайший родительский элемент, который удовлетворяет условию
    // getAttribute - это метод, который позволяет получить значение атрибута
    let parent = btn.closest('.wrapper__list-card')
    let parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

productBtns.forEach(item => {
    item.addEventListener('click', () => {
        plusProduct(item)
    })
})


basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})

basketModalClose.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

// toLowerCase() - это метод, который позволяет привести строку к нижнему регистру

function basket() {
    const productArray = []
    for (let key in product) {
        // product[key] - это объект
        let productItem = product[key]
        const productCard = document.querySelector(`#${productItem.name.toLowerCase()}`)
        const productCardCount = productCard.querySelector('.wrapper__list-count')
        if (productItem.amount) {
            productArray.push(productItem)
            productCardCount.innerHTML = productItem.amount
            productCardCount.classList.add('active')
        } else {
            productCardCount.classList.remove('active')
            productCardCount.innerHTML = 0
        }
    }
    basketModalList.innerHTML = ''
    productArray.forEach(item => {
        basketModalList.innerHTML += cardItemBurger(item)
    })

    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
        basketBtnCount.innerHTML = allCount
    } else {
        basketBtnCount.classList.remove('active')
        basketBtnCount.innerHTML = 0
    }
    basketModalTotal.innerHTML = totalSumProduct()
}



function totalCountProduct() {
    let totalCount = 0
    for (let key in product) {
        totalCount += product[key].amount
    }
    return totalCount
}

function totalSumProduct() {
    let totalSum = 0
    for (const key in product) {
        totalSum += product[key].totalSum
    }
    return totalSum
}


function cardItemBurger(obj) {
    const {
        name,
        price,
        img,
        amount
    } = obj

    return `
        <div class="wrapper__navbar-product">
            <div class="wrapper__navbar-info">
                <img src="${img}" alt="burger" class="wrapper__navbar-productImage">
                <div class="wrapper__navbar-infoSub">
                    <p class="wrapper__navbar-infoName">${name}</p>
                    <p class="wrapper__navbar-infoPrice">${price} сум</p>
                </div>
            </div>
            <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
                <button class="wrapper__navbar-symbol" data-symbol="-">-</button>
                <span class="wrapper__navbar-count">${amount}</span>
                <button class="wrapper__navbar-symbol" data-symbol="+">+</button>
            </div>
        </div>
    `
}



window.addEventListener('click', (e) => {
    if (e.target.classList.contains('wrapper__navbar-symbol')) {
        const attr = e.target.getAttribute('data-symbol')
        const parent = e.target.closest('.wrapper__navbar-option')
        const parentId = parent.getAttribute('id').split("_")[0]
        if(attr == '-')product[parentId].amount--
        else if (attr == '+') product[parentId].amount++
        basket()
    }
})


const print = document.querySelector('.print'),
printBody = document.querySelector('.print__body'),
printFooter = document.querySelector('.print__footer')
printWrapper = document.querySelector('.print__wrapper')
productCount = document.querySelectorAll('wrapper__list-count')

console.log(printBody);

basketModalOrder.addEventListener('click', () => {
printBody.innerHTML = ''
for(const key in product) {
    const {name,totalSum, amount} = product[key]
    
    if(amount) {
        printWrapper.classList.add('active')
        print.classList.add('active')
        printBody.innerHTML += `
        <div class="print__body-item">
            <p class="print__body-item_name">
                <span class="name">${name}</span>
                <span class="count">${amount}</span>
            </p>
            <p>${totalSum}</p>
        </div>
    `
    }
    printFooter.innerHTML = `Общая стоимость: ${totalSumProduct()}`
    basketModalList.innerHTML = ''
    basketModalTotal.innerHTML = 0
    basketBtnCount.classList.remove('active')
    productCount.forEach(item => {
        item.classList.remove('active')
    })
}
    for (const key in product) {
    product[key].amount = 0
}
setTimeout(() => {
    printWrapper.classList.remove('active')
    print.classList.remove('active')
}, 5000);    
})












