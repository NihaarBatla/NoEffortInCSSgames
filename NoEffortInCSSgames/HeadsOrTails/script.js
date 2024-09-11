document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const result = document.getElementById('result');
    let userChoice = '';

    function clearSelection() {
        document.querySelectorAll('.choices button').forEach(button => {
            button.classList.remove('selected');
        });
    }

    document.getElementById('heads').addEventListener('click', () => {
        clearSelection();
        userChoice = 'heads';
        document.getElementById('heads').classList.add('selected');
        coin.style.backgroundImage = "url('heads.png')"; // Set default image to heads
    });

    document.getElementById('tails').addEventListener('click', () => {
        clearSelection();
        userChoice = 'tails';
        document.getElementById('tails').classList.add('selected');
        coin.style.backgroundImage = "url('tails.png')"; // Set default image to tails
    });

    document.getElementById('flip').addEventListener('click', () => {
        if (!userChoice) {
            result.textContent = 'Please choose heads or tails!';
            return;
        }

        // Add the flipping class to trigger animation
        coin.classList.add('flipping');

        // Temporarily alternate the image during the animation
        let flipInterval = setInterval(() => {
            coin.style.backgroundImage = coin.style.backgroundImage.includes('heads.png') ? "url('tails.png')" : "url('heads.png')";
        }, 250); // Switch image every 250ms

        // Simulate coin flip
        setTimeout(() => {
            clearInterval(flipInterval); // Stop alternating images
            coin.classList.remove('flipping'); // Remove flipping class
            const outcome = Math.random() < 0.5 ? 'heads' : 'tails';

            // Show the final outcome
            coin.style.backgroundImage = `url('${outcome}.png')`;
            result.textContent = `The coin landed on ${outcome}.`;

            if (userChoice === outcome) {
                result.textContent += ' You win!';
            } else {
                result.textContent += ' You lose!';
            }
        }, 5000); // Match the animation duration
    });
});
