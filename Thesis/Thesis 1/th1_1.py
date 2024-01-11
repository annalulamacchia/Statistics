import numpy as np
import matplotlib.pyplot as plt

# Parameters
population_mean = 5
sample_sizes = [10, 50, 100, 500, 1000]
num_simulations = 1000

# Simulate LLN
for sample_size in sample_sizes:
    sample_means = []
    for _ in range(num_simulations):
        # Generate random samples from a normal distribution with mean population_mean
        samples = np.random.normal(population_mean, 1, sample_size)
        # Calculate the sample mean
        sample_mean = np.mean(samples)
        sample_means.append(sample_mean)

    # Plot histogram of sample means
    plt.hist(sample_means, bins=30, label=f'Sample Size = {sample_size}', alpha=0.5)

# Plot population mean as a vertical line
plt.axvline(population_mean, color='red', linestyle='dashed', linewidth=2, label='Population Mean')

# Set plot labels and title
plt.xlabel('Sample Mean')
plt.ylabel('Frequency')
plt.title('Law of Large Numbers Simulation')
plt.legend()
plt.show()
