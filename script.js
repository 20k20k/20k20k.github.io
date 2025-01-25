document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const modal = document.getElementById('howToPlayModal');
    const closeModal = document.querySelector('.close-modal');
    const howToPlayButton = document.querySelector('.secondary-button');
    
    // Add hover sound effect
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Shop select button handler
    const shopSelectButton = document.querySelector('.donation-card .primary-button');
    if (shopSelectButton) {
        shopSelectButton.addEventListener('click', () => {
            shopSelectButton.classList.add('clicked');
            window.location.href = 'https://www.patreon.com/checkout/20k20k?rid=24906898';
            
            // Animation will continue playing while page unloads
            setTimeout(() => {
                shopSelectButton.classList.remove('clicked');
            }, 5000);
        });
    }

    // Handle home page play button
    const playButton = document.querySelector('.hero .primary-button:not(.donation-card .primary-button)');
    if (playButton) {
        playButton.addEventListener('click', async () => {
            const serverIP = '20k20k.org';
            
            try {
                // Try using the modern clipboard API
                await navigator.clipboard.writeText(serverIP);
                playButton.textContent = 'IP Copied!';
            } catch (err) {
                // Fallback for browsers that don't support clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = serverIP;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    document.execCommand('copy');
                    playButton.textContent = 'IP Copied!';
                } catch (err) {
                    playButton.textContent = serverIP;
                }

                textArea.remove();
            }

            setTimeout(() => {
                playButton.textContent = 'Play Now';
            }, 2000);
        });
    }

    // Modal functionality
    howToPlayButton.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
