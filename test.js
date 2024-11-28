(() => {
    "use strict";
  
    // Check if the current page is a video page
    function isVideoPage() {
      return location.pathname === '/watch';
    }
  
    // Reload the page if navigating to a video page
    function reloadPageOnNavigation() {
      let lastUrl = location.href;
  
      setInterval(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
          lastUrl = currentUrl;
  
          // Reload the page if the new URL is a video page
          if (isVideoPage()) {
            console.log("Navigating to video page, forcing reload...");
            location.reload();
          }
        }
      }, 500); // Check for URL changes every 500ms
    }
  
    // Initialize the button on a video page
    function initializeButton() {
      if (!isVideoPage()) return; // Only run on video pages
  
      const container = document.querySelector('#top-level-buttons-computed');
      if (container && !document.getElementById("youtube-chat-button")) {
        const chatButton = document.createElement("button");
        chatButton.id = "youtube-chat-button";
        chatButton.textContent = "Chat";
        container.appendChild(chatButton);
  
        chatButton.addEventListener("click", () => {
          console.log("Chat button clicked");
        });
      }
    }
  
    // Wait for the DOM element to be ready
    function waitForElement(selector, callback) {
      const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
          clearInterval(interval);
          callback();
        }
      }, 100); // Check every 100ms
    }
  
    // Observe DOM changes for dynamic updates
    function observeDOMChanges() {
      const observer = new MutationObserver(() => {
        if (isVideoPage()) {
          waitForElement('#top-level-buttons-computed', initializeButton);
        }
      });
  
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  
    // Initial setup on first load
    function initializeOnFirstLoad() {
      if (isVideoPage()) {
        waitForElement('#top-level-buttons-computed', initializeButton);
      }
    }
  
    // Start the process
    reloadPageOnNavigation(); // Reload page when navigating to a video
    observeDOMChanges();      // Observe DOM changes for updates
    initializeOnFirstLoad();  // Initialize button on first load
  })();
  