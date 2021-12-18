const eventContextMenuHandler = (event: MouseEvent): void => {
	event.preventDefault();
};

function enableLock(): void {
	window.document.addEventListener("contextmenu", eventContextMenuHandler);
	window.document.onkeydown = (event): false | void => {
		if (event.key === "F12") {
			return false;
		}
		if (event.ctrlKey && event.shiftKey && event.key === "I") {
			return false;
		}

		if (event.ctrlKey && event.shiftKey && event.key === "J") {
			return false;
		}

		if (event.ctrlKey && event.key === "U") {
			return false;
		}
	};
}

function disableLock(): void {
	window.document.removeEventListener("contextmenu", eventContextMenuHandler);
	window.document.onkeydown = null;
}

const devToolsLocker = {
	enableLock,
	disableLock,
};

export default devToolsLocker;
