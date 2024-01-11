import numpy as np
import matplotlib.pyplot as plt

# Parameters
population_mean = 50
population_std_dev = 10
sample_size = 30
num_simulations = 1000

# Simulate CLT
sample_means = []
for _ in range(num_simulations):
    # Generate random samples from a normal distribution
    samples = np.random.normal(population_mean, population_std_dev, sample_size)
    # Calculate the sample mean
    sample_mean = np.mean(samples)
    sample_means.append(sample_mean)

# Plot histogram of sample means
plt.hist(sample_means, bins=30, density=True, alpha=0.5, color='blue')

# Plot theoretical normal distribution
xmin, xmax = plt.xlim()
x = np.linspace(xmin, xmax, 100)
p = (1 / (population_std_dev * np.sqrt(2 * np.pi / sample_size))) * np.exp(-(x - population_mean)**2 / (2 * population_std_dev**2 / sample_size))
plt.plot(x, p, 'k', linewidth=2)

# Set plot labels and title
plt.xlabel('Sample Mean')
plt.ylabel('Probability Density')
plt.title('Central Limit Theorem Simulation')
plt.show()
