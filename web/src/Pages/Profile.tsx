import React from "react";
import { Button, Text, Div, Placeholder } from "@vkontakte/vkui";
import { Icon56GhostOutline } from "@vkontakte/icons";

const ProfilePage = (): JSX.Element => {
	const [isLoggedIn] = React.useState<boolean>(false);

	if (!isLoggedIn) {
		return (
			<Placeholder
				icon={<Icon56GhostOutline />}
				header="Вы не авторизованы"
				action={
					<Button size="m" mode="commerce">
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

export default ProfilePage;
