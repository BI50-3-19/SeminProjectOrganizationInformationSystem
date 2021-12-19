import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
	Div,
	withAdaptivity,
	Group,
	ScreenSpinner,
	RichCell,
	CellButton,
} from "@vkontakte/vkui";

import API from "../../TS/api";

import AdaptivityLoginPage from "./LoginPage";
import { Icon56UserCircleOutline } from "@vkontakte/icons";
import { Icon28DoorArrowRightOutline } from "@vkontakte/icons";
import moment from "moment";

const ProfilePage = ({
	viewWidth,
	setPopout,
}: {
	viewWidth: number;
	setPopout: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}): JSX.Element => {
	const [cookies] = useCookies(["token"]);
	const [sessionToken, setSessionToken] = React.useState<string | null>(null);

	const [profile, setProfileInfo] = React.useState<{
		id: number;
		login: string;
		regDate: Date;
	} | null>(null);

	useEffect(() => {
		if (cookies.token) {
			setPopout(<ScreenSpinner />);
			const api = new API({ token: cookies.token });
			api.sessions
				.info()
				.then(async () => {
					setSessionToken(cookies.token);
					setProfileInfo(await api.users.get());
				})
				.catch(() => {
					setSessionToken(null);
				})
				.finally(() => setPopout(null));
		}
	}, [cookies.token, setPopout]);

	if (sessionToken === null) {
		return (
			<AdaptivityLoginPage
				viewWidth={viewWidth}
				setPopout={setPopout}
				setSessionToken={setSessionToken}
			/>
		);
	}

	return (
		<Div>
			<Group mode="plain">
				<RichCell
					before={<Icon56UserCircleOutline />}
					caption={`Зарегистрирован: ${moment(profile?.regDate).format(
						"DD.MM.YYYY, HH:mm:ss",
					)}`}
				>
					Имя пользователя: {profile?.login}
				</RichCell>
				<CellButton before={<Icon28DoorArrowRightOutline />} mode="danger">
					Выйти из аккаунта
				</CellButton>
			</Group>
		</Div>
	);
};

const AdaptivityProfilePage = withAdaptivity(ProfilePage, { viewWidth: true });

export default AdaptivityProfilePage;
