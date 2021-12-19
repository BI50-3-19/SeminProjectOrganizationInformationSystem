import React from "react";
import {
  Text,
  Div,
  withAdaptivity,
} from "@vkontakte/vkui";

import AdaptivityLoginPage from "./LoginPage";

const ProfilePage = ({ viewWidth, setPopout }: { viewWidth: number; setPopout: React.Dispatch<React.SetStateAction<JSX.Element | null>>; }): JSX.Element => {
  const [sessionToken, setSessionToken] = React.useState<string | null>(null);

  if (sessionToken === null) {
    return <AdaptivityLoginPage viewWidth={viewWidth} setPopout={setPopout} setSessionToken={setSessionToken}/>;
  }

  return (
    <Div >
      <Text weight="regular">Profile</Text>
    </Div>
  );
};

const AdaptivityProfilePage = withAdaptivity(ProfilePage, { viewWidth: true });

export default AdaptivityProfilePage;
