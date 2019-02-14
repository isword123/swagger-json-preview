/*
 * ============================================================
 *    Filename: background.js
 *    Created By: Geoffrey Xia
 *    Created On: 2019-02-13 15:10:01
 * ============================================================
 */

'use strict';

chrome.runtime.onInstalled.addListener(function() {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    /*
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'git.vpgame.cn'},
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
    */
  });
});
