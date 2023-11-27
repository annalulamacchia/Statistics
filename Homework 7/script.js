// Include libraries or helper functions as needed
function clearSimulation() {
    // Svuota il canvas
    const canvas = document.getElementById('simulationChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('customSDE').value = '';
}

function runSimulation() {
    // Get user inputs
    const processType = document.getElementById('processType').value;
    const numSteps = parseInt(document.getElementById('numSteps').value);
    const timeDelta = parseInt(document.getElementById('timeDelta').value);
    const customSDE = document.getElementById('customSDE').value;
    var results = [];

    if (customSDE != '') {
        // If a custom SDE is provided, use it
        results = simulateSDE(customSDE, numSteps, timeDelta);
    }
    else {
        // Run simulations based on selected process
        results = simulateProcess(processType, numSteps, timeDelta);
    }

    // Display results
    if(processType == "heston" || processType == "chenModel") {
        displayResults2(results);
    }
    else {
        displayResults(results);
    }
}

function simulateSDE(sdeExpression, numSteps, timeDelta) {
    const trajectories = [];
    let x = 0; // Initial value, you can customize this

    for (let i = 0; i < numSteps; i++) {
        const dW = generateRandomNormal(); // Generate random value based on normal distribution
        x = evaluateSDE(sdeExpression, x, i * timeDelta, timeDelta, dW);
        trajectories.push(x);
    }

    return trajectories;
}

function evaluateSDE(sdeExpression, x, t, dt, dW) {
    const customSDE = math.compile(sdeExpression);
    const result = customSDE.evaluate({ x: x, t: t, dt: dt, dW: dW });
    return result;
}

function simulateProcess(processType, numSteps, timeDelta) {
    var trajectories = [];

    if(processType == "arithmeticBrownian") {
        const initialValue = parseFloat(document.getElementById('initialValueArit').value);
        const drift = parseFloat(document.getElementById('driftArit').value);
        const volatility = parseFloat(document.getElementById('volatilityArit').value);
        trajectories = computeArithmeticBrownian(initialValue, drift, volatility, numSteps, timeDelta);
    }
    else if(processType == "geometricBrownian") {
        const initialValue = parseFloat(document.getElementById('initialValueGeo').value);
        const drift = parseFloat(document.getElementById('driftGeo').value);
        const volatility = parseFloat(document.getElementById('volatilityGeo').value);
        trajectories = computeGeometricBrownian(initialValue, drift, volatility, numSteps, timeDelta);
    }
    else if(processType == "meanReverting") {
        const meanReversionRate = parseFloat(document.getElementById('meanReversionRateMean').value);
        const longTermMean = parseFloat(document.getElementById('longTermMeanMean').value);
        const volatility = parseFloat(document.getElementById('volatilityMean').value);
        trajectories = computeOrnsteinUhlenbeck(meanReversionRate, longTermMean, volatility, numSteps, timeDelta);
    }
    else if(processType == "vasicek") {
        const meanReversionRate = parseFloat(document.getElementById('meanReversionRateVas').value);
        const longTermMean = parseFloat(document.getElementById('longTermMeanVas').value);
        const volatility = parseFloat(document.getElementById('volatilityVas').value);
        trajectories = computeVasicek(meanReversionRate, longTermMean, volatility, numSteps, timeDelta);
    }
    else if(processType == "hullWhite") {
        const meanReversionRate = parseFloat(document.getElementById('meanReversionRateHull').value);
        const longTermMean = parseFloat(document.getElementById('longTermMeanHull').value);
        const meanVolatility = parseFloat(document.getElementById('meanVolatilityHull').value);
        trajectories = computeHullWhite(meanReversionRate, longTermMean, meanVolatility, numSteps, timeDelta);
    }
    else if(processType == "cir") {
        const meanReversionRate = parseFloat(document.getElementById('meanReversionRateCir').value);
        const longTermMean = parseFloat(document.getElementById('longTermMeanCir').value);
        const volatility = parseFloat(document.getElementById('volatilityCir').value);
        trajectories = computeCIR(meanReversionRate, longTermMean, volatility, numSteps, timeDelta);
    }
    else if(processType == "blackKarasinski") {
        const meanReversionRate = parseFloat(document.getElementById('meanReversionRateBlack').value);
        const longTermMean = parseFloat(document.getElementById('longTermMeanBlack').value);
        const volatility = parseFloat(document.getElementById('volatilityBlack').value);
        const eta = parseFloat(document.getElementById('etaBlack').value);
        const lambda = parseFloat(document.getElementById('lambdaBlack').value);
        trajectories = computeBlackKarasinski(meanReversionRate, longTermMean, volatility, eta, lambda, numSteps, timeDelta);
    }
    else if(processType == "heston") {
        const initialValue = parseFloat(document.getElementById('initialValueHeston').value);
        const meanReversionRate = parseFloat(document.getElementById('meanReversionRateHeston').value);
        const longTermVolatility = parseFloat(document.getElementById('longTermVolatilityHeston').value);
        const volatilityOfVolatility = parseFloat(document.getElementById('volatilityOfVolatilityHeston').value);
        const correlation = parseFloat(document.getElementById('correlationHeston').value);
        trajectories = computeHeston(initialValue, meanReversionRate, longTermVolatility, volatilityOfVolatility, correlation, numSteps, timeDelta);
    }
    else if(processType == "chenModel") {
        const initialValue = parseFloat(document.getElementById('initialValueChen').value);
        const meanReversionRate = parseFloat(document.getElementById('meanReversionRateChen').value);
        const longTermVolatility = parseFloat(document.getElementById('longTermVolatilityChen').value);
        const volatilityOfVolatility = parseFloat(document.getElementById('volatilityOfVolatilityChen').value);
        const jumpIntensity = parseFloat(document.getElementById('jumpIntensityChen').value);
        const jumpVolatility = parseFloat(document.getElementById('jumpVolatilityChen').value);
        trajectories = computeChen(initialValue, meanReversionRate, longTermVolatility, volatilityOfVolatility, jumpIntensity, jumpVolatility, numSteps, timeDelta);
    }
    else if(processType == "poisson") {
        const lambda = parseFloat(document.getElementById('lambdaPoisson').value);
        const numIntervals = parseInt(document.getElementById('numIntervalsPoisson').value);
        trajectories = computePoisson(lambda, numIntervals);
    }
    else if(processType == "eulerMaruyama") {
        const initialValue = parseFloat(document.getElementById('initialValueEu').value);
        trajectories = computeEulerMaruyama(initialValue, numSteps, timeDelta);
    }
    else if(processType == "milstein") {
        const initialValue = parseFloat(document.getElementById('initialValueMil').value);
        trajectories = computeMilstein(initialValue, numSteps, timeDelta);
    }
    else if(processType == "rungeKutta") {
        const initialValue = parseFloat(document.getElementById('initialValueRK').value);
        trajectories = computeRungeKutta(initialValue, numSteps, timeDelta);
    }
    else if(processType == "heuns") {
        const initialValue = parseFloat(document.getElementById('initialValueHeuns').value);
        trajectories = computeHeunsMethod(initialValue, numSteps, timeDelta);
    }
    return trajectories;
}

function computeArithmeticBrownian(initialValue, drift, volatility, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        // Generate a random value based on normal distribution (standard normal)
        const randomValue = generateRandomNormal();

        // Update the value using the Arithmetic Brownian Motion formula
        const driftTerm = drift * timeDelta;
        const volatilityTerm = volatility * randomValue * Math.sqrt(timeDelta);

        value += driftTerm + volatilityTerm;

        trajectories.push(value);
    }

    return trajectories;
}

