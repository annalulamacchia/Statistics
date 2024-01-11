import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

# Set the parameters for the normal distribution
mean = 0
std_dev = 1
sample_size = 1000

# Generate random samples from the normal distribution
samples = np.random.normal(mean, std_dev, sample_size)

# Create a histogram of the samples
plt.hist(samples, bins=30, density=True, alpha=0.7, label='Histogram')

# Create the theoretical probability density function (PDF)
x = np.linspace(min(samples), max(samples), 100)
pdf = norm.pdf(x, mean, std_dev)

# Plot the theoretical PDF
plt.plot(x, pdf, 'k-', label='Theoretical PDF')

# Add labels and a legend
plt.title('Simulation of Normal Distribution')
plt.xlabel('Values')
plt.ylabel('Probability Density')
plt.legend()

# Show the plot
plt.show()
