function clearSimulation() {
    const canvas = document.getElementById('simulationChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('customSDE').value = '';
}
function runSimulation() {
    // Get user inputs
    const processType = document.getElementById('processType').value;
    const numSteps = parseInt(document.getElementById('numSteps').value);
    const timeDelta = parseFloat(document.getElementById('timeDelta').value);
    const systems = parseInt(document.getElementById('systems').value);
    const customSDE = document.getElementById('customSDE').value;
    var results = [];

    if (customSDE != '') {
        // If a custom SDE is provided, use it
        for (i = 0; i < systems; i++) {
            results[i] = [];
            results[i] = simulateSDE(customSDE, numSteps, timeDelta);
        }   
    }
    else {
        // Run simulations based on selected process
        if(processType == "poisson") {
            var systemsPoisson = document.getElementById('systemsPoisson').value;
            for(i = 0; i < systemsPoisson; i++) {
                results[i] = [];
                results[i] = simulateProcess(processType, numSteps, timeDelta);
            }
        }
        else {
            for(i = 0; i < systems; i++) {
                results[i] = [];
                results[i] = simulateProcess(processType, numSteps, 1);
            }
        }
    }

    if(processType == "poisson") {
        var systemsPoisson = document.getElementById('systemsPoisson').value;
        for(i = 0; i < systemsPoisson; i++) {
            displayResults(results[i]);
        }
    }
    else {
        for(i = 0; i < systems; i++) {
            displayResults(results[i]);
        }
    }
}

function simulateSDE(customSDE, numSteps, timeDelta) {
    const trajectories = [];

    let score = 0;

    for (let i = 0; i < numSteps; i++) {
      const rand = generateRandomNormal();

      const t = i+1;
      const increment = evaluateUserEquation(customSDE, t, timeDelta);

      score += increment * rand;

      if (score < 0) {
        score = 0;
      }

      trajectories.push(score);
    }

    return trajectories;
  }

  function evaluateSDE(customSDE, t, timeDelta) {
    try {
      console.log(customSDE)
      const userFunction = new Function('t', 'dt', `return ${customSDE};`);
      return userFunction(t, timeDelta);
    } catch (error) {
      console.error("Error in the evaluation of the user's equation:", error);
      return 0;
    }
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
        const randomValue = generateRandomNormal();
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
        const randomValue = generateRandomNormal();
        const driftTerm = (drift - 0.5 * volatility ** 2) * timeDelta;
        const volatilityTerm = volatility * randomValue * Math.sqrt(timeDelta);

        value *= Math.exp(driftTerm + volatilityTerm);
        trajectories.push(value);
    }
    return trajectories;
}

function computeOrnsteinUhlenbeck(meanReversionRate, longTermMean, volatility, numSteps, timeDelta) {
    const trajectories = [];
    let level = 0;

    for (let i = 0; i < numSteps; i++) {
        const randomValue = generateRandomNormal();

        const meanDiff = meanReversionRate * (longTermMean - level) * timeDelta;
        const volatilityDiff = volatility * randomValue * Math.sqrt(timeDelta);
        level += meanDiff + volatilityDiff;
        trajectories.push(level);
    }
    return trajectories;
}

function computeVasicek(meanReversionRate, longTermMean, volatility, numSteps, timeDelta) {
    const trajectories = [];
    let level = longTermMean;

    for (let i = 0; i < numSteps; i++) {
        const randomValue = generateRandomNormal();

        const meanDiff = meanReversionRate * (longTermMean - level) * timeDelta;
        const volatilityDiff = volatility * randomValue * Math.sqrt(timeDelta);
        level += meanDiff + volatilityDiff;
        trajectories.push(level);
    }
    return trajectories;
}

