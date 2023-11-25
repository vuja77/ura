

import { SafeAreaView, TextInput, Text, View, Picker } from "react-native";
import { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { updateUserData } from "../../../actions/UserActions";
import { connect } from "react-redux";
function Step3({updateUserData, userData, validation}) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [name_surname, setName] = useState("")
    const [mail, setMail] = useState("")
    const [Town, setTown] = useState("")
    const [Telefon, setTelefon] = useState("")
    const [Doprinos, setDoprinos] = useState("")
    const [Zanimanje, setZanimanje] = useState("")
    const [Adresa, setAdresa] = useState("")
    const [error, setError] = useState("")
    const [send, setSend] = useState(false);
    const [initalValue, setInital] = useState()
    useEffect(() => {
     setInital(userData);

    },[])
    const handleNext = () => {
        updateUserData({ Doprinos });
        updateUserData({ Zanimanje });
    };
    return (

        <View style={{ width: "100%", gap: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 15 }}>Zanimanje</Text>

            <TextInput onChangeText={(e) => {setZanimanje(e); handleNext()}} placeholder="Zanimanje" style={{ borderColor: "#CBCBCB", borderWidth: 1, padding: 10, borderRadius: 10 }} defaultValue={initalValue ? initalValue.Zanimanje : null}></TextInput>
            {validation.some((item) => item.includes("zanimanje")) ? <Text style={{color: "red"}}>Upišite vaše zanimjane</Text> : null}

            <Text style={{ fontWeight: "700", fontSize: 15 }}>Doprinos</Text>

            <TextInput onChangeText={(e) => {setDoprinos(e); handleNext()}} placeholder="Zelim da doprinesem u oblasti" style={{ borderColor: "#CBCBCB", borderWidth: 1, padding: 10, borderRadius: 10 }} defaultValue={initalValue ? initalValue.Doprinos : null}></TextInput>
            {validation.some((item) => item.includes("doprinos")) ? <Text style={{color: "red"}}>Upišite u kojoj oblasti želite doprijeniti</Text> : null}

        </View>


    )
}

const mapDispatchToProps = {
    updateUserData,
};
const mapStateToProps = (state) => {
    return {
        userData: state.user.userData,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Step3);