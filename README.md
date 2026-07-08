# 💱 Currency Exchange App

A modern and responsive currency converter built with **HTML, JavaScript, Tailwind CSS, and Vite**. The application fetches real-time exchange rates from **ExchangeRate-API** and allows users to quickly convert amounts between multiple international currencies.

The project uses **Cloudflare Pages Functions as a serverless API layer** to securely handle API requests and keep sensitive API credentials away from the client-side code.

🔗 **Live Demo:** https://currency-exchange-app-30o.pages.dev/

---

## ✨ Features

* 🌍 Convert between multiple international currencies
* 📈 Real-time exchange rates powered by ExchangeRate-API
* 🔄 One-click currency swap functionality
* ⚡ Instant conversion while typing
* 📅 Displays the latest exchange rate update date
* 🏳️ Displays country and currency names for easier selection
* 📱 Fully responsive design for desktop and mobile devices
* ⚠️ User-friendly error handling for network and API failures
* 🔐 Secure API key handling through Cloudflare Pages Functions

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* JavaScript (ES6+)
* Tailwind CSS
* Vite
* Font Awesome

### Backend / Serverless

* Cloudflare Pages Functions
* Environment variables
* Serverless API proxy pattern

### API

* ExchangeRate-API

---

## 📸 Screenshots
### Desktop View
![Desktop View](/src/assets/Screenshot_01.png)

### Mobile View
![Mobile View](/src/assets/Screenshot_02.png)

---

# 🏗️ API Architecture

Instead of exposing the ExchangeRate-API key directly in the browser, the application uses a Cloudflare Pages Function as a secure middle layer.

The request flow:

```text
User Interface
      |
      | fetch("/api/latest?base=USD")
      ↓
Cloudflare Pages Function
      |
      | Uses context.env.EXCHANGE_API_KEY
      ↓
ExchangeRate-API
      |
      ↓
Currency exchange data returned to the application
```

This approach keeps the API credential secure while allowing the frontend application to consume live exchange rate data.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Adeel-Alam-Git/Currency-Exchange-App.git

cd Currency-Exchange-App
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

The application uses Cloudflare Pages Functions to access the API key securely.

For local Cloudflare Function development, create a `.dev.vars` file in the project root:

```env
EXCHANGE_API_KEY=your_api_key
```

The function accesses the variable using:

```javascript
context.env.EXCHANGE_API_KEY
```

For production deployment, add the variable as a secret in:

```
Cloudflare Pages
→ Settings
→ Environment Variables
```

---

## 💻 Development

Start the Vite development server:

```bash
npm run dev
```

---

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

---

# 🌐 API

This project uses **ExchangeRate-API** to retrieve live currency conversion rates.

The frontend communicates with a custom API endpoint:

```
/api/latest?base=USD
```

The endpoint is handled by a Cloudflare Pages Function:

```
functions/
└── api/
    └── latest.js
```

The function securely adds the API key and forwards the request to ExchangeRate-API.

---

# 📚 What I Learned

While building this project, I gained hands-on experience with:

* Working with REST APIs using the Fetch API
* Handling asynchronous JavaScript with `async` / `await`
* Managing errors using `try...catch` and custom error classes
* DOM manipulation and event-driven programming
* Building responsive interfaces with Tailwind CSS
* Using modern frontend tooling with Vite
* Working with environment variables
* Protecting API credentials using serverless functions
* Creating a frontend application with a lightweight backend layer
* Deploying a production-ready application using Cloudflare Pages

---

# 🚀 Deployment

The application is deployed using **Cloudflare Pages**.

The deployment process includes:

* Building the application with Vite
* Deploying the generated production assets
* Deploying Cloudflare Pages Functions
* Managing secure environment variables for production

---

# 🔮 Future Improvements

Possible improvements for future versions:

* Migrate the frontend to React
* Add currency exchange history charts
* Add favorite currencies
* Add offline caching
* Add automated testing
* Improve accessibility features
* Add more advanced API response handling

---

# 📄 License

This project is licensed under the MIT License.

Feel free to fork, modify, and use it for learning or personal projects.
