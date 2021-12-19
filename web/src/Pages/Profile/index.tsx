import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Text, Div, withAdaptivity } from "@vkontakte/vkui";

import API from "../../TS/api";

import AdaptivityLoginPage from "./LoginPage";

const ProfilePage = ({
  viewWidth,
  setPopout,
}: {
  viewWidth: number;
  setPopout: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}): JSX.Element => {
  const [cookies] = useCookies(["token"]);
  const [sessionToken, setSessionToken] = React.useState<string | null>(null);

  useEffect(() => {
    if (cookies.token) {
      const api = new API({ token: cookies.token });
      api.sessions.info().then(() => {
        setSessionToken(cookies.token);
      }).catch(() => {
        setSessionToken(null);
      });
    }
  }, [cookies.token]);

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
      <Text weight="regular">Profile</Text>
    </Div>
  );
};

const AdaptivityProfilePage = withAdaptivity(ProfilePage, { viewWidth: true });

export default AdaptivityProfilePage;
