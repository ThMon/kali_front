import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Card from '../../../design-system/molecules/card';
import { title2 } from '../../../styles/global/text';
import CustomButton from '../../../design-system/atoms/buttons/customButton';
import FacebookButton from '../../../design-system/atoms/buttons/facebookButton';
import GoogleButton from '../../../design-system/atoms/buttons/googleButton';
import { colors } from '../../../styles/global/globalStyles';
import WhiteOpacity from '../../../design-system/atoms/opacity/white';
import { signinUserEmail, signinUserGoogle, signinUserFacebook } from '../../../api/user';
import { UserEmailSigninMinimumQuery } from '../../../types/user/user-email-types';
import { UserFacebookSignupMinimumQuery } from '../../../types/user/user-facebook-types';
import { UserGoogleSignupMinimumQuery } from '../../../types/user/user-google-types';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hook';
import { loginUser } from '../../../lib/redux/user/userReducer';
import { storeData } from '../../../lib/helpers/utils/asyncStorage';
import { config } from '../../../../config';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { connectGoogle } from '../../../services/google/signinGoogle';
import { useTranslate } from '../../../services/translate/useTranslate';
import Select from '../../../design-system/atoms/select';
import { changeLang } from '../../../lib/redux/user/userReducer';
import Ionicons from '@expo/vector-icons/Ionicons';
import TextField from '../../../design-system/atoms/textField';
import { changeIsLoading } from '../../../lib/redux/load/loadReducer';


WebBrowser.maybeCompleteAuthSession();

export default function Signin():ReactElement {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.user.lang);
  const translate = useTranslate();

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<null | string>(null);
    const [tokenGoogle, setTokenGoogle] = useState("");
    const [userInfoGoogle, setUserInfoGoogle] = useState(null);
    const [user, setUser] = useState(null);

    const { requestGoogle, responseGoogle, promptAsyncGoogle } = connectGoogle(Google)


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
          profil_type: "particular",
          organisation_name: null,
          lang: lang ?? 'fr'
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
              profil_type: "particular",
              organisation_name: null,
              lang: lang ?? 'fr'
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
      dispatch(changeIsLoading(true))
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
          dispatch(changeIsLoading(false))
        })
    }


    return (
      <View style={{...styles.container, ...{backgroundColor: visible ? 'gray' : 'white'}}}>
        <ImageBackground source={require('../../../../assets/background.png')} resizeMode="cover" style={{...styles.container, ...styles.imageBackground}}>
          <WhiteOpacity>
            <>
              <Text style={styles.mainTitle}>{translate('login_page.title')}</Text>
              <CustomButton
                  onPress={()=>{
                    toggleBottomNavigationView()
                  }}
                  title={translate('login_page.button_email_connexion')}
                  buttonStyle='validation'
              />
              <FacebookButton
                  onPress={()=>{
                    handlePressAsync()
                  }}
                  title={translate('login_page.button_fb_connexion')}
              />
             
              <GoogleButton
                  onPress={()=>{
                    promptAsyncGoogle();
                  }}
                  title={translate('login_page.button_google_connexion')}
              />
              <Select
                data={[translate('general.choice_lang'), translate('general.fr_lang'),translate('general.en_lang') ]}
                defaultValue={translate('general.choice_lang')}
                onSelect={(selectedItem, index) => {
                  if(selectedItem === translate('general.fr_lang')) {
                    dispatch(changeLang('fr'))
                  }
                  if(selectedItem === translate('general.en_lang')) {
                    dispatch(changeLang('en'))
                  }

                 
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item
                }}
                renderDropdownIcon={isOpened => {
                  return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
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
                    <TextField
                      value={email}
                      onChangeText={(value)=>{
                        setEmail(value)
                      }}
                      placeholder="Email"
                    />
                    <TextField
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
                      title="Enregistrer"
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
