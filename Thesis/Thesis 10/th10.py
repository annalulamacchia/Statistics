import numpy as np
import matplotlib.pyplot as plt

# Parameters
T = 1  # Total time
N = 1000  # Number of time steps
mu = 0.1  # Drift
sigma = 0.2  # Volatility

# Time vector
t = np.linspace(0, T, N)  # Ensure N matches the number of points in Brownian motion

# Brownian motion simulation
dW = np.sqrt(T/N) * np.random.normal(size=N)
W = np.cumsum(dW)

# Geometric Brownian Motion simulation
S = np.exp((mu - 0.5 * sigma**2) * t + sigma * W)

# Plot Brownian motion and GBM
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.plot(t, W, label='Brownian Motion')
plt.xlabel('Time')
plt.ylabel('Brownian Motion Value')
plt.title('Brownian Motion Simulation')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(t, S, label='Geometric Brownian Motion')
plt.xlabel('Time')
plt.ylabel('GBM Value')
plt.title('Geometric Brownian Motion Simulation')
plt.legend()

plt.tight_layout()
plt.show()

