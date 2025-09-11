// H4 Toggle Funktionalität für Quartz
(function() {
    // Warten bis DOM geladen ist
    function initH4Toggle() {
        // Suche nach der Suchleiste im linken Menü
        const searchContainer = document.querySelector('.search') || 
                              document.querySelector('#search') || 
                              document.querySelector('.sidebar .search-container');
        
        if (!searchContainer) {
            console.log('Search container nicht gefunden, versuche alternative Positionen...');
            // Alternative: Füge zum Anfang der Sidebar hinzu
            const sidebar = document.querySelector('.sidebar') || 
                           document.querySelector('.left') ||
                           document.querySelector('nav');
            
            if (sidebar) {
                createToggleButton(sidebar, 'afterbegin');
            }
            return;
        }
        
        // Füge Toggle-Button nach der Suchleiste hinzu
        createToggleButton(searchContainer, 'afterend');
    }
    
    function createToggleButton(parentElement, position) {
        // Prüfe ob Button bereits existiert
        if (document.getElementById('h4-toggle-container')) {
            return;
        }
        
        // Erstelle Toggle-Container
        const toggleContainer = document.createElement('div');
        toggleContainer.id = 'h4-toggle-container';
        
        // Erstelle Toggle-Button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'h4-toggle-btn';
        toggleButton.innerHTML = `
            <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 14l-7 7-7-7"/>
            </svg>
            <span>H4 Überschriften</span>
        `;
        
        toggleContainer.appendChild(toggleButton);
        
        // Füge Container zur Seite hinzu
        if (position === 'afterend') {
            parentElement.insertAdjacentElement('afterend', toggleContainer);
        } else {
            parentElement.insertAdjacentElement(position, toggleContainer);
        }
        
        // Lade gespeicherten Zustand
        const isHidden = localStorage.getItem('h4-hidden') === 'true';
        updateH4Visibility(isHidden);
        updateButtonState(toggleButton, isHidden);
        
        // Event Listener für Toggle
        toggleButton.addEventListener('click', function() {
            const currentlyHidden = document.body.classList.contains('hide-h4');
            const newState = !currentlyHidden;
            
            updateH4Visibility(newState);
            updateButtonState(toggleButton, newState);
            
            // Speichere Zustand
            localStorage.setItem('h4-hidden', newState.toString());
        });
    }
    
    function updateH4Visibility(hide) {
        if (hide) {
            document.body.classList.add('hide-h4');
        } else {
            document.body.classList.remove('hide-h4');
        }
    }
    
    function updateButtonState(button, isHidden) {
        if (isHidden) {
            button.classList.add('active');
            button.querySelector('span').textContent = 'H4 Überschriften (ausgeblendet)';
        } else {
            button.classList.remove('active');
            button.querySelector('span').textContent = 'H4 Überschriften (sichtbar)';
        }
    }
    
    // Initialisierung
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initH4Toggle);
    } else {
        initH4Toggle();
    }
    
    // Für SPA-Navigation (falls Quartz Router verwendet)
    window.addEventListener('popstate', function() {
        setTimeout(initH4Toggle, 100);
    });
    
})();