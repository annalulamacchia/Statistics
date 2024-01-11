import numpy as np
import matplotlib.pyplot as plt

# Number of samples
num_samples = 1000

# Generate pairs of independent uniform random variables
u1 = np.random.rand(num_samples)
u2 = np.random.rand(num_samples)

# Box-Muller Transform
z0 = np.sqrt(-2 * np.log(u1)) * np.cos(2 * np.pi * u2)
z1 = np.sqrt(-2 * np.log(u1)) * np.sin(2 * np.pi * u2)

# Plot histogram of generated normal variates
plt.hist(z0, bins=30, density=True, alpha=0.5, color='blue', label='z0')
plt.hist(z1, bins=30, density=True, alpha=0.5, color='orange', label='z1')
plt.xlabel('Value')
plt.ylabel('Probability Density')
plt.title('Box-Muller Transform Simulation')
plt.legend()
plt.show()
