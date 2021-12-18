import { useState } from "react";
import ReactDOM from "react-dom";
import MainPage from "./Pages/Main";

import {
	AppRoot,
	AdaptivityProvider,
	ConfigProvider,
	WebviewType,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import lockDevTools from "./TS/devToolsLocker";

if (process.env.NODE_ENV === "production") {
	lockDevTools.enableLock();
}

function App(): JSX.Element {
	const [theme, setTheme] = useState<"space_gray" | "bright_light">(
		"space_gray",
	);

	return (
		<ConfigProvider scheme={theme} webviewType={WebviewType.INTERNAL}>
			<AdaptivityProvider>
				<AppRoot>
					<MainPage theme={theme} setTheme={setTheme} viewWidth={0} />
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