function computeGeometricBrownian(initialValue, drift, volatility, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        // Generate a random value based on normal distribution (standard normal)
        const randomValue = generateRandomNormal();

        // Update the stock price using the Geometric Brownian Motion formula (Black-Scholes)
        const driftTerm = (drift - 0.5 * volatility ** 2) * timeDelta;
        const volatilityTerm = volatility * randomValue * Math.sqrt(timeDelta);

        value *= Math.exp(driftTerm + volatilityTerm);

        trajectories.push(value);
    }

    return trajectories;
}

function computeOrnsteinUhlenbeck(meanReversionRate, longTermMean, volatility, numSteps, timeDelta) {
    const trajectories = [];
    let level = 0; // Initial level (you can customize this)

    for (let i = 0; i < numSteps; i++) {
        // Generate a random value based on normal distribution (standard normal)
        const randomValue = generateRandomNormal();

        // Update the level using the Ornstein–Uhlenbeck formula
        const meanDiff = meanReversionRate * (longTermMean - level) * timeDelta;
        const volatilityDiff = volatility * randomValue * Math.sqrt(timeDelta);

        level += meanDiff + volatilityDiff;

        trajectories.push(level);
    }

    return trajectories;
}

function computeVasicek(meanReversionRate, longTermMean, volatility, numSteps, timeDelta) {
    const trajectories = [];
    let level = longTermMean; // Start at the long-term mean (you can customize this)

    for (let i = 0; i < numSteps; i++) {
        // Generate a random value based on normal distribution (standard normal)
        const randomValue = generateRandomNormal();

        // Update the level using the Vasicek formula
        const meanDiff = meanReversionRate * (longTermMean - level) * timeDelta;
        const volatilityDiff = volatility * randomValue * Math.sqrt(timeDelta);

        level += meanDiff + volatilityDiff;

        trajectories.push(level);
    }

    return trajectories;
}

