export async function onRequestGet(context) {

    const BASE_URL = `https://v6.exchangerate-api.com/v6/${context.env.EXCHANGE_API_KEY}/latest/`; // BASE_URL + from currency code
    
    const url = new URL(context.request.url);
    const base = url.searchParams.get("base");

    return fetch(`${BASE_URL}${base}`);
}