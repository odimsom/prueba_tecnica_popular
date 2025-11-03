function createLoadingScreen(onComplete) {
    document.body.classList.add('loading');
    
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loading-container';
    
    const loadingText = document.createElement('h1');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'LOADING';
    
    const progressContent = document.createElement('div');
    progressContent.className = 'loading-progress-content';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'loading-progress';
    
    progressContent.appendChild(progressBar);
    loadingContainer.appendChild(loadingText);
    loadingContainer.appendChild(progressContent);
    
    setTimeout(() => {
        loadingContainer.style.opacity = '0';
        loadingContainer.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loadingContainer.remove();
            document.body.classList.remove('loading');
            if (onComplete) onComplete();
        }, 500);
    }, 2000);
    
    return loadingContainer;
}