function computeHullWhite(meanReversionRate, longTermMean, meanVolatility, numSteps, timeDelta) {
    const trajectories = [];
    let level = longTermMean; // Start at the long-term mean (you can customize this)
    let volatilityLevel = meanVolatility; // Start at the mean volatility (you can customize this)

    for (let i = 0; i < numSteps; i++) {
        // Generate random values based on normal distribution (standard normal)
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

        // Update the level using the Hull–White formula
        const meanDiff = meanReversionRate * (longTermMean - level) * timeDelta;
        const volatilityDiff = volatilityLevel * randomValue1 * Math.sqrt(timeDelta);
        const meanVolatilityDiff = meanVolatility * Math.sqrt(timeDelta) * randomValue2;

        level += meanDiff + volatilityDiff;
        volatilityLevel += meanVolatilityDiff;

        trajectories.push(level);
    }

    return trajectories;
}

function computeCIR(meanReversionRate, longTermMean, volatility, numSteps, timeDelta) {
    const trajectories = [];
    let level = longTermMean; // Start at the long-term mean (you can customize this)

    for (let i = 0; i < numSteps; i++) {
        // Generate random values based on normal distribution (standard normal)
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

        // Update the level using the Cox–Ingersoll–Ross formula
        const meanDiff = meanReversionRate * (longTermMean - level) * timeDelta;
        const volatilityDiff = volatility * Math.sqrt(level) * randomValue1 * Math.sqrt(timeDelta);
        const meanVolatilityDiff = 0.25 * volatility ** 2 * timeDelta - (volatility ** 2 / 2) * timeDelta + volatility * Math.sqrt(level) * randomValue2 * Math.sqrt(timeDelta);

        level += meanDiff + volatilityDiff + meanVolatilityDiff;

        trajectories.push(level);
    }

    return trajectories;
}

function computeBlackKarasinski(meanReversionRate, longTermMean, volatility, eta, lambda, numSteps, timeDelta) {
    const trajectories = [];
    let level = longTermMean; // Start at the long-term mean (you can customize this)

    for (let i = 0; i < numSteps; i++) {
        // Generate random values based on normal distribution (standard normal)
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

        // Update the level using the Black–Karasinski formula
        const meanDiff = meanReversionRate * (longTermMean - level) * timeDelta;
        const volatilityDiff = volatility * Math.sqrt(level) * randomValue1 * Math.sqrt(timeDelta);
        const meanVolatilityDiff = eta * (lambda - level) * timeDelta;
        const volatilityVolatilityDiff = volatility * Math.sqrt(level) * randomValue2 * Math.sqrt(timeDelta);

        level += meanDiff + volatilityDiff + meanVolatilityDiff + volatilityVolatilityDiff;

        trajectories.push(level);
    }

    return trajectories;
}

