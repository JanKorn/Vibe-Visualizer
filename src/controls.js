export function setupControls(initialAnimation, totalAnimations, onAnimationChange) {
    const controls = document.getElementById('controls');
    const controlsHoverArea = document.getElementById('controlsHoverArea');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenHoverArea = document.getElementById('fullscreenHoverArea');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const animationNameDisplay = document.getElementById('animationName');
    
    let currentAnimation = initialAnimation;
    let hideControlsTimeout;
    let hideFullscreenTimeout;

    function showControls() {
        controls.classList.add('visible');
        clearTimeout(hideControlsTimeout);
        hideControlsTimeout = setTimeout(() => {
            controls.classList.remove('visible');
        }, 3500);
    }

    function showFullscreenBtn() {
        fullscreenBtn.classList.add('visible');
        clearTimeout(hideFullscreenTimeout);
        hideFullscreenTimeout = setTimeout(() => {
            fullscreenBtn.classList.remove('visible');
        }, 3500);
    }

    function updateAnimationName() {
        import('./visualizations/index.js').then(({ visualizations }) => {
            animationNameDisplay.textContent = visualizations[currentAnimation].name;
        });
    }

    function updateFullscreenIcon() {
        if (document.fullscreenElement) {
            fullscreenBtn.textContent = '⛶'; // Exit fullscreen icon
            fullscreenBtn.title = 'Vollbild beenden';
        } else {
            fullscreenBtn.textContent = '⛶'; // Fullscreen icon
            fullscreenBtn.title = 'Vollbild';
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Fullscreen error:', err);
            });
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function changeAnimation(direction) {
        if (direction === 'next') {
            currentAnimation = (currentAnimation + 1) % totalAnimations;
        } else {
            currentAnimation = (currentAnimation - 1 + totalAnimations) % totalAnimations;
        }
        updateAnimationName();
        showControls();
        onAnimationChange(currentAnimation);
    }

    // Controls hover events
    controlsHoverArea.addEventListener('mouseenter', () => {
        showControls();
    });

    // Fullscreen button hover events
    fullscreenHoverArea.addEventListener('mouseenter', () => {
        showFullscreenBtn();
    });

    fullscreenBtn.addEventListener('mouseenter', () => {
        fullscreenBtn.classList.add('visible');
        clearTimeout(hideFullscreenTimeout);
    });

    fullscreenBtn.addEventListener('mouseleave', () => {
        hideFullscreenTimeout = setTimeout(() => {
            fullscreenBtn.classList.remove('visible');
        }, 3500);
    });

    // Fullscreen button click
    fullscreenBtn.addEventListener('click', () => {
        toggleFullscreen();
        showFullscreenBtn();
    });

    // Listen to fullscreen changes
    document.addEventListener('fullscreenchange', () => {
        updateFullscreenIcon();
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        changeAnimation('prev');
    });

    nextBtn.addEventListener('click', () => {
        changeAnimation('next');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeAnimation('prev');
        } else if (e.key === 'ArrowRight') {
            changeAnimation('next');
        } else if (e.key === 'f' || e.key === 'F') {
            // F key also toggles fullscreen
            toggleFullscreen();
            showFullscreenBtn();
        }
    });

    return {
        activate: () => {
            controls.classList.add('active');
            controlsHoverArea.classList.add('active');
            fullscreenBtn.classList.add('active');
            fullscreenHoverArea.classList.add('active');
            updateAnimationName();
            updateFullscreenIcon();
            showControls();
            showFullscreenBtn();
        }
    };
}