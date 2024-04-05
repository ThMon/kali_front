import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Dimensions } from 'react-native';
import Card from '../../../design-system/molecules/card';
import { inputStyle } from '../../../styles/global/form';
import {  title2 } from '../../../styles/global/text';
import CustomButton from '../../../design-system/atoms/buttons/customButton';
import FacebookButton from '../../../design-system/atoms/buttons/facebookButton';
import GoogleButton from '../../../design-system/atoms/buttons/googleButton';
import { colors } from '../../../styles/global/globalStyles';
import WhiteOpacity from '../../../design-system/atoms/opacity/white';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import { signupUser } from '../../../api/user';
import { UserEmailSignupMinimumQuery } from '../../../types/user/user-email-types';
import { useAppDispatch } from '../../../lib/redux/hook';
import Select from '../../../design-system/atoms/select';
import { useAppSelector } from '../../../lib/redux/hook';


export default function Signup() {
    const dispatch = useAppDispatch();
    const lang = useAppSelector(state => state.user.lang);

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState<"particular" | "organization">("particular");
    const [organizationName, setOrganizationName] = useState('');
    const [msg, setMsg] = useState<null | string>(null)

    const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      setVisible(!visible);
    };

    const validateForm = ()=>{
      let organisation_name:string | null= null;
      if(organizationName !== "") {
        organisation_name = organizationName
      }

      const data: UserEmailSignupMinimumQuery = {
        email,
        password,
        connexion_type: "email",
        last_coords: [0, 0],
        phone_uuid: "zefvb13",
        type,
        organisation_name,
        lang: lang ?? 'fr'
      }

      console.log(data)

      signupUser(data)
        .then((res)=>{
          console.log("res", res);
          if(res.status ===200) {
            // console.log("ça passe");
            // dispatch(loginUser({user: res.content.user, userEmail: res.content.userEmail}))
            setMsg('compte créé');
            setVisible(false);
          }
        })
    }

    return (
      <View style={{...styles.container, ...{backgroundColor: visible ? 'gray' : 'white'}}}>
        <ImageBackground source={require('../../../../assets/background.png')} resizeMode="cover" style={{...styles.container, ...styles.imageBackground}}>
          <WhiteOpacity>
            <>
              <Text style={styles.mainTitle}>S'enregister à KALI</Text>
              {msg !== null && <Text>{msg}</Text>}
              <CustomButton
                  onPress={()=>{
                    toggleBottomNavigationView()
                  }}
                  title="Enregistrement email"
                  buttonStyle='validation'
              />
              <FacebookButton
                  onPress={()=>{
                    
                  }}
                  title="Enregistrement Facebook"
              />
              <GoogleButton
                  onPress={()=>{
                    
                  }}
                  title="Enregistrement Google"
              />
              <Card
                  visible={visible}
                  toggleBottomNavigationView={toggleBottomNavigationView}
                  closeBottomView={()=>{
                    setVisible(false)
                  }}
                  height={520}
              >
                  <>
                    <Text style={title2}>S'enregistrer</Text>
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

                    <Select
                      data={['Particulier', 'Organisation']}
                      defaultValue={"Particulier"}
                      onSelect={(selectedItem, index) => {

                        if(selectedItem === 'Particulier') {
                          setType('particular')
                        }

                        if(selectedItem === 'Organisation') {
                          setType('organization')
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
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      }}
                      dropdownIconPosition={'right'}
                   
                    />
                    {type ==="organization" && <TextInput
                      style={inputStyle}
                      value={password}
                      onChangeText={(value)=>{
                        setOrganizationName(value)
                      }}
                      placeholder="Nom de l'organisation"
                    />}
                    <CustomButton
                      onPress={()=>{
                        validateForm();
                      }}
                      title="S'enregistrer"
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
  },
  dropdown2BtnStyle: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    margin: 12,
    width: 280,
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
});
