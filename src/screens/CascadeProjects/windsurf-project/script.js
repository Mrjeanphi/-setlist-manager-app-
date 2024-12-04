document.addEventListener('DOMContentLoaded', () => {
    const temperatureDisplay = document.getElementById('temperature');
    const statusDisplay = document.getElementById('status');
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');

    let currentTemperature = 20;

    function updateTemperature(value) {
        currentTemperature = value;
        temperatureDisplay.textContent = currentTemperature;
        updateStatus();
        
        // Ajout d'une couleur de fond en fonction de la température
        const display = document.querySelector('.thermometer-display');
        if (currentTemperature < 0) {
            display.style.background = 'linear-gradient(145deg, #e6f7ff, #cce5ff)';
        } else if (currentTemperature < 15) {
            display.style.background = 'linear-gradient(145deg, #ffffff, #e6f7ff)';
        } else if (currentTemperature < 25) {
            display.style.background = 'linear-gradient(145deg, #ffffff, #e6ffe6)';
        } else if (currentTemperature < 35) {
            display.style.background = 'linear-gradient(145deg, #fff7e6, #ffe6cc)';
        } else {
            display.style.background = 'linear-gradient(145deg, #ffe6e6, #ffcccc)';
        }
    }

    function updateStatus() {
        if (currentTemperature < 0) {
            statusDisplay.textContent = "Gelé";
            statusDisplay.style.color = "#0077be";
        } else if (currentTemperature < 15) {
            statusDisplay.textContent = "Froid";
            statusDisplay.style.color = "#4169e1";
        } else if (currentTemperature < 25) {
            statusDisplay.textContent = "Normal";
            statusDisplay.style.color = "#32cd32";
        } else if (currentTemperature < 35) {
            statusDisplay.textContent = "Chaud";
            statusDisplay.style.color = "#ffa500";
        } else {
            statusDisplay.textContent = "Très chaud";
            statusDisplay.style.color = "#ff4500";
        }
    }

    increaseButton.addEventListener('click', () => {
        updateTemperature(currentTemperature + 1);
    });

    decreaseButton.addEventListener('click', () => {
        updateTemperature(currentTemperature - 1);
    });

    // Initialisation
    updateStatus();
});
