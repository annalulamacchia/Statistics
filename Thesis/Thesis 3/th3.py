import numpy as np
import matplotlib.pyplot as plt

# Parameters
mu = 0
sigma = 1
num_samples = 1000

# Generate random samples from a normal distribution
samples = np.random.normal(mu, sigma, num_samples)

# Plot histogram of the samples
plt.hist(samples, bins=30, density=True, alpha=0.5, color='blue')

# Plot theoretical Gaussian distribution
xmin, xmax = plt.xlim()
x = np.linspace(xmin, xmax, 100)
pdf = (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu) / sigma)**2)
plt.plot(x, pdf, 'k', linewidth=2)

# Set plot labels and title
plt.xlabel('Value')
plt.ylabel('Probability Density')
plt.title('Gaussian Distribution Simulation')
plt.show()
