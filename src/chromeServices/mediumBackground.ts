import { MEDIUM_WILDCARD, STORAGE_KEY } from "../constants";

const reloadMediumTabs = () => {
  chrome.tabs.query({ url: [MEDIUM_WILDCARD] }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id!);
    });
  });
};

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.sync.set({ [STORAGE_KEY]: false });
    reloadMediumTabs();
  } else if (details.reason === "update") {
    reloadMediumTabs();
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      urlChanged: true,
    });
  }
});
