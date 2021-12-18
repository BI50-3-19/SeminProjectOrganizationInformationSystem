import React from "react";
import { Button, Text, Div, Placeholder, withAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { Icon56GhostOutline } from "@vkontakte/icons";

const ProfilePage = ({ viewWidth }: { viewWidth: number; }): JSX.Element => {
	const isDesktop = viewWidth >= ViewWidth.TABLET;
	const [isLoggedIn] = React.useState<boolean>(false);

	if (!isLoggedIn) {
		return (
			<Placeholder
				stretched={!isDesktop}
				icon={<Icon56GhostOutline />}
				header="Вы не авторизованы"
				action={
					<Button size="m" mode="primary">
						Авторизоваться
					</Button>
				}
			>
				Чтобы зайти в профиль необходимо пройти авторизацию
			</Placeholder>
		);
	}

	return (
		<Div>
			<Text weight="regular">Profile</Text>
		</Div>
	);
};

const AdaptivityProfilePage = withAdaptivity(ProfilePage, { viewWidth: true });

export default AdaptivityProfilePage;
