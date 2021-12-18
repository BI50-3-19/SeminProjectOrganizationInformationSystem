import moment from "moment";
import React from "react";
import { CellButton, Text, Div, Header, Group } from "@vkontakte/vkui";

const NewsItem = ({
	title,
	text,
	date,
}: {
	title: string;
	text: string;
	date: Date;
}): JSX.Element => {
	const [showButtonMode, changeShowButtonMode] = React.useState<boolean>(true);

	const [showText, setShowText] = React.useState<string>();
	const showButtonHandler = () => {
		if (showButtonMode) {
			changeShowButtonMode(false);
			setShowText(text);
		} else {
			changeShowButtonMode(true);
			setShowText(text.substring(0, text.indexOf(" ", 100)) + "...");
		}
	};

	React.useEffect(() => {
		if (text.length > 100) {
			setShowText(text.substring(0, text.indexOf(" ", 100)) + "...");
		} else {
			setShowText(text);
		}
	}, [text]);

	return (
		<Group>
			<Header
				mode="primary"
				multiline
				subtitle={`Опубликовано: ${moment(date).format(
					"DD.MM.YYYY, HH:mm:ss",
				)}`}
			>
				{title}
			</Header>
			<Div>
				<Text weight="regular">{showText}</Text>
			</Div>
			{text.length > 100 && (
				<CellButton onClick={showButtonHandler}>
					{showButtonMode ? "Показать полностью..." : "Скрыть"}
				</CellButton>
			)}
		</Group>
	);
};

export default NewsItem;
