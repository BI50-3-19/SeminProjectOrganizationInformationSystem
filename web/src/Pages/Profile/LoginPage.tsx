import React from "react";
import {
  Button,
  Placeholder,
  withAdaptivity,
  ViewWidth,
  FormLayout,
  FormItem,
  Input,
  Div,
  Spacing,
} from "@vkontakte/vkui";
import { Icon56GhostOutline } from "@vkontakte/icons";

const AuthorizationPage = ({
  isRegister,
  setRegister,
}: {
  viewWidth: number;
  isRegister: boolean;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [secondPassword, setSecondPassword] = React.useState<string>("");

  const [loginFormStatus, setLoginFormStatus] = React.useState<
    "error" | "valid"
  >();
  const [passwordFormStatus, setPasswordFormStatus] = React.useState<
    "error" | "valid"
  >();

  const isLoginValid = (): boolean =>
    /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{4,15}$/i.test(login);
  const isPasswordValid = (): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(password);

  return (
    <Div>
      <FormLayout>
        <FormItem
          top="Имя пользователя"
          bottom={
            isRegister &&
            "Имя пользователя должно содержать от 5 до 15 символов. Только латинские буквы и цифры."
          }
          status={loginFormStatus}
        >
          <Input
            name="login"
            type="text"
            placeholder="Введите имя пользователя"
            value={login}
            onChange={(event) => {
              setLogin(event.target.value);
              setLoginFormStatus(isLoginValid() ? "valid" : "error");
            }}
            onBlur={() => {
              setLoginFormStatus(isLoginValid() ? "valid" : "error");
            }}
          />
        </FormItem>

        <FormItem
          top="Пароль"
          status={passwordFormStatus}
          bottom={
            isRegister &&
            "Пароль может содержать только латинские буквы и цифры. Минимум 8 символов."
          }
        >
          <Input
            name="password"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordFormStatus(isPasswordValid() ? "valid" : "error");
            }}
            onBlur={() => {
              setPasswordFormStatus(isPasswordValid() ? "valid" : "error");
            }}
          />
        </FormItem>

        {isRegister && (
          <FormItem>
            <Input
              type="password"
              placeholder="Повторите пароль"
              value={secondPassword}
              onChange={(event) => {
                setSecondPassword(event.target.value);
              }}
              onBlur={() => {
                setPasswordFormStatus(isPasswordValid() ? "valid" : "error");
              }}
              disabled={!isPasswordValid()}
            />
          </FormItem>
        )}

        <FormItem>
          <Button
            size="l"
            stretched
            disabled={
              isRegister
                ? !(
                    isLoginValid() &&
                    isPasswordValid() &&
                    password === secondPassword
                  )
                : !(isLoginValid() && isPasswordValid())
            }
            type="submit"
          >
            {isRegister ? "Зарегистрироваться" : "Авторизоваться"}
          </Button>
          <Spacing />
          <Button
            size="l"
            stretched
            mode="tertiary"
            onClick={() => setRegister(!isRegister)}
          >
            {isRegister ? "У меня уже есть аккаунт" : "Я тут впервые"}
          </Button>
        </FormItem>
      </FormLayout>
    </Div>
  );
};

const AdaptivityAuthorizationPage = withAdaptivity(AuthorizationPage, {
  viewWidth: true,
});

const LoginPage = ({ viewWidth = 0 }: { viewWidth: number }): JSX.Element => {
  const isDesktop = viewWidth >= ViewWidth.TABLET;
  const [showLogin, setShowLogin] = React.useState(false);
  const [isRegister, setRegister] = React.useState(false);

  if (!showLogin) {
    return (
      <Placeholder
        stretched={!isDesktop}
        icon={<Icon56GhostOutline />}
        header="Вы не авторизованы"
        action={
          <Button size="m" mode="primary" onClick={() => setShowLogin(true)}>
            Авторизоваться
          </Button>
        }
      >
        Чтобы зайти в профиль необходимо пройти авторизацию
      </Placeholder>
    );
  }

  return (
    <AdaptivityAuthorizationPage
      viewWidth={0}
      isRegister={isRegister}
      setRegister={setRegister}
    />
  );
};

const AdaptivityLoginPage = withAdaptivity(LoginPage, { viewWidth: true });

export default AdaptivityLoginPage;
