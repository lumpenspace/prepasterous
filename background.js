
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'pasteData') {
    console.log('Pasted data:', request.data);
    // Additional processing can be done here
  }
});
