import { STORAGE_KEY } from "../constants";
import { reloadMediumTabs } from "./utils";

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.sync.set({ [STORAGE_KEY]: false }).catch(() => {
      console.log("[STORAGE] Could not set storage item");
    });
    reloadMediumTabs();
  } else if (details.reason === "update") {
    reloadMediumTabs();
  }
});