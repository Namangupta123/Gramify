export async function getSelectedText(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => window.getSelection()?.toString() || '',
  });
  return result;
}

export async function injectCorrectedText(tabId, correctedText) {
  await chrome.tabs.sendMessage(tabId, {
    action: 'injectCorrectedText',
    correctedText,
  });
}