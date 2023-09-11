import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Card from '../../../components/card';
import { inputStyle } from '../../../styles/global/form';
import { title1, title2 } from '../../../styles/global/text';
import CustomButton from '../../../components/buttons/customButton';
import FacebookButton from '../../../components/buttons/facebookButton';
import GoogleButton from '../../../components/buttons/googleButton';
import { colors } from '../../../styles/global/globalStyles';
import WhiteOpacity from '../../../components/opacity/white';
import { signinUserEmail, signinUserGoogle, signinUserFacebook } from '../../../api/user';
import { UserEmailSigninMinimumQuery, UserFacebookSignupMinimumQuery, UserGoogleSignupMinimumQuery } from '../../../types/user-types';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hook';
import { loginUser } from '../../../lib/redux/user/userReducer';
import { storeData } from '../../../lib/helpers/utils/asyncStorage';
import { config } from '../../../../config';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";

WebBrowser.maybeCompleteAuthSession();

export default function Signin() {
  const dispatch = useAppDispatch();

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<null | string>(null);
    const [tokenGoogle, setTokenGoogle] = useState("");
    const [userInfoGoogle, setUserInfoGoogle] = useState(null);
    const [user, setUser] = useState(null);

    // GOOGLE
    const [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useAuthRequest({
      androidClientId: "666162941025-rc74h91e43882bcq8ubb891r0gb1uq3l.apps.googleusercontent.com",
      iosClientId: "666162941025-odke2dd4n6ap3cvs1rrbhq47i7mk9ug8.apps.googleusercontent.com",
      expoClientId: "666162941025-aavhmom7i6k5jp8ig143sumaaugi30ur.apps.googleusercontent.com"
    });

    useEffect(() => {
      if (responseGoogle?.type === "success") {
        if(responseGoogle.authentication !== null) {
          setTokenGoogle(responseGoogle.authentication.accessToken);
          getUserInfoGoogle();
        }
      }
    }, [responseGoogle, tokenGoogle]);
  
    const getUserInfoGoogle = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${tokenGoogle}` },
          }
        );
        const user = await response.json();
        console.log('user', user);

        const data: UserGoogleSignupMinimumQuery = {
          email: user.email,
          family_name: user.family_name,
          given_name: user.given_name,
          google_id: user.id,
          google_name: user.name,
          picture: user.picture,
          verified_email: user.verified_email,
          connexion_type: 'google',
          last_coords: [0, 0],
          phone_uuid: "azerty",
          type: "particular",
          organisation_name: null,
        }

        signinUserGoogle(data)
          .then(async (res)=>{
            console.log("GOOGLE RES",res)
            if(res.status ===200) {
              console.log("ça passe");
              await storeData(config.storageTokenKey, res.content.token)
              dispatch(loginUser({user: res.content.user, userEmail: res.content.userEmail}))
            } else {
              if(res.error !== null) {
                if(typeof res.error === "string") {
                  setMsg(res.error);
                } else {
                  setMsg(res.error.error);
                }
              }
              
            }
          })
        
        
        setUserInfoGoogle(user);
      } catch (error) {
        // Add your own error handler here
        
      }
    };

    //FACEBOOK 

    const [requestFacebook, responseFacebook, promptAsyncFacebook] = Facebook.useAuthRequest({
      clientId: "1699498310531975",
    });
  
    if (requestFacebook) {
      console.log(
        "You need to add this url to your authorized redirect urls on your Facebook app: " +
        requestFacebook.redirectUri
      );
    }

    useEffect(() => {
      if (responseFacebook && responseFacebook.type === "success" && responseFacebook.authentication) {
        if(responseFacebook.authentication !== null) {
          (async () => {
            const userInfoResponse = await fetch(
              //@ts-ignore
              `https://graph.facebook.com/me?access_token=${responseFacebook.authentication.accessToken}&fields=id,name,picture.type(large),email,gender,birthday`
            );
            const userInfo = await userInfoResponse.json();
            console.log("userInfo", userInfo);

            const data: UserFacebookSignupMinimumQuery = {
              email: userInfo.email,
              fb_name: userInfo.name,
              fb_id: userInfo.id,
              picture_url: userInfo.picture.data.url,
              picture_width: userInfo.picture.data.width,
              picture_height: userInfo.picture.data.height,
              connexion_type: 'facebook',
              last_coords: [0, 0],
              phone_uuid: "azerty",
              type: "particular",
              organisation_name: null
            }

            signinUserFacebook(data)
              .then(async (res)=>{
                console.log("res FACEBOOK", res)
                if(res.status ===200) {
                  console.log("ça passe");
                  await storeData(config.storageTokenKey, res.content.token)
                  dispatch(loginUser({user: res.content.user, userEmail: res.content.userEmail}))
                } else {
                  if(res.error !== null) {
                    if(typeof res.error === "string") {
                      setMsg(res.error);
                    } else {
                      setMsg(res.error.error);
                    }
                  }
                  
                }
              })
            setUser(userInfo);
          })();
        }
        
      }
    }, [responseFacebook]);

    const handlePressAsync = async () => {
      const result = await promptAsyncFacebook();
      console.log("result",result)
      if (result.type !== "success") {
        alert("Uh oh, something went wrong");
        return;
      }
    };
  

    const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      setVisible(!visible);
    };


    const validateForm = ()=>{
 
      const data: UserEmailSigninMinimumQuery = {
        email,
        password,
      }

      console.log(data)

      signinUserEmail(data)
        .then(async (res)=>{
          console.log("res", res);
          if(res.status ===200) {
            console.log("ça passe");
            await storeData(config.storageTokenKey, res.content.token)
            dispatch(loginUser({user: res.content.user, userEmail: res.content.userEmail}))
          } else {
            if(res.error !== null) {
              if(typeof res.error === "string") {
                setMsg(res.error);
              } else {
                setMsg(res.error.error);
              }
            }
            
          }
        })
    }


    return (
      <View style={{...styles.container, ...{backgroundColor: visible ? 'gray' : 'white'}}}>
        <ImageBackground source={require('../../../../assets/background.png')} resizeMode="cover" style={{...styles.container, ...styles.imageBackground}}>
          <WhiteOpacity>
            <>
              <Text style={styles.mainTitle}>Se connecter à KALI</Text>
              <CustomButton
                  onPress={()=>{
                    toggleBottomNavigationView()
                  }}
                  title="Connexion email"
                  buttonStyle='validation'
              />
              <FacebookButton
                  onPress={()=>{
                    handlePressAsync()
                  }}
                  title="Connexion Facebook"
              />
              <GoogleButton
                  onPress={()=>{
                    promptAsyncGoogle();
                  }}
                  title="Connexion Google"
              />
              <Card
                  visible={visible}
                  toggleBottomNavigationView={toggleBottomNavigationView}
                  closeBottomView={()=>{
                    setVisible(false)
                  }}
                  height={400}
              >
                  <>
                    <Text style={title2}>Se connecter</Text>
                    {msg !== null && <Text>{msg}</Text>}
                    <View>
                    <TextInput
                      style={inputStyle}
                      value={email}
                      onChangeText={(value)=>{
                        setEmail(value)
                      }}
                      placeholder="Email"
                    />
                    <TextInput
                      style={inputStyle}
                      value={password}
                      onChangeText={(value)=>{
                        setPassword(value)
                      }}
                      placeholder="Mot de passe"
                      secureTextEntry={true}
                    />
                    <CustomButton
                      onPress={()=>{
                        validateForm()
                      }}
                      title="Se connecter"
                      buttonStyle='validation'
                    />
                    </View>
                  </>
              </Card>
            </>
          </WhiteOpacity>
        </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 36,
    marginBottom: 36,
    width: 250,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.main,
    textShadowColor:'black',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  }
});
