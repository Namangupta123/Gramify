chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelectedText') {
        const selectedText = window.getSelection()?.toString() || '';
        sendResponse({ text: selectedText });
    }

    if (request.action === 'injectCorrectedText') {
        const selection = window.getSelection();
        if (!selection) return;

        const range = selection.getRangeAt(0);
        range.deleteContents();

        const correctedSpan = document.createElement('span');
        correctedSpan.className = 'gramify-correction';
        correctedSpan.textContent = request.correctedText;

        correctedSpan.style.backgroundColor = '#e2f5e2';
        correctedSpan.style.transition = 'background-color 0.3s ease';

        range.insertNode(correctedSpan);

        setTimeout(() => {
            correctedSpan.style.backgroundColor = 'transparent';
        }, 2000);

        sendResponse({ success: true });
    }
});