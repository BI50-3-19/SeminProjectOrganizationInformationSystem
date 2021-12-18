import React from "react";
import {
  Text,
  Div,
  withAdaptivity,
} from "@vkontakte/vkui";

import AdaptivityLoginPage from "./LoginPage";

const ProfilePage = ({ viewWidth }: { viewWidth: number }): JSX.Element => {
  const [isLoggedIn] = React.useState<boolean>(false);

  if (!isLoggedIn) {
    return <AdaptivityLoginPage viewWidth={viewWidth} />;
  }

  return (
    <Div>
      <Text weight="regular">Profile</Text>
    </Div>
  );
};

const AdaptivityProfilePage = withAdaptivity(ProfilePage, { viewWidth: true });

export default AdaptivityProfilePage;
