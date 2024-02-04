function loadUserId() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('create-user-id').style.display = 'flex';
    announcePageChange('User ID  page');
    updateTitleAndHeading('Input User ID', 'key-bind-heading');
}
    
    let navigationStack = ['container']; // Initial page

    function navigateTo(pageId) {
        // Hide the current page
        if (navigationStack.length > 0) {
            const currentTopId = navigationStack[navigationStack.length - 1];
            document.getElementById(currentTopId).style.display = 'none';
        }
    
        // Show the new page
        document.getElementById(pageId).style.display = 'flex';
        // Push the new page onto the stack, if not already there as the last entry
        if (navigationStack[navigationStack.length - 1] !== pageId) {
            navigationStack.push(pageId);
        }
    
        // Set focus to the new section for accessibility
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus();
            targetSection.removeAttribute('tabindex');
        }
    
        // Announce the page change to screen readers
        announcePageChange(pageId, isBackNavigation);
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
