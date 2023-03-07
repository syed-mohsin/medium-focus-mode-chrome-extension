type Element = HTMLElement | ChildNode | null | undefined;

const hideElement = (element: Element) => {
  element?.parentElement?.removeChild(element);
};

// hide the notification bell
const notificationBellSvg = document.querySelector(
  '[aria-label="Notifications"]'
);
const bellContainer = notificationBellSvg?.closest("a")?.parentElement;
hideElement(bellContainer);

// hide the main feed, except for stories or story editing
if (!/stories|edit/i.test(document.location.pathname)) {
  const mainFeed = document.querySelector("main")?.parentElement?.parentElement;
  hideElement(mainFeed);
  // hide sidebar feed for stories page
} else {
  const sidebarFeed = document.querySelector("main")?.nextSibling;
  hideElement(sidebarFeed);
}

export {};
