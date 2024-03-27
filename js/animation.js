// cube variable
const cube = document.querySelector('.cube');
let isPickedUp = false;

cube.addEventListener('click', () => {
    isPickedUp = !isPickedUp;
    if (isPickedUp) {
        cube.style.animation = 'vibrate 4s infinite ease-in-out';
    } else {
        cube.style.animation = '';
    }
});

document.addEventListener('mousemove', (event) => {
    if (isPickedUp) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        cube.style.left = mouseX + 'px';
        cube.style.top = mouseY + 'px';
    }
});
setInterval(() => {
    if (isPickedUp) {
        const torpedo = document.createElement('div');
        torpedo.classList.add('torpedo');
        document.body.appendChild(torpedo);

        // torpedo position and speed
        let torpedoPosition = window.innerWidth;
        let torpedoSpeed = -1;
        let torpedoY = Math.random() * window.innerHeight;

        const moveTorpedo = () => {
            torpedoPosition += torpedoSpeed;
            torpedo.style.left = torpedoPosition + 'px';
            torpedo.style.top = torpedoY + 'px';
            torpedoSpeed -= 0.5;

            if (torpedoPosition > 0) {
                requestAnimationFrame(moveTorpedo);
            } else {
                document.body.removeChild(torpedo);
            }
        };

        moveTorpedo();
    }
}, 2000);


// Check for collision between torpedo and cube
if (isPickedUp && isColliding(torpedo, cube)) {
    createExplosion();
    cube.classList.add('explosion');
}
