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
  FormStatus,
  ScreenSpinner,
} from "@vkontakte/vkui";
import { Icon56GhostOutline } from "@vkontakte/icons";

import API, { APIError } from "../../TS/api";
import { useCookies } from "react-cookie";

const AuthorizationPage = ({
  isRegister,
  setRegister,
  setPopout,
  setSessionToken,
}: {
  viewWidth: number;
  isRegister: boolean;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setPopout: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  setSessionToken: React.Dispatch<React.SetStateAction<string | null>>;
}): JSX.Element => {
  const [, setCookie] = useCookies(["token"]);
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [secondPassword, setSecondPassword] = React.useState<string>("");

  const [loginFormStatus, setLoginFormStatus] = React.useState<
    "error" | "valid"
  >();
  const [passwordFormStatus, setPasswordFormStatus] = React.useState<
    "error" | "valid"
  >();

  const setLoad = (isLoad: boolean) => {
    if (isLoad) {
      setPopout(<ScreenSpinner />);
    } else {
      setPopout(null);
    }
  };

  const [error, setError] = React.useState<{
    status: boolean;
    header: string;
    text: string;
  }>({
    status: false,
    header: "",
    text: "",
  });

  const isLoginValid = (): boolean =>
    /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{4,15}$/i.test(login);
  const isPasswordValid = (): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(password);

  const apiErrorHandler = (error: Error) => {
    if (error instanceof APIError) {
      if (error.code === 5) {
        setError({
          status: true,
          header: "Неверные данные",
          text: "Имя пользователя или пароль не соответствуют требованиям безопасности",
        });
      }
      if (error.code === 6) {
        setError({
          status: true,
          header: "Пользователь уже существует",
          text: "Пользователь с таким именем уже существует",
        });
      }
      if (error.code === 7) {
        setError({
          status: true,
          header: "Неверные данные",
          text: "Имя пользователя или пароль неверны",
        });
      }
    } else {
      setError({
        status: true,
        header: "Неизвестная ошибка",
        text: "Необработанная ошибка, обратитесь к системному администратору",
      });
    }
  };

  const onSubmitForm = async () => {
    setLoad(true);
    const api = new API();

    if (isRegister) {
      const newUser = await api.users
        .registration({ login, password })
        .catch(apiErrorHandler);
      if (newUser) {
        const session = await api.sessions
          .create({ login, password })
          .catch(apiErrorHandler);
        if (session) {
          setSessionToken(session.token);
          setCookie("token", session.token);
        }
      }
    } else {
      const session = await api.sessions
        .create({ login, password })
        .catch(apiErrorHandler);
      if (session) {
        setSessionToken(session.token);
        setCookie("token", session.token);
      }
    }

    setLoad(false);
  };

  return (
    <Div>
      <FormLayout>
        {error.status && (
          <FormItem>
            <FormStatus header={error.header} mode="error">
              {error.text}
            </FormStatus>
          </FormItem>
        )}
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
              setError({ status: false, header: "", text: "" });
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
            "Пароль может содержать только латинские буквы и цифры. От 8 до 15 символов."
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
              setError({ status: false, header: "", text: "" });
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
            onClick={onSubmitForm}
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

const LoginPage = ({
  viewWidth = 0,
  setPopout,
  setSessionToken,
}: {
  viewWidth: number;
  setPopout: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  setSessionToken: React.Dispatch<React.SetStateAction<string | null>>;
}): JSX.Element => {
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
      setPopout={setPopout}
      setSessionToken={setSessionToken}
    />
  );
};

const AdaptivityLoginPage = withAdaptivity(LoginPage, { viewWidth: true });

export default AdaptivityLoginPage;
