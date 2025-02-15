import {getSelectedText, injectCorrectedText} from './utils.js';

const API_URL='https://gramify-one.vercel.app/fix-grammer';

chrome.commands.onCommand.addListener(async(command)=>{
    if(command === 'fix-grammar'){
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if(!tab){
            console.log('No active tab found');
            return;
        }
        if (!tab.id){
            console.log("No tabID")
            return;
        }
    
        const selectedText = await getSelectedText(tab.id);
        if (!selectedText) {
            console.log("No selected text")
            return;
        }
        try {
          const response = await fetch(API_URL, {
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
    else{
        console.log("Error in command");
    }
});