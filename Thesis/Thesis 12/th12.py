import numpy as np
import matplotlib.pyplot as plt

# Parameters
T = 1.0  # Total time
N = 1000  # Number of time steps
dt = T / N  # Time step size

# Generate Brownian motion increments
dW = np.sqrt(dt) * np.random.normal(size=N)

# Compute the cumulative sum to get Brownian motion
W = np.cumsum(dW)

# Simulate a process involving Ito Integration
t_values = np.linspace(0, T, N)
X = np.cumsum(np.sin(t_values) * dW)

# Plot Brownian motion and the simulated process
plt.figure(figsize=(10, 6))

plt.subplot(2, 1, 1)
plt.plot(t_values, W, label='Brownian Motion')
plt.title('Simulation of Brownian Motion')

plt.subplot(2, 1, 2)
plt.plot(t_values, X, label='Stochastic Process')
plt.title('Simulation of a Stochastic Process with Ito Integration')

plt.tight_layout()
plt.show()
