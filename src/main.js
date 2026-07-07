import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { currencies } from './currencies.js';


const selects = document.querySelectorAll("form div select");
const resultPassage = document.querySelector("#result-passage");
const fromInput = document.querySelector("#from-amount");
const toInput = document.querySelector("#to-amount");
const swapButton = document.querySelector("#swap-button");
const date = document.querySelector("#date");

let currentRate = null;

class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = "ApiError";
    }
}

const getExchangeRate = async (from, to) => {
    try {

        const response = await fetch(`/api/latest?base=${from}`);

        if (!response.ok) {
            throw new ApiError(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.result !== "success") {
            throw new ApiError(`API request failed: ${data.result}`);
        }

        currentRate = Number(data.conversion_rates[to]);

        const lastUpdate = new Date(data.time_last_update_utc);
        date.innerText = lastUpdate.toDateString();

        resultPassage.classList.remove("text-red-700");
        resultPassage.innerText = `1 ${from} = ${currentRate} ${to}`;

    } catch (err) {

        if (err instanceof ApiError) {

            resultPassage.innerText = err.message;

        } else {

            resultPassage.innerText = "Couldn't fetch rates — check your internet connection and try again.";
        }

        resultPassage.classList.add("text-red-700");

    }
}

const printResult = () => {
    const fromAmount = Number(fromInput.value);
    const toAmount = currentRate * fromAmount;

    toInput.placeholder = "";
    toInput.value = String(toAmount.toFixed(4));
}

selects.forEach(select => {

    for (const [code, name] of Object.entries(currencies)) {

        const newOption = document.createElement("option");

        newOption.value = code;
        newOption.innerText = name;

        select.append(newOption);

        if (select.id === "from-currency" && code === "USD") {

            newOption.selected = "selected";

        } else if (select.id === "to-currency" && code === "PKR") {

            newOption.selected = "selected";

        }
    }
});

selects.forEach(select => {

    select.addEventListener("change", async () => {
        await getExchangeRate(selects[0].value, selects[1].value);

        printResult();
    })
});

fromInput.addEventListener("input", printResult);

swapButton.addEventListener("click", async () => {

    [selects[0].value, selects[1].value] = [selects[1].value, selects[0].value];

    currentRate = 1 / currentRate;

    await await getExchangeRate(selects[0].value, selects[1].value);

    printResult();
});

await getExchangeRate(selects[0].value, selects[1].value);