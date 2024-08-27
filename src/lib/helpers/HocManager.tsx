import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { config } from "../../../config";
import LogoutRoutes from "../../navigation/logoutRoutes";
import LoginRoutes from "../../navigation/loginRoutes";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginUser, logoutUser } from "../redux/user/userReducer";
import { getStorageData } from "./utils/asyncStorage";
import { checkToken, updateUser, updateUuid } from "../../api/user";
import { getLocation } from "./utils/location";
import { userValidator } from "./utils/userValidator";
import FirstStepperContainer from "../../components/firstStepper";
import { updateCoords } from "../../api/user";
import { registerForPushNotificationsAsync } from "./utils/notifications";
import Loader from "../../design-system/molecules/loader";
import { changeIsLoading } from "../redux/load/loadReducer";
import { tagCreator } from "../../components/tagStepper/tagCreator";
import TagStepper from "../../components/tagStepper";

export default function HocManager() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.load.isLoading);
  const [isComplete, setIsComplete] = useState(true);

  useEffect(() => {
    console.log("HOC");
    console.log("user infos", user.infos?.step);
    // console.log("user", user);

    setIsComplete(user.infos !== null ? userValidator(user.infos) : false);
  }, [user]);

  const autoLogin = async () => {
    dispatch(changeIsLoading(true));
    const token = await getStorageData(config.storageTokenKey);
    //console.log('TOKEN', token);

    if (token !== null) {
      const responseCheckToken = await checkToken(token);
      //console.log("responseCheckToken", responseCheckToken);

      if (responseCheckToken.status === 200) {
        dispatch(loginUser(responseCheckToken.content));
        const location: any = await getLocation();

        const coords = {
          coords: [
            parseFloat(location.coords.latitude),
            parseFloat(location.coords.longitude),
          ],
        };

        const updateCoordsRes = await updateCoords(
          coords,
          responseCheckToken.content.user._id,
          token
        );

        console.log("GO");

        const tokenUuid = await registerForPushNotificationsAsync(
          responseCheckToken.content.user._id
        );

        const uuid: any = { uuid: tokenUuid?.data };
        if (uuid) {
          const updateUuidRes = await updateUuid(
            uuid,
            responseCheckToken.content.user._id,
            token
          );
        }
      }
      dispatch(changeIsLoading(false));
    } else {
      dispatch(logoutUser(null));
      dispatch(changeIsLoading(false));
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  const isLogin = isComplete && tagCreator.length <= (user.infos?.step ?? 1);

  return (
    <View style={styles.container}>
      {user.isLogged ? (
        isLogin ? (
          <LoginRoutes />
        ) : isComplete ? (
          <TagStepper />
        ) : (
          <FirstStepperContainer />
        )
      ) : (
        <LogoutRoutes />
      )}

      {isLoading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
