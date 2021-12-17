import ReactDOM from "react-dom";
import MainPage from "./Pages/Main";

import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

ReactDOM.render(
	<ConfigProvider>
		<AdaptivityProvider>
			<MainPage />
		</AdaptivityProvider>
	</ConfigProvider>,
	document.getElementById("root"),
);