function computeHullWhite(meanReversionRate, longTermMean, meanVolatility, numSteps, timeDelta) {
    const trajectories = [];
    let level = longTermMean;
    let volatilityLevel = meanVolatility;

    for (let i = 0; i < numSteps; i++) {
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

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
    let level = longTermMean;

    for (let i = 0; i < numSteps; i++) {
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

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
    let level = longTermMean;

    for (let i = 0; i < numSteps; i++) {
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

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
    let volatility = longTermVolatility;

    for (let i = 0; i < numSteps; i++) {
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

        const priceDiff = meanReversionRate * (longTermVolatility - volatility) * timeDelta;
        const volatilityDiff = volatilityOfVolatility * Math.sqrt(volatility) * randomValue1 * Math.sqrt(timeDelta);
        const priceVolatilityCorrelation = correlation * volatility * randomValue2 * Math.sqrt(timeDelta);

        value *= Math.exp(priceDiff - 0.5 * volatility * timeDelta + priceVolatilityCorrelation);
        volatility += volatilityDiff;
        trajectories.push(value);
    }
    return trajectories;
}

function computeChen(initialValue, meanReversionRate, longTermVolatility, volatilityOfVolatility, jumpIntensity, jumpVolatility, numSteps, timeDelta) {
    var trajectories = [];
    let value = initialValue;
    let volatility = longTermVolatility;

    for (let i = 0; i < numSteps; i++) {
        const randomValue1 = generateRandomNormal();
        const randomValue2 = generateRandomNormal();

        const valueDiff = meanReversionRate * (longTermVolatility - volatility) * timeDelta;
        const volatilityDiff = volatilityOfVolatility * Math.sqrt(volatility) * randomValue1 * Math.sqrt(timeDelta);
        const jumpSize = jumpIntensity * (randomValue2 - 0.5 * jumpVolatility ** 2) * timeDelta + jumpVolatility * Math.sqrt(timeDelta) * randomValue2;

        value *= Math.exp(valueDiff + jumpSize);
        volatility += volatilityDiff;
        trajectories.push(value);
    }
    return trajectories;
}

function computePoisson(lambda, numIntervals) {
    const trajectories = [];
    let count = 0;

    for (let i = 0; i < numIntervals; i++) {
        const randomValue = Math.random();

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
        const randomValue = generateRandomNormal();

        const driftTerm = 0.2 * timeDelta;
        const diffusionTerm = 0.5 * randomValue * Math.sqrt(timeDelta);

        value += driftTerm + diffusionTerm;
        trajectories.push(value);
    }
    return trajectories;
}

function computeMilstein(initialValue, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        const randomValue = generateRandomNormal();

        const driftTerm = 0.2 * timeDelta;
        const diffusionTerm = 0.1 * randomValue * Math.sqrt(timeDelta);
        const correctionTerm = 0.5 * 0.2  * ((randomValue * randomValue) - 1) * timeDelta;

        value += driftTerm + diffusionTerm + correctionTerm;
        trajectories.push(value);
    }

    return trajectories;
}

function computeRungeKutta(initialValue, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        const random1 = generateRandomNormal();
        const random2 = generateRandomNormal();
        const k1 = 0.1 + 0.2 * random1;  // Arithmetic Brownian Motion increment
        const k2 = 0.1 + 0.2 * (random1 + random2) / 2;
        const k3 = 0.1 + 0.2 * (random1 + random2) / 2;
        const k4 = 0.1 + 0.2 * (random1 + random2);

        const increment = (k1 + 2 * k2 + 2 * k3 + k4) * timeDelta / 6;
        value += increment;
        trajectories.push(value);
    }
    return trajectories;
}

function computeHeunsMethod(initialValue, numSteps, timeDelta) {
    const trajectories = [];
    let value = initialValue;

    for (let i = 0; i < numSteps; i++) {
        const randomValue = generateRandomNormal();

        const drift1 = 0.2;
        const diffusion1 = 0.5;
        const k1 = drift1 * timeDelta + diffusion1 * randomValue * Math.sqrt(timeDelta);

        const drift2 = 0.2 * k1;
        const diffusion2 = 0.5 * k1;
        const k2 = drift2 * timeDelta + diffusion2 * randomValue * Math.sqrt(timeDelta);

        value += 0.5 * (k1 + k2);
        trajectories.push(value);
    }
    return trajectories;
}

function generateRandomNormal() {
    return Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

function drift(value, time) {
    const a = 0.1;
    const b = 0.2;

    return a * value + b * time;
}

function diffusion(value, time) {
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