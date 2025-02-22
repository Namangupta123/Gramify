chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
    const selectedText = window.getSelection()?.toString() || '';
    sendResponse({ text: selectedText });
  }

  if (request.action === 'injectCorrectedText') {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const originalText = activeElement.value;

      activeElement.value =
        originalText.substring(0, start) +
        request.correctedText +
        originalText.substring(end);

      activeElement.selectionStart = start;
      activeElement.selectionEnd = start + request.correctedText.length;

      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
    else {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(request.correctedText));
    }

    sendResponse({ success: true });
  }
});