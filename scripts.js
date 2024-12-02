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
        spinSpeed *= 0.98; // Gradually slow down the speed
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

// Set initial position to fixed
draggable.style.position = 'fixed';
draggable.style.zIndex = '1000'; // Ensure it is above other elements

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
    event.preventDefault();
});


const leftColor = { r: 247, g: 116, b: 0 }; // FF7400
const middleColor = { r: 0, g: 255, b: 0 }; // 00FF00
const rightColor = { r: 255, g: 0, b: 144 }; // FF0090

// Function to interpolate colors
function interpolateColor(color1, color2, factor) {
    return {
        r: Math.round(color1.r + (color2.r - color1.r) * factor),
        g: Math.round(color1.g + (color2.g - color1.g) * factor),
        b: Math.round(color1.b + (color2.b - color1.b) * factor),
    };
}



// Add mousemove event listener
window.addEventListener('mousemove', updateBackgroundColor);

document.addEventListener("DOMContentLoaded", function () {
    // Mobile check
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var viewAnyways = localStorage.getItem('viewAnyways');

    if (isMobile && viewAnyways !== 'true') {
        window.location.href = "mobile.html";
    }

    // Dropdown functionality
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");

    dropdownBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            // Toggle active class
            this.classList.toggle("active");

            // Get dropdown content
            const dropdownContent = this.nextElementSibling;

            // Toggle display
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var dropdowns = document.getElementsByClassName("dropdown-btn");

    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", function () {
            // Toggle active class
            this.classList.toggle("active");

            // Get the next element (dropdown content)
            var dropdownContent = this.nextElementSibling;

            // Toggle display
            if (dropdownContent.style.display === "block" || dropdownContent.style.display === "") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            const dropdownContent = this.nextElementSibling;

            if (dropdownContent.style.maxHeight) {
                dropdownContent.style.maxHeight = null;
            } else {
                dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
            }
        });
    });
});


