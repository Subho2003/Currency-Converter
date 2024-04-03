const date = new Date();
y = date.getFullYear();
m = date.getMonth() + 1;
d = date.getDate();
if(m<10 && d<10) {
  currDate = `${y}-0${m}-0${d}`;
} else if(m>10 && d<10) {
  currDate = `${y}-${m}-0${d}`;
} else if(m<10 && d>10) {
  currDate = `${y}-0${m}-${d}`;
} else {
  currDate = currDate;
}
const baseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${currDate}/v1/currencies`;
const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for(let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}


const updateFlag = (ele) => {
  let currCode = ele.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  img.src = newSrc;
}

const updateExchangeRate = async () => {
  let amt = document.querySelector(".amount input");
  let amtVal = amt.value;
  if(amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amt.value = 1;
  }
  
  const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
  console.log(URL)
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  
  let finalAmount = (amtVal * rate);
  let MSG = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  msg.innerText = MSG;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
})

window.addEventListener("load", () => {
  updateExchangeRate();
})