import pandas as pd
import numpy as np

# Load original CSV
df = pd.read_csv("all_month.csv")

# Keep only necessary columns
df = df[['mag', 'depth', 'latitude', 'longitude', 'place', 'time', 'id']]

# Remove rows with missing mag or depth
df = df.dropna(subset=['mag', 'depth'])

# Remove rows with non-positive depth (log scale cannot handle zero/negative safely)
df = df[df['depth'] > 0]

# Scale magnitude to 1-10 (linear)
mag_min, mag_max = df['mag'].min(), df['mag'].max()
df['magInt'] = ((df['mag'] - mag_min) / (mag_max - mag_min) * 9 + 1).round().astype(int)

# Scale depth to 1-100 (log scale)
df['depthLog'] = np.log10(df['depth'])
depth_min, depth_max = df['depthLog'].min(), df['depthLog'].max()
df['depthInt'] = ((df['depthLog'] - depth_min) / (depth_max - depth_min) * 99 + 1).round().astype(int)

# Extract region from place (take last 2-3 letters after comma)
df['region'] = df['place'].apply(lambda x: x.split(",")[-1].strip() if "," in x else "Other")

# Format time for better readability
df['time'] = pd.to_datetime(df['time']).dt.strftime('%Y-%m-%d %H:%M')

# Save refined CSV
df.to_csv("earthquakes_refined.csv", index=False)

print("Refined CSV generated: earthquakes_refined.csv")