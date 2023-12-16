import { SafeAreaView, TextInput, Text, View } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import { updateUserData } from "../../actions/UserActions";
import { connect } from "react-redux";
import Header from "../Components/Header";
function Pristupnica({ navigation, userData }) {
  const [korak, setKorak] = useState(1);
  const [error, setError] = useState([]);
  const koraciData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nextStep = () => {
    if (userData.mail !== undefined && userData.name_surname !== undefined) {
      if (
        userData.name_surname.length > 6 &&
        emailRegex.test(userData.mail) &&
        korak === 1
      ) {
        setKorak(korak + 1);
      }
    }
    if (
      userData.Town !== undefined &&
      userData.Adresa.length !== undefined &&
      userData.Telefon !== undefined
    ) {
      if (
        userData.Town.length > 6 &&
        userData.Adresa.length > 6 &&
        userData.Telefon.length > 7 &&
        korak === 2
      ) {
        setKorak(korak + 1);
      }
    }
    if (
      userData.Zanimanje !== undefined &&
      userData.Doprinos.length !== undefined
    ) {
      if (
        userData.Zanimanje.length > 3 &&
        userData.Doprinos.length > 3 &&
        korak === 3
      ) {
        setKorak(korak + 1);
      }
    }
  };
  const validation = () => {
    const newError = [];
    if (
      userData.mail !== undefined &&
      userData.name_surname !== undefined &&
      korak == 1
    ) {
      console.log(emailRegex.test(userData.mail));
      if (emailRegex.test(userData.mail)) {
        setError(error.filter((e) => e !== "mail"));
      } else {
        newError.push("mail");

        console.log("d");
      }
      if (userData.name_surname.length < 6) {
        console.log("b");
        newError.push("name_surname");
      } else {
        const a = error.filter((e) => e !== "name_surname");
        setError(a);
      }
    } else if (korak === 1) {
      newError.push("mail");
      newError.push("name_surname");
    }

    if (
      userData.Town !== undefined &&
      userData.Adresa !== undefined &&
      userData.Telefon !== undefined
    ) {
      if (userData.Town.length < 6) {
        newError.push("town");
      } else {
        setError(error.filter((e) => e !== "mail"));
      }
      if (userData.Adresa.length < 6) {
        newError.push("adresa");
      } else {
        setError(error.filter((e) => e !== "mail"));
      }
      if (userData.Telefon.length < 8) {
        newError.push("telefon");
      } else {
        setError(error.filter((e) => e !== "telefon"));
      }
    } else if (korak == 2) {
      newError.push("town");
      newError.push("adresa");
    }
    if (
      userData.Zanimanje !== undefined &&
      userData.Doprinos !== undefined &&
      korak == 3
    ) {
      if (userData.Doprinos.length < 3) {
        newError.push("doprinos");
      } else {
        setError(error.filter((e) => e !== "mail"));
      }
      if (userData.Zanimanje.length < 3) {
        newError.push("zanimanje");
      } else {
        setError(error.filter((e) => e !== "mail"));
      }
    } else if (korak == 3) {
      newError.push("zanimanje");
      newError.push("doprinos");
    }
    setError([error, ...newError]);
    newError.length = 0;
  };
  return (
    <>
      <Header></Header>
      <SafeAreaView
        style={{
          backgroundColor: "white",
          gap: 15,
          marginTop: 15,
          alignItems: "center",
          paddingStart: 15,
          paddingEnd: 15,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ width: "100%", gap: 10 }}>
          <Text style={{ fontWeight: "700", fontSize: 23 }}>
            Tvoja karta za promjene! Budi naš član!
          </Text>
          <Text
            style={{ fontWeight: "700", fontSize: 23, alignSelf: "flex-start" }}
          >
            Korak {korak}
          </Text>
          {korak === 1 ? (
            <Step1 navigation={navigation} validation={error} />
          ) : korak === 2 ? (
            <Step2 navigation={navigation} validation={error} />
          ) : korak === 3 ? (
            <Step3 navigation={navigation} validation={error} />
          ) : korak === 4 ? (
            <Step4 navigation={navigation} validation={error} />
          ) : null}
        </View>
        <View style={{ width: "100%", gap: 30 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            {koraciData.map((e, index) => {
              return (
                <TouchableOpacity
                key={index}
                  style={[
                    {
                      backgroundColor: "#cdeaff",
                      height: 7,
                      flex: 1,
                      borderRadius: 20,
                    },
                    korak >= e.id && { backgroundColor: "#0f2346" },
                  ]}
                ></TouchableOpacity>
              );
            })}
          </View>
          <View
            style={[
              { flexDirection: "row", justifyContent: "space-between" },
              korak === 1 && { justifyContent: "flex-end" },
            ]}
          >
            {korak !== 1 ? (
              <TouchableOpacity
                onPress={() => setKorak(korak - 1)}
                style={{
                  backgroundColor: "#E4E4E4",
                  padding: 10,
                  borderRadius: 50,
                  aspectRatio: "1/1",
                  alignItems: "center",
                  height: 41,
                }}
              >
                <Icon name="angle-left" size={20} color="black"></Icon>
              </TouchableOpacity>
            ) : null}
            {korak !== koraciData.length ? (
              <TouchableOpacity
                onPress={() => {
                  nextStep();
                  validation();
                }}
                style={{
                  backgroundColor: "#0f2346",
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <Icon name="check" size={20} color="#cdeaff"></Icon>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const mapDispatchToProps = {
  updateUserData,
};
const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pristupnica);
