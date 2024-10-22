// Add mousemove event listener for the tilting effect
document.querySelectorAll('.project-tile').forEach(tile => {
    tile.addEventListener('mousemove', (event) => {
        const rect = tile.getBoundingClientRect();
        const x = event.clientX - rect.left; // X position within the tile
        const y = event.clientY - rect.top; // Y position within the tile
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10; // Adjust the rotation factor as needed
        const rotateY = ((x - centerX) / centerX) * -10;

        tile.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset the tile's transform when the mouse leaves
    tile.addEventListener('mouseleave', () => {
        tile.style.transform = 'rotateX(0) rotateY(0)';
    });
});
