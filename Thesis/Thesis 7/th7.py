import numpy as np
import matplotlib.pyplot as plt

# Simulate a data stream
np.random.seed(42)
data_stream = np.random.normal(loc=0, scale=1, size=1000)

# Online algorithm for computing running average
running_average = np.zeros(len(data_stream))
cumulative_sum = 0

for i in range(len(data_stream)):
    # Update running sum
    cumulative_sum += data_stream[i]
    
    # Compute running average
    running_average[i] = cumulative_sum / (i + 1)

# Plot the data stream and running average
plt.plot(data_stream, label='Data Stream')
plt.plot(running_average, label='Running Average', linestyle='--', color='red')
plt.xlabel('Time')
plt.ylabel('Value')
plt.legend()
plt.title('Online Algorithm: Running Average of Data Stream')
plt.show()
