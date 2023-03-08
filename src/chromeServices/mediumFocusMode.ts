import { STORAGE_KEY } from "../constants";

type Element = HTMLElement | ChildNode | null | undefined;

const getInFocusMode = async () => {
  if (!chrome.runtime.id) return document.location.reload();

  const result = await chrome.storage.sync.get(STORAGE_KEY);
  return result[STORAGE_KEY];
};

const hideElement = (element: Element) => {
  element?.parentElement?.removeChild(element);
};

const hideNotificationBell = () => {
  // hide the notification bell
  const notificationBellSvg = document.querySelector(
    '[aria-label="Notifications"]'
  );
  const alternativeNotificationBell = document.querySelector(
    '[data-action="open-notifications"]'
  );
  const bellContainer = notificationBellSvg?.closest("a")?.parentElement;

  hideElement(bellContainer);
  hideElement(alternativeNotificationBell);
};

const enableFocusMode = async () => {
  const inFocusMode = await getInFocusMode();
  if (!inFocusMode) return;

  hideNotificationBell();
  // some pages will re-inject the notification bell, so remove again
  setTimeout(hideNotificationBell, 500); 

  // hide the main feed, except for stories or story editing
  if (
    !/stories|edit|new-story|import|settings/i.test(document.location.pathname)
  ) {
    const mainFeed =
      document.querySelector("main")?.parentElement?.parentElement;
    const statsMain = document.querySelector(".container.stats");

    const alternativeMain =
      document.querySelector("#root")?.childNodes[0]?.childNodes[4] ||
      document.querySelector(".screenContent")?.childNodes[2];

    hideElement(mainFeed);
    hideElement(statsMain);
    hideElement(alternativeMain);

    // hide sidebar feed for stories page
  } else if (/stories/i.test(document.location.pathname)) {
    const sidebarFeed = document.querySelector("main")?.nextSibling;
    hideElement(sidebarFeed);
  }
};

enableFocusMode();

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.checkState) {
    document.location.reload();
  }
});
