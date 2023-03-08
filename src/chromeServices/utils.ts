export const reloadMediumTabs = () => {
  chrome.tabs.query({ url: ["https://medium.com/*"] }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id!);
    });
  });
};
