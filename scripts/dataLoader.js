// /js/dataLoader.js
(function () {
    const BASE_URL = "http://localhost:3000/";
    const URL = BASE_URL + "api/portfolio";
    const CACHE_KEY = "portfolioData";
    const CACHE_VER = "v1"; // bumps when you change schema

    async function fetchPortfolio() {
        const res = await fetch(`${URL}?cb=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load portfolio.json");
        const data = await res.json();
        data.BASE_URL = BASE_URL;
        return data;
    }

    // public API
    window.getPortfolio = async function () {
        const cached = sessionStorage.getItem(CACHE_KEY);
        const ver = sessionStorage.getItem(CACHE_KEY + ":ver");

        if (cached && ver === CACHE_VER) {
            try { 
                const data = JSON.parse(cached);
                data.BASE_URL = BASE_URL;
                return data;
            } catch {}
        }

        const data = await fetchPortfolio();
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        sessionStorage.setItem(CACHE_KEY + ":ver", CACHE_VER);
        return data;
    };

    // optional: warm it immediately on first page load
    window.preloadPortfolio = function () { return window.getPortfolio(); };
})();
