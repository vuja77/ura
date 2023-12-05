import { SafeAreaView, TextInput, Text, View, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import email from "react-native-email";
import { updateUserData } from "../../../actions/UserActions";
import { connect } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import Colors from "../../../Colors";
function Step4({ updateUserData, userData, validation }) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name_surname, setName] = useState("");
  const [mail, setMail] = useState("");
  const [Town, setTown] = useState("");
  const [Telefon, setTelefon] = useState("");
  const [Doprinos, setDoprinos] = useState("");
  const [zanimanje, setZanimanje] = useState("");
  const [Adresa, setAdresa] = useState("");
  const [error, setError] = useState("");
  const [send, setSend] = useState(false);
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);
  console.log(userData);
  const SendEmail = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Poslato");
    }, 1500);
    await axios
      .post(
        "https://emailservice.starko.me/api",
        {
          email: "ura.pokret@gmail.com",
          subject: "Pristupnica",
          text: "Djordjije Vujovic",
          html:
            "<div style='text-align: center; font-family: Arial, Helvetica, sans-serif;'><h1 style='background-color: #0F2346; color: white;text-align: center;padding: 20px;'>Pristupnica</h1><h2>Ime i prezime:</h2><p>" +
            userData.name_surname +
            "</p><hr><h2>Email:</h2><p>" +
            userData.mail +
            "</p><hr><h2>Datum rođenja:</h2><p>" +
            userData.date.toISOString().split("T")[0] +
            "</p><hr><h2>Grad:</h2><p>" +
            userData.Town +
            "</p><hr><h2>Adresa:</h2><p>" +
            userData.Adresa +
            "</p><hr><h2>Broj telefona:</h2><p>" +
            userData.Telefon +
            "</p><hr><h2>Zanimanje:</h2><p>" +
            userData.Zanimanje +
            "</p><hr><h2>Doprinos:</h2><p>" +
            userData.Doprinos +
            "</p></div>",
          bcc: "",
        },
        {
          headers: {
            "simple-email-service-token":
              "11634e8e-8d68-11ee-b9d1-0242ac120002",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {}, []);
  if (Loading === true) {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: Dimensions.get("screen").height,
          backgroundColor: "white",
          zIndex: 300,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ marginBottom: 220 }}>
          <ActivityIndicator
            color={Colors.primary}
            size={100}
          ></ActivityIndicator>
          <Text style={{ textAlign: "center" }}>Prijava se šalje</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{ width: "100%", gap: 10 }}>
      <TouchableOpacity
        onPress={() => SendEmail()}
        style={{
          backgroundColor: "#cdeaff",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#0f2346", fontWeight: "600" }}>
          Pošalji prijavu
        </Text>
      </TouchableOpacity>
      <Text style={{ color: "red" }}>{error}</Text>
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
