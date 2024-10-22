// scripts.js

document.querySelectorAll('.project-tile').forEach(tile => {
    tile.addEventListener('mousemove', (event) => {
        const { offsetWidth: width, offsetHeight: height } = tile;
        const { offsetX, offsetY } = event;

        // Calculate the center position
        const x = (offsetX / width) - 0.5; // Normalize to -0.5 to 0.5
        const y = (offsetY / height) - 0.5; // Normalize to -0.5 to 0.5

        // Adjust rotation values to tilt away from the mouse
        const tiltX = -y * 30; // Range: -15 to 15 (inverted)
        const tiltY = x * 30; // Range: -15 to 15 (normal)

        // Set the CSS transform property
        tile.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    tile.addEventListener('mouseleave', () => {
        // Reset rotation when the mouse leaves the tile
        tile.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});
