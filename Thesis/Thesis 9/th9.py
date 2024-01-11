import numpy as np
import matplotlib.pyplot as plt

# Parameters
lambda_parameter = 2  # Rate of the Poisson process
T = 10  # Total time
num_samples = 1000

# Generate Poisson process
time_points = np.sort(np.random.uniform(0, T, num_samples))
event_counts = np.arange(1, num_samples + 1)

# Plot histogram
plt.hist(time_points, bins=30, density=True, alpha=0.5, color='blue')
plt.xlabel('Time')
plt.ylabel('Event Density')
plt.title('Poisson Process Simulation')
plt.show()