function computeHeston(initialValue, meanReversionRate, longTermVolatility, volatilityOfVolatility, correlation, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;
    let volatility = longTermVolatility; // Start at the long-term volatility (you can customize this)

    for (let i = 0; i < numSteps; i++) {
        // Generate random values based on normal distribution (standard normal)
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

        // Update the price and volatility using the Heston model
        const priceDiff = meanReversionRate * (longTermVolatility - volatility) * timeDelta;
        const volatilityDiff = volatilityOfVolatility * Math.sqrt(volatility) * randomValue1 * Math.sqrt(timeDelta);
        const priceVolatilityCorrelation = correlation * volatility * randomValue2 * Math.sqrt(timeDelta);

        value *= Math.exp(priceDiff - 0.5 * volatility * timeDelta + priceVolatilityCorrelation);
        volatility += volatilityDiff;

        trajectories.push({ value, volatility });
    }

    return trajectories;
}

function computeChen(initialValue, meanReversionRate, longTermVolatility, volatilityOfVolatility, jumpIntensity, jumpVolatility, numSteps, timeDelta) {
    var trajectories = [];
    let value = initialValue;
    let volatility = longTermVolatility; // Start at the long-term volatility (you can customize this)

    for (let i = 0; i < numSteps; i++) {
        // Generate random values based on normal distribution (standard normal)
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

        // Update the price and volatility using the Chen model
        const valueDiff = meanReversionRate * (longTermVolatility - volatility) * timeDelta;
        const volatilityDiff = volatilityOfVolatility * Math.sqrt(volatility) * randomValue1 * Math.sqrt(timeDelta);

        const jumpSize = jumpIntensity * (randomValue2 - 0.5 * jumpVolatility ** 2) * timeDelta + jumpVolatility * Math.sqrt(timeDelta) * randomValue2;

        value *= Math.exp(valueDiff + jumpSize);
        volatility += volatilityDiff;

        trajectories.push({ value, volatility });
    }

    return trajectories;
}

function computePoisson(lambda, numIntervals) {
    const trajectories = [];
    let count = 0;

    for (let i = 0; i < numIntervals; i++) {
        // Generate a random number from a uniform distribution
        const randomValue = Math.random();

        // Determine if an event occurs in this interval
        if (randomValue < lambda / numIntervals) {
            count++;
        }

        trajectories.push(count);
    }

    return trajectories;
}

function computeEulerMaruyama(initialValue, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        // Generate a random value based on normal distribution (standard normal)
        const randomValue = generateRandomNormal();

        // Update the value using the Euler–Maruyama method
        const driftTerm = drift(value, i * timeDelta) * timeDelta;
        const diffusionTerm = diffusion(value, i * timeDelta) * randomValue * Math.sqrt(timeDelta);

        value += driftTerm + diffusionTerm;

        trajectories.push(value);
    }

    return trajectories;
}

function computeMilstein(initialValue, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        // Generate random values based on normal distribution (standard normal)
        const randomValue = generateRandomNormal();

        // Update the value using the Milstein method
        const driftTerm = drift(value, i * timeDelta) * timeDelta;
        const diffusionTerm = diffusion(value, i * timeDelta) * randomValue * Math.sqrt(timeDelta);
        const correctionTerm = 0.5 * diffusion(value, i * timeDelta) * diffusion(value, i * timeDelta) *
            ((randomValue * randomValue) - 1) * timeDelta;

        value += driftTerm + diffusionTerm + correctionTerm;

        trajectories.push(value);
    }

    return trajectories;
}

function computeRungeKutta(initialValue, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        // Generate random values based on normal distribution (standard normal)
        const randomValue = generateRandomNormal();

        // Runge-Kutta method (second order)
        const k1 = drift(value, i * timeDelta) * timeDelta +
            diffusion(value, i * timeDelta) * randomValue * Math.sqrt(timeDelta);
        const k2 = drift(value + 0.5 * k1, (i + 0.5) * timeDelta) * timeDelta +
            diffusion(value + 0.5 * k1, (i + 0.5) * timeDelta) * randomValue * Math.sqrt(timeDelta);

        value += k2;

        trajectories.push(value);
    }

    return trajectories;
}

