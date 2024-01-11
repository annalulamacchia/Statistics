import numpy as np
import matplotlib.pyplot as plt

# Parameters
n = 1000  # Number of observations
t_values = np.linspace(0, 1, n)  # Time values

# Simulate i.i.d. random processes
X = np.random.normal(size=(5, n))

# Compute empirical processes
G = np.cumsum(X, axis=1) / np.sqrt(n)

# Plot the empirical processes
plt.figure(figsize=(10, 6))
plt.plot(t_values, G.T, alpha=0.7)
plt.title("Empirical Processes - Donsker's Invariance Principle")
plt.xlabel('Time')
plt.ylabel('Empirical Process Value')
plt.show()
