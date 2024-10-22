// Handle project tile tilting effect
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

// Handle portrait dragging and spinning
const portrait = document.querySelector('.portrait');

let isDraggingPortrait = false;
let previousMousePosition = null;
let currentAngleX = 0; // Angle for vertical rotation
let currentAngleY = 0; // Angle for horizontal rotation
let spinSpeed = 0; // Variable to hold current spin speed

portrait.addEventListener('mousedown', (event) => {
    event.preventDefault(); // Prevent default drag behavior
    isDraggingPortrait = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

document.addEventListener('mousemove', (event) => {
    if (isDraggingPortrait) {
        const dx = event.clientX - previousMousePosition.x; // Change in x position
        const dy = event.clientY - previousMousePosition.y; // Change in y position

        // Update the current angle based on mouse movement
        currentAngleY += dx * 0.5; // Horizontal rotation
        currentAngleX -= dy * 0.5; // Vertical rotation

        // Apply rotation to the portrait
        portrait.style.transform = `rotateY(${currentAngleY}deg) rotateX(${currentAngleX}deg)`;

        previousMousePosition = { x: event.clientX, y: event.clientY }; // Update previous position
    }
});

document.addEventListener('mouseup', () => {
    isDraggingPortrait = false; // Reset dragging state

    // Create a deceleration effect
    const deceleration = setInterval(() => {
        if (Math.abs(spinSpeed) < 0.1) {
            clearInterval(deceleration); // Stop when speed is negligible
            spinSpeed = 0; // Reset spin speed
            return;
        }
        spinSpeed *= 0.95; // Gradually slow down the speed
        currentAngleY += spinSpeed; // Update the current angle for horizontal
        currentAngleX += spinSpeed * 0.5; // Optional: Adjust for vertical as well if desired
        portrait.style.transform = `rotateY(${currentAngleY}deg) rotateX(${currentAngleX}deg)`; // Apply rotation
    }, 16); // Roughly 60 FPS
});

// Prevent default dragging behavior for the portrait image
portrait.addEventListener('dragstart', (event) => {
    event.preventDefault();
});

// Draggable functionality for contact container
const draggable = document.getElementById('draggable');
let isDragging = false;
let offset = { x: 0, y: 0 };

draggable.addEventListener('mousedown', (event) => {
    event.preventDefault(); // Prevent text highlighting
    isDragging = true;
    offset.x = event.clientX - draggable.getBoundingClientRect().left;
    offset.y = event.clientY - draggable.getBoundingClientRect().top;
    draggable.style.cursor = 'grabbing'; // Change cursor to grabbing
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const x = event.clientX - offset.x;
        const y = event.clientY - offset.y;

        // Calculate the boundaries
        const headerHeight = document.querySelector('header').offsetHeight;
        const footerHeight = document.querySelector('footer').offsetHeight;
        const maxY = window.innerHeight - footerHeight - draggable.offsetHeight;
        const minY = headerHeight;

        // Constrain the position within the boundaries
        draggable.style.left = `${Math.max(0, Math.min(x, window.innerWidth - draggable.offsetWidth))}px`;
        draggable.style.top = `${Math.max(minY, Math.min(y, maxY))}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false; // Reset dragging state
    draggable.style.cursor = 'grab'; // Reset cursor to grab
});

// Prevent default dragging behavior for the text inside
draggable.addEventListener('dragstart', (event) => {
    event.preventDefault(); // Prevent text selection
});
