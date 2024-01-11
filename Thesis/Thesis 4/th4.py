import numpy as np
import matplotlib.pyplot as plt

# Generate random samples from a uniform distribution
np.random.seed(42)
sample_size = 100
samples = np.random.uniform(0, 1, sample_size)

# Calculate empirical distribution function
def empirical_distribution_function(x, data):
    return np.sum(data <= x) / len(data)

# Calculate true distribution function
true_distribution_function = np.vectorize(lambda x: x if 0 <= x <= 1 else 0)

# Plot empirical and true distribution functions
x_values = np.linspace(0, 1, 1000)
y_empirical = np.array([empirical_distribution_function(x, samples) for x in x_values])
y_true = true_distribution_function(x_values)

plt.plot(x_values, y_empirical, label='Empirical Distribution Function', linestyle='--')
plt.plot(x_values, y_true, label='True Distribution Function', linestyle='-', color='red')

plt.xlabel('x')
plt.ylabel('Probability')
plt.title('Empirical and True Distribution Functions')
plt.legend()
plt.show()
