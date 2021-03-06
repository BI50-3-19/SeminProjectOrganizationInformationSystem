import { Text, Div, Group, CellButton, Spacing, Link } from "@vkontakte/vkui";
import { Icon28LogoVk } from "@vkontakte/icons";

const AboutPage = (): JSX.Element => {
	return (
		<Div>
			<Text weight="regular">
				«16K Projects» является проектной организацией, выполняющей полный
				комплекс проектных работ от эскизного проектирования до разработки
				рабочей документации для жилых и общественных зданий, а также для
				промышленных объектов. Проектные работы выполняются в четком
				соответствии с требованиями строительных норм и правил, государственных
				стандартов и других нормативных документов для строительства и
				проектирования. Проектирование осуществляется с использованием
				современных компьютерных технологий. Штат компании укомплектован
				квалифицированными специалистами с большим опытом работы в области
				строительного проектирования.
			</Text>
			<Spacing size={16} />
			<Group>
				<Link href="https://vk.com/rus_cybersquatter" target="_blank">
					<CellButton before={<Icon28LogoVk />}>Мы ВКонтакте</CellButton>
				</Link>
			</Group>
		</Div>
	);
};

export default AboutPage;
