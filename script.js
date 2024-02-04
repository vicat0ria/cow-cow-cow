function loadSettings() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('settings').style.display = 'flex';
    announcePageChange('Game Settings page');
    updateTitleAndHeading('Game Settings', 'settings-heading');
}
function loadFontSizeSettings(){
    document.getElementById('settings').style.display = 'none';
    document.getElementById('font-size-settings').style.display = 'flex';
    announcePageChange('Font Size Settings page');
    updateTitleAndHeading('Font Size Settings', 'font-size-heading');
}
function loadColorContrastSettings(){
    document.getElementById('settings').style.display = 'none';
    document.getElementById('color-contrast-settings').style.display = 'flex';
    announcePageChange('Color contrast settings page');
    updateTitleAndHeading('Color contrast Settings', 'color-contrast-heading');
}
function loadKeyBindSettings(){
    document.getElementById('settings').style.display = 'none';
    document.getElementById('key-bind-settings').style.display = 'flex';
    announcePageChange('Key Bind settings page');
    updateTitleAndHeading('Key Bind Settings', 'key-bind-heading');
}

function changeFontSize(size) {
    let root = document.documentElement;

    if (size === 'small') {
        root.style.setProperty('--h1-font-size', '2em'); // Smaller size for h1
        root.style.setProperty('--h2-font-size', '1.5em'); // Smaller size for h2
        root.style.setProperty('--button-font-size', '16px'); // Smaller size for buttons
        root.style.setProperty('--span-font-size', '16px');
      } else if (size === 'medium') {
        root.style.setProperty('--h1-font-size', '3em'); // Medium size for h1
        root.style.setProperty('--h2-font-size', '2em'); // Medium size for h2
        root.style.setProperty('--button-font-size', '25px'); // Medium size for buttons
        root.style.setProperty('--span-font-size', '20px');
      } else if (size === 'large') {
        root.style.setProperty('--h1-font-size', '3.5em'); // Larger size for h1
        root.style.setProperty('--h2-font-size', '2.5em'); // Larger size for h2
        root.style.setProperty('--button-font-size', '35px'); // Larger size for buttons
        root.style.setProperty('--span-font-size', '25px');
        root.style.setProperty('--width', '430px');
      }
      // Optionally, save the user's preference to localStorage or handle it as needed
    }

function changeColorScheme(scheme) {
    const root = document.documentElement.style;
  
    switch (scheme) {
      case 'default':
        root.setProperty('--text-color', '#000000');
        root.setProperty('--background-color', '#FFFFFF');
        root.setProperty('--border-color', '#000000')
        break;
      case 'dark':
        root.setProperty('--text-color', '#F1F3F4');
        root.setProperty('--background-color', '#202124');
        root.setProperty('--border-color', '#F1F3F4')
        break;
      case 'yellowBlue':
        root.setProperty('--text-color', '#FAFF00');
        root.setProperty('--background-color', '#113270');
        root.setProperty('--border-color', '#FAFF00')
        break;
    }
  }
  
    
    let navigationStack = ['container']; // Initial page

    function navigateTo(pageId, isBackNavigation = false) {
        // Hide the current page
        if (navigationStack.length > 0) {
            const currentTopId = navigationStack[navigationStack.length - 1];
            document.getElementById(currentTopId).style.display = 'none';
        }
    
        // Show the new page
        document.getElementById(pageId).style.display = 'flex';
    
        if (!isBackNavigation) { // Only push to stack if not navigating back
            // Push the new page onto the stack, if not already there as the last entry
            if (navigationStack[navigationStack.length - 1] !== pageId) {
                navigationStack.push(pageId);
            }
        }
    
        // Focus management
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus();
            targetSection.removeAttribute('tabindex');
        }
    
        // Announce the page change to screen readers correctly
        announcePageChange(pageId, isBackNavigation);
    }
    
      

    
// function goBack() {
//     if (navigationStack.length > 1) {
//         // Remove the current page from the stack
//         let currentPageId = navigationStack.pop();
//         document.getElementById(currentPageId).setAttribute('hidden', true);

//         // Get the previous page ID
//         let previousPageId = navigationStack[navigationStack.length - 1];
//         navigateTo(previousPageId, true); // Pass true for isBackNavigation
//     }
// }
function goBack() {
    if (navigationStack.length > 1) {
        // Remove the current page from the stack
        const currentPageId = navigationStack.pop();
        document.getElementById(currentPageId).style.display = 'none';

        // Show the previous page
        const previousPageId = navigationStack[navigationStack.length - 1];
        document.getElementById(previousPageId).style.display = 'flex';

        // Correctly focus and announce the back navigation
        const targetSection = document.getElementById(previousPageId);
        if (targetSection) {
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus();
            targetSection.removeAttribute('tabindex');
        }

        // The true flag indicates back navigation
        navigateTo(previousPageId, true);
    } else {
        // Handle no history case
        console.log("No more navigation history.");
    }
}




    
// Variable to keep track of which input is currently active
let currentKeyBindInput = null;

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('focus', function() {
        currentKeyBindInput = this; // Set the current input
        document.addEventListener('keydown', handleKeyBind);
    });

    input.addEventListener('blur', function() {
        document.removeEventListener('keydown', handleKeyBind);
        currentKeyBindInput = null; // Clear the current input
    });
});

function handleKeyBind(e) {
    // Allow default behavior for the combination of Ctrl+R or Shift+Tab
    if ((e.key === 'r' && e.ctrlKey) || (e.key === 'Tab' && e.shiftKey)) {
        // Don't prevent the default action for these key combinations
        return; // Exit the function early
    }

    // Ignore Tab key alone to preserve its default focus navigation behavior
    if (e.key === 'Tab' || e.key === 'Shift') {
        return; // Exit the function early without preventing the default action
    }

    if (!currentKeyBindInput) return; // Do nothing if no input is selected

    currentKeyBindInput.value = e.key; // Assign the pressed key to the input's value
    e.preventDefault(); // Prevent the default action for all other keys
}

function saveKeyBindings() {
    keyBindings.up = document.getElementById('bind-up').value;
    keyBindings.down = document.getElementById('bind-down').value;
    keyBindings.left = document.getElementById('bind-left').value;
    keyBindings.right = document.getElementById('bind-right').value;

    // Optionally, save to local storage
    localStorage.setItem('keyBindings', JSON.stringify(keyBindings));
}


// Adjusted to accept a 'isBackNavigation' parameter
function announcePageChange(pageId, isBackNavigation = false) {
    let readablePageId = pageId.replace(/-/g, ' ').replace('container', 'homepage'); // Custom mapping
    let actionVerb = isBackNavigation ? 'returned to' : 'navigated to';
    let message = `You have ${actionVerb} the ${readablePageId}.`;

    const announcer = document.getElementById('accessibilityAnnouncer');
    if (announcer) {
        announcer.textContent = message;
    }
}





function updateTitleAndHeading(newTitle, headingId) {
    document.title = newTitle; // Update the tab/window title
    const heading = document.getElementById(headingId);
    if (heading) {
        heading.focus(); // Move focus to the new heading
    }
}

