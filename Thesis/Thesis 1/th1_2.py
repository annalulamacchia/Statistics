import numpy as np
import matplotlib.pyplot as plt

def lln_simulation(sample_size):
    # Generate random samples from a standard normal distribution
    samples = np.random.randn(sample_size)
    
    # Calculate the running sample mean
    running_mean = np.cumsum(samples) / np.arange(1, sample_size + 1)
    
    return running_mean

def plot_lln_simulation(sample_sizes, running_means):
    plt.figure(figsize=(10, 6))
    plt.plot(sample_sizes, running_means, label='Running Sample Mean', color='blue')
    plt.axhline(0, color='red', linestyle='--', label='True Mean (0)')
    plt.title('Law of Large Numbers (LLN) Simulation')
    plt.xlabel('Sample Size')
    plt.ylabel('Sample Mean')
    plt.legend()
    plt.show()

# Set the maximum sample size
max_sample_size = 1000

# Generate sample sizes from 1 to max_sample_size
sample_sizes = np.arange(1, max_sample_size + 1)

# Run the LLN simulation
running_means = lln_simulation(max_sample_size)

# Plot the results
plot_lln_simulation(sample_sizes, running_means)
