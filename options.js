/*
 * ============================================================
 *    Filename: options.js
 *    Created By: Geoffrey Xia
 *    Created On: 2019-02-13 15:32:54
 * ============================================================
 */

let checkbox = document.querySelector('#auto_preview')
let tip = document.querySelector('#auto_preview_text')
function loadOptions() {
    chrome.storage.sync.get('auto_preview', function(data) {
      checkbox.checked = data.auto_preview == 'true'
      tip.textContent = checkbox.checked ? 'On' : 'Off'
    });
}

function prepareEvents() {
    checkbox.onchange = function(event) {
      let checked = checkbox.checked
      let checkVal = checked ? 'true': 'false'
      chrome.storage.sync.set({auto_preview: checkVal}, function() {
        console.log('auto_preview is set', checkVal);
      })

      tip.textContent = checked ? 'On' : 'Off'
    }
}

loadOptions()
prepareEvents()