import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import binom

# Set the parameters for the binomial distribution
n_trials = 10
probability_of_success = 0.5
sample_size = 1000

# Generate random samples from the binomial distribution
samples = np.random.binomial(n_trials, probability_of_success, sample_size)

# Create a histogram of the samples
plt.hist(samples, bins=np.arange(min(samples), max(samples) + 1) - 0.5, density=True, alpha=0.7, label='Histogram')

# Create the theoretical probability mass function (PMF)
x = np.arange(min(samples), max(samples) + 1)
pmf = binom.pmf(x, n_trials, probability_of_success)

# Plot the theoretical PMF
plt.stem(x, pmf, linefmt='k-', markerfmt='ko', basefmt='k-', label='Theoretical PMF')

# Add labels and a legend
plt.title('Simulation of Binomial Distribution')
plt.xlabel('Number of Successes')
plt.ylabel('Probability')
plt.legend()

# Show the plot
plt.show()