function computeHeunsMethod(initialValue, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        // Generate random values based on normal distribution (standard normal)
        const randomValue = generateRandomNormal();

        // Heun's method (second order)
        const drift1 = drift(value, i * timeDelta);
        const diffusion1 = diffusion(value, i * timeDelta);
        const k1 = drift1 * timeDelta + diffusion1 * randomValue * Math.sqrt(timeDelta);

        const drift2 = drift(value + k1, (i + 1) * timeDelta);
        const diffusion2 = diffusion(value + k1, (i + 1) * timeDelta);
        const k2 = drift2 * timeDelta + diffusion2 * randomValue * Math.sqrt(timeDelta);

        value += 0.5 * (k1 + k2);

        trajectories.push(value);
    }

    return trajectories;
}

function generateRandomNormal() {
    // Simple function to generate a random value from a standard normal distribution
    return Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

function drift(value, time) {
    // You can customize this drift function based on your SDE
    // For example, let's use a linear drift: b(X_t, t) = a * X_t + b * t
    const a = 0.1;
    const b = 0.2;

    return a * value + b * time;
}

// Example of a diffusion function (replace with your own function)
function diffusion(value, time) {
    // This is just an example, replace it with your own diffusion function
    return 0.2 * value * Math.cos(time);
}

function displayResults(trajectories) {
    const canvas = document.getElementById('simulationChart');
    const ctx = canvas.getContext('2d');
    const numSteps = trajectories.length;

    // Calcola la larghezza e l'altezza delle linee nel grafico
    const lineWidth = canvas.width / (numSteps - 1);
    const maxTrajectory = Math.max(...trajectories);
    const minTrajectory = Math.min(...trajectories);
    const trajectoryRange = maxTrajectory - minTrajectory;

    // Draw X and Y axes
    drawAxes(ctx, canvas);

    // Disegna le linee
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - ((trajectories[0] - minTrajectory) / trajectoryRange) * canvas.height);

    for (let i = 1; i < numSteps; i++) {
        const x = i * lineWidth;
        const y = canvas.height - ((trajectories[i] - minTrajectory) / trajectoryRange) * canvas.height;
        ctx.lineTo(x, y);
    }

    // Imposta lo stile della linea
    ctx.strokeStyle = getRandomColor();
    ctx.lineWidth = 2;

    // Disegna la linea
    ctx.stroke();
}

function displayResults2(trajectories) {
    const canvas = document.getElementById('simulationChart');
    const ctx = canvas.getContext('2d');
    const numSteps = trajectories.length;

    // Calcola la larghezza della linea nel grafico
    const lineWidth = canvas.width / numSteps;

    // Draw X and Y axes
    drawAxes(ctx, canvas);

    // Disegna la linea per i prezzi
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    for (let i = 0; i < numSteps; i++) {
        const x = i * lineWidth;
        const y = canvas.height - (trajectories[i].value - Math.min(...trajectories.map(t => t.value))) * (canvas.height / (Math.max(...trajectories.map(t => t.value)) - Math.min(...trajectories.map(t => t.value))));

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();

    // Disegna la linea per la volatilità
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    for (let i = 0; i < numSteps; i++) {
        const x = i * lineWidth;
        const y = canvas.height - (trajectories[i].volatility - Math.min(...trajectories.map(t => t.volatility))) * (canvas.height / (Math.max(...trajectories.map(t => t.volatility)) - Math.min(...trajectories.map(t => t.volatility))));

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
}


function getRandomColor() {
    // Helper function to generate a random HEX color
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

// Function to draw X and Y axes
function drawAxes(ctx, canvas) {
    // Draw X-axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);

    // Aggiunge l'etichetta all'asse X
    ctx.font = '12px Arial';
    ctx.fillText('Number of Steps', canvas.width / 2 - 50, canvas.height - 5);

    // Draw Y-axis
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    
    // Aggiunge l'etichetta all'asse Y
    ctx.save();
    ctx.translate(10, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Values of Stochastic Process', 0, 0);
    ctx.restore();

    // Imposta lo stile degli assi
    ctx.strokeStyle = '#000';  // Colore nero
    ctx.lineWidth = 1;

    // Disegna gli assi
    ctx.stroke();
}