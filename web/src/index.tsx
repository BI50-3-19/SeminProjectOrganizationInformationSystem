import ReactDOM from "react-dom";
import MainPage from "./Pages/Main";

import { AppRoot, AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

ReactDOM.render(
	<ConfigProvider scheme="space_gray">
		<AdaptivityProvider>
			<AppRoot>
				<MainPage />
			</AppRoot>
		</AdaptivityProvider>
	</ConfigProvider>,
	document.getElementById("root"),
);
