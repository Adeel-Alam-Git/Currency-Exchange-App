import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { currencies } from './currencies.js';

const BASE_URL = `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API_KEY}/latest/` // BASE_URL + from currency code

const date = document.querySelector("#date");
const selects = document.querySelectorAll("form div select");
const swapButton = document.querySelector("#swap-button");
const fromAmount = document.querySelector("#from-amount");
const toAmount = document.querySelector("#to-amount");
const fromSelect = document.querySelector("#from-currency");
const toSelect = document.querySelector("#to-currency");
const resultPassage = document.querySelector("#result-passage");

const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

const getExchangeRate = async (from, to) => {

    try {
        const response = await fetch(`${BASE_URL}${from}`);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        if (data.result !== "success") {
            return null;
        }

        const lastUpdate = new Date(data.time_last_update_utc);
        date.innerText = lastUpdate.toDateString();

        const rate = data.conversion_rates[to];

        resultPassage.classList.remove("text-red-700");
        resultPassage.innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;

        return rate;

    } catch (err) {
        return null;
    }
}

const calculate = async (from, to, fromAmount) => {
    const rate = await getExchangeRate(from, to);

    if (rate == null) {
        resultPassage.innerText = "Couldn't fetch rates — check your connection and try again.";
        resultPassage.classList.add("text-red-700");
        return;
    }

    return (fromAmount * Number(rate)).toFixed(2);
}

const printResult = async () => {
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;
    const amount = Number(fromAmount.value);

    toAmount.value = "";
    toAmount.placeholder = "Calculating...";

    const result = await calculate(fromCurrency, toCurrency, amount);

    toAmount.value = result;
    toAmount.placeholder = "";
}

for (let select of selects) {
    for (const [code, name] of Object.entries(currencies)) {
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.innerText = name;

        select.append(newOption);

        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && code === "PKR") {
            newOption.selected = "selected";
        }
    }
}

for (let select of selects) {
    select.addEventListener("change", printResult);
}

fromAmount.addEventListener("input", debounce(printResult, 500));

swapButton.addEventListener("click", () => {
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    printResult();
}); 