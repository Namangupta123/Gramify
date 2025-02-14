import {getSelectedText, injectCorrectedText} from './utils.js';

chrome.commands.onCommand.addListener(async(command)=>{
    if(command==='fix-grammer'){
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.id) return;
    
        const selectedText = await getSelectedText(tab.id);
        if (!selectedText) return;
    
        try {
          const response = await fetch('http://localhost:3000/fix-grammar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: selectedText }),
          });
    
          const { correctedText } = await response.json();
          await injectCorrectedText(tab.id, correctedText);
        } 
        catch (error) {
          console.error('Error fixing grammar:', error);
        }
    }
});