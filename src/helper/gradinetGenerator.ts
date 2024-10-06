const colorPalette = [
    [255, 0, 0],    // Red
    [0, 255, 0],    // Green
    [0, 0, 255],    // Blue
    [255, 255, 0],  // Yellow
    [255, 0, 255],  // Magenta
    [0, 255, 255],  // Cyan
    [128, 0, 128],  // Purple
    [255, 165, 0],  // Orange
    [75, 0, 130],   // Indigo
    [0, 128, 128],  // Teal
];
const getRandomColor = () => {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};
export const gradientGenerator = () => {
    const color1 = getRandomColor(); // Get first random color
    let color2;
    do {
        color2 = getRandomColor(); // Get second random color
    } while (color1.join() === color2.join()); // Ensure it's not the same as the first color
    // Random alpha values for more variation
    const alpha1 = Math.random() * 0.6 + 0.4; // Alpha between 0.4 and 1
    const alpha2 = Math.random() * 0.6 + 0.4; // Alpha between 0.4 and 1
    // Return a linear gradient string
    return `linear-gradient(90deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${alpha1}) 0%, rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${alpha2}) 100%)`;
};
