const countryDropdown = document.getElementById("country")
const listItem = [] 

countryDropdown.addEventListener("click",getCountry)

async function getCountry(){
    const url = "https://restcountries.com/v2/all"
    const res = await fetch(url)
    const items = await res.json() 
    countryDropdown.innerHTML = ""
    items.forEach(data=>{
        const option = document.createElement("option")
        listItem.push(option)
        option.innerHTML = `
            <h4>${data.name}</h4>
        `
        countryDropdown.appendChild(option)
    })
}
/*Cart list item*/
const originalPrice = 1675, discountedPrice = 1172;
const quantityInput = document.getElementById('cart-quantity-item-96346206');
const subtotalElement = document.querySelector('.orderiteminfo__value__subtotal');
const originalPriceElement = document.querySelector('.pricing__prices__value--original');
const discountedPriceElement = document.querySelector('.pricing__prices__value--discount');
const discountPercentageElement = document.querySelector('.pricing__info__percentage');

function updatePrice() {
    const quantity = parseInt(quantityInput.value);
    const newSubtotal = discountedPrice * quantity;
    const originalTotal = originalPrice * quantity;

    originalPriceElement.textContent = `฿ ${originalTotal.toFixed(2)}`;
    discountedPriceElement.textContent = `฿ ${newSubtotal.toFixed(2)}`;
    subtotalElement.textContent = `฿ ${newSubtotal.toFixed(2)}`;
    discountPercentageElement.textContent = `${((originalPrice - discountedPrice) / originalPrice * 100).toFixed(0)}% off`;
}

quantityInput.addEventListener('input', updatePrice);
updatePrice();



