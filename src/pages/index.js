import './index.scss'

const moreButton = document.querySelector('.types__more')
const hiddenItems = Array.from(document.querySelectorAll('.types_hidden'));
const filterOpen = document.querySelector('.types__filter');
const filterClose = document.querySelector('.filter__close');
const filterOverlay = document.querySelector('.filter__overlay');
const filter = document.querySelector('.filter');
const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const range = document.querySelector(".slider .progress");
const price1 = document.querySelector(".input-min")
const price2 = document.querySelector(".input-max")
const popup = document.querySelector('.popup');
const shop = document.querySelector('.katalog__shop');
const shop2 = document.querySelector('.katalog__shop-2')
const popupClose = document.querySelector('.popup__close');
let priceGap = 1000;

function openPopup() {
  popup.classList.add('popup_opened')
}
function closePopup() {
  popup.classList.remove('popup_opened');
}

function openMenuhandler() {
  filterOverlay.classList.add('filter__overlay_active');
  filter.classList.remove('filter_disable');
}
function closeMenu() {
  filterOverlay.classList.remove('filter__overlay_active');
  filter.classList.add('filter_disable');
}
function moreHandler() {
  if(hiddenItems.find(item => item.classList.contains('types_visible'))) {
    hiddenItems.forEach(item => item.classList.remove('types_visible'))
    moreButton.textContent = "Показать еще"
  } else {
  hiddenItems.forEach(item => item.classList.add('types_visible'))
  moreButton.textContent = 'Свернуть'
  }
}
moreButton.addEventListener('click', moreHandler);
filterOpen.addEventListener('click', openMenuhandler);
filterClose.addEventListener('click', closeMenu);
popupClose.addEventListener('click', closePopup);
shop.addEventListener('click', openPopup)
shop2.addEventListener('click', openPopup)


priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(price1.value),
        maxPrice = parseInt(price2.value);

        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            price1.value = minVal;
            price2.value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});
