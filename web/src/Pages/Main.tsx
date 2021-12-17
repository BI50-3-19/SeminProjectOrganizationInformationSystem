import React, { useState } from "react";
import { View, Panel, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";

import { Icon28SunOutline, Icon28MoonOutline } from "@vkontakte/icons";

function MainPage({
	setTheme,
	theme,
}: {
	setTheme: React.Dispatch<React.SetStateAction<"space_gray" | "bright_light">>;
	theme: "space_gray" | "bright_light";
}): JSX.Element {
	const [activePanel] = useState<"main">("main");

	const HeaderButtons = () => {
		return (
			<React.Fragment>
				<PanelHeaderButton
					aria-label="Сменить тему"
					onClick={() =>
						setTheme(theme === "bright_light" ? "space_gray" : "bright_light")
					}
				>
					{theme === "bright_light" ? (
						<Icon28MoonOutline />
					) : (
						<Icon28SunOutline />
					)}
				</PanelHeaderButton>
			</React.Fragment>
		);
	};

	return (
		<View activePanel={activePanel}>
			<Panel id="main">
				<PanelHeader right={<HeaderButtons />}>16K Projects</PanelHeader>
			</Panel>
		</View>
	);
}

export default MainPage;
