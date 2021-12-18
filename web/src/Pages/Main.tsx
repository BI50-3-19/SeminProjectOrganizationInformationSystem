import React from "react";
import {
	View,
	Panel,
	PanelHeader,
	PanelHeaderButton,
	Epic,
	Group,
	Placeholder,
	Tabbar,
	TabbarItem,
	usePlatform,
	ViewWidth,
	VKCOM,
	withAdaptivity,
	SplitLayout,
	SplitCol,
	Cell,
} from "@vkontakte/vkui";

import {
	Icon28SunOutline,
	Icon28MoonOutline,
	Icon28NewsfeedOutline,
	Icon28UserCircleOutline,
} from "@vkontakte/icons";

import NewsList from "./News";

const HeaderButtons = ({
	setTheme,
	theme,
}: {
	setTheme: React.Dispatch<React.SetStateAction<"space_gray" | "bright_light">>;
	theme: "space_gray" | "bright_light";
}) => {
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

const DesktopPage = ({
	activeStory,
	hasHeader,
	onStoryChange,
}: {
	activeStory: string;
	hasHeader: boolean;
	onStoryChange: React.MouseEventHandler<HTMLElement>;
}): JSX.Element => {
	return (
		<SplitCol fixed width={280} maxWidth={280}>
			<Panel>
				{hasHeader && <PanelHeader>16K Projects</PanelHeader>}
				<Group>
					<Cell
						disabled={activeStory === "feed"}
						style={
							activeStory === "feed"
								? {
										backgroundColor: "var(--button_secondary_background)",
										borderRadius: 8,
								  }
								: {}
						}
						data-story="feed"
						onClick={onStoryChange}
						before={<Icon28NewsfeedOutline />}
					>
						Новости компании
					</Cell>
					<Cell
						disabled={activeStory === "profile"}
						style={
							activeStory === "profile"
								? {
										backgroundColor: "var(--button_secondary_background)",
										borderRadius: 8,
								  }
								: {}
						}
						data-story="profile"
						onClick={onStoryChange}
						before={<Icon28UserCircleOutline />}
					>
						Профиль
					</Cell>
				</Group>
			</Panel>
		</SplitCol>
	);
};

function MainPage({
	setTheme,
	theme,
	viewWidth,
}: {
	setTheme: React.Dispatch<React.SetStateAction<"space_gray" | "bright_light">>;
	theme: "space_gray" | "bright_light";
	viewWidth: number;
}): JSX.Element {
	const platform = usePlatform();
	const [activeStory, setActiveStory] = React.useState("feed");
	const onStoryChange: React.MouseEventHandler<HTMLElement> = (e) => {
		setActiveStory(e.currentTarget.dataset.story as string);
	};
	const isDesktop = viewWidth >= ViewWidth.TABLET;
	const hasHeader = platform !== VKCOM;

	return (
		<SplitLayout
			header={hasHeader && <PanelHeader separator={false} />}
			style={{ justifyContent: "center" }}
		>
			{isDesktop && (
				<DesktopPage
					activeStory={activeStory}
					hasHeader={hasHeader}
					onStoryChange={onStoryChange}
				/>
			)}

			<SplitCol
				animate={!isDesktop}
				spaced={isDesktop}
				width={isDesktop ? "560px" : "100%"}
				maxWidth={isDesktop ? "560px" : "100%"}
			>
				<Epic
					activeStory={activeStory}
					tabbar={
						!isDesktop && (
							<Tabbar>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === "feed"}
									data-story="feed"
									text="Новости компании"
								>
									<Icon28NewsfeedOutline />
								</TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === "profile"}
									data-story="profile"
									text="Профиль"
								>
									<Icon28UserCircleOutline />
								</TabbarItem>
							</Tabbar>
						)
					}
				>
					<View id="feed" activePanel="feed">
						<Panel id="feed">
							<PanelHeader
								right={<HeaderButtons setTheme={setTheme} theme={theme} />}
							>
								Новости компании
							</PanelHeader>
							<Group style={{ height: "1000px" }}>{NewsList}</Group>
						</Panel>
					</View>
					<View id="profile" activePanel="profile">
						<Panel id="profile">
							<PanelHeader
								right={<HeaderButtons setTheme={setTheme} theme={theme} />}
							>
								Профиль
							</PanelHeader>
							<Group style={{ height: "1000px" }}>
								<Placeholder
									icon={<Icon28UserCircleOutline width={56} height={56} />}
								></Placeholder>
							</Group>
						</Panel>
					</View>
				</Epic>
			</SplitCol>
		</SplitLayout>
	);
}

const AdaptivityMainPage = withAdaptivity(MainPage, { viewWidth: true });

export default AdaptivityMainPage;
