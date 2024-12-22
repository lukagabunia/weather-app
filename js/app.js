import { CONFIG } from "./config.js";
const API_BASE = "http://api.weatherapi.com/v1/current.json";
const API_KEY = CONFIG.API_KEY;

const updateWeatherCard = async (card) => {
  const location = card.getAttribute("data-location");
  try {
    const { location: loc, current } = await fetch(
      `${API_BASE}?key=${API_KEY}&q=${location}`
    ).then((_) => _.json());
    card.querySelector(".city-location").innerText = loc.name;
    card.querySelector(".weather-status").innerText = current.condition.text;
    card.querySelector(".temp-number").innerText = `${current.temp_c} °C`;
    card.style.backgroundImage = `url(${current.condition.icon})`;
  } catch (error) {
    console.error(`failed to fetch weather data for ${location}`, error);
    card.querySelector(".city-location").innerText = "Error loading data";
  }
};
const initializeWeatherCards = () => {
  const cards = document.querySelectorAll(".weather-card");
  cards.forEach((card) => {
    updateWeatherCard(card);
  });
};
initializeWeatherCards();
