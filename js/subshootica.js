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
        // hide cursor
        document.body.style.cursor = 'none';

        cube.style.left = mouseX + 'px';
        cube.style.top = mouseY + 'px';
    } else {
        // show cursor
        document.body.style.cursor = 'default';
    }
});

let canFire = true; // Initialize flag

document.addEventListener('keydown', (event) => {
    if (isPickedUp && event.code === 'Space' && canFire) {
        canFire = false; // Set flag to false

        const torpedo = document.createElement('div');
        torpedo.classList.add('torpedo');
        document.body.appendChild(torpedo);
        const cubeRect = cube.getBoundingClientRect();
        const cubeCenterX = cubeRect.left + cubeRect.width / 2;
        const cubeCenterY = cubeRect.top + cubeRect.height / 2;
        const torpedoX = cubeCenterX;
        const torpedoY = cubeRect.bottom;
        torpedo.style.left = torpedoX + 'px';
        torpedo.style.top = torpedoY + 'px';
        const animationDuration = 2; // Adjust as needed
        const initialVelocity = 10; // Adjust as needed
        const acceleration = 2; // Adjust as needed
        const finalVelocity = initialVelocity + acceleration * animationDuration;
        torpedo.style.animation = `fire ${animationDuration}s linear`;
        torpedo.style.animationTimingFunction = `cubic-bezier(0, 0, 1, ${finalVelocity / initialVelocity})`;
        setTimeout(() => {
            document.body.removeChild(torpedo);
        }, animationDuration * 1000);

        // Reset flag after 200ms
        setTimeout(() => {
            canFire = true;
        }, 200);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        const numDivs = 1; // Adjust as needed
        for (let i = 0; i < numDivs; i++) {
            const squid = document.createElement('div');
            squid.classList.add('squid');
            document.body.appendChild(squid);
            const squidHeight = squid.offsetHeight;
            const viewportHeight = window.innerHeight;
            const randomY = Math.floor(Math.random() * (viewportHeight - squidHeight));
            squid.style.top = randomY + 'px';
            const animationDuration = 20; // Adjust as needed
            squid.style.animationDuration = `${animationDuration}s`;
            setTimeout(() => {
                document.body.removeChild(squid);
            }, animationDuration * 1000);
        }
    }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        const numDivs = 1; // Adjust as needed
        for (let i = 0; i < numDivs; i++) {
            const mine = document.createElement('div');
            mine.classList.add('mine');
            document.body.appendChild(mine);
            const mineHeight = mine.offsetHeight;
            const viewportHeight = window.innerHeight;
            const randomY = Math.floor(Math.random() * (viewportHeight - mineHeight));
            mine.style.top = randomY + 'px';
            const animationDuration = 50; // Adjust as needed
            mine.style.animationDuration = `${animationDuration}s`;
            setTimeout(() => {
                document.body.removeChild(mine);
            }, animationDuration * 1000);
        }
    }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
let audio = new Audio('../audio/darkwater.mp3');
audio.loop = true;
audio.play();
}
);

function detectCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(rect2.left > rect1.right || 
             rect2.right < rect1.left || 
             rect2.top > rect1.bottom ||
             rect2.bottom < rect1.top);
}

let score = 0; // Initialize score

setInterval(() => {
    const torpedoes = document.querySelectorAll('.torpedo');
    const squids = document.querySelectorAll('.squid');
    const mines = document.querySelectorAll('.mine');

    mines.forEach(mine => {
        torpedoes.forEach(torpedo => {
            if (detectCollision(torpedo, mine)) {
                // Check if mine has been hit before
                if (!mine.hasBeenHit) {
                    // Decrement score
                    score--;

                    // Update score display
                    document.getElementById('score').textContent = `SCORE: ${score}`;

                    // Mark mine as hit
                    mine.hasBeenHit = true;
                }

                // Pause mine animation
                mine.style.animationPlayState = 'paused';

                // Change mine image to explosion
                mine.style.backgroundImage = 'url(../images/explosion.png)';

                // Remove torpedo
                document.body.removeChild(torpedo);

                // Remove mine after 500ms
                setTimeout(() => {
                    document.body.removeChild(mine);
                }, 500);
            }
        });
    });

    squids.forEach(squid => {
        torpedoes.forEach(torpedo => {
            if (detectCollision(torpedo, squid)) {
                // Check if squid has been hit before
                if (!squid.hasBeenHit) {
                    // Increment score
                    score++;

                    // Update score display
                    document.getElementById('score').textContent = `SCORE: ${score}`;

                    // Mark squid as hit
                    squid.hasBeenHit = true;
                }

                // Pause squid animation
                squid.style.animationPlayState = 'paused';

                // Change squid image to explosion
                squid.style.backgroundImage = 'url(../images/explosion.png)';

                // Remove torpedo
                document.body.removeChild(torpedo);

                // Remove squid after 500ms
                setTimeout(() => {
                    document.body.removeChild(squid);
                }, 500);
            }
        });
    });
}, 100); // Adjust as needed
