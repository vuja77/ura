

import { SafeAreaView, TextInput, Text, View } from "react-native";
import { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { updateUserData } from "../../../actions/UserActions";
import { connect } from "react-redux";
function Step2({updateUserData, userData, validation}) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [name_surname, setName] = useState("")
    const [mail, setMail] = useState("")
    const [Town, setTown] = useState("")
    const [Telefon, setTelefon] = useState("")
    const [Doprinos, setDoprinos] = useState("")
    const [zanimanje, setZanimanje] = useState("")
    const [Adresa, setAdresa] = useState("")
    const [error, setError] = useState("")
    const [send, setSend] = useState(false);
    const [initalValue, setInital] = useState()
    useEffect(() => {
     setInital(userData);

    },[])
    const handleNext = () => {
        updateUserData({ Town });
        updateUserData({ Adresa });
        updateUserData({ Telefon });
    };
    return (

        <View style={{ width: "100%", gap: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 15 }}>Grad</Text>
            <TextInput onChangeText={(e) => {setTown(e); handleNext()}} placeholder="Grad" style={{ borderColor: "#CBCBCB", borderWidth: 1, padding: 10, borderRadius: 10 }} defaultValue={initalValue ? initalValue.Town : null}></TextInput>
            {validation.some((item) => item.includes("town")) ? <Text style={{color: "red"}}>Grad mora biti duze od 6 karaktera</Text> : null}
        
            <Text style={{ fontWeight: "700", fontSize: 15 }}>Adresa</Text>
            <TextInput onChangeText={(e) => {setAdresa(e); handleNext()}} placeholder="Adresa" style={{ borderColor: "#CBCBCB", borderWidth: 1, padding: 10, borderRadius: 10 }} defaultValue={initalValue ? initalValue.Adresa : null}></TextInput>
            {validation.some((item) => item.includes("adresa")) ? <Text style={{color: "red"}}>Adresa mora biti duza od 6 karaktera</Text> : null}

            <Text style={{ fontWeight: "700", fontSize: 15 }}>Telefon</Text>
            <TextInput keyboardType="phone-pad" onChangeText={(e) => {setTelefon(e); handleNext()}} placeholder="Telefon" style={{ borderColor: "#CBCBCB", borderWidth: 1, padding: 10, borderRadius: 10 }} defaultValue={initalValue ? initalValue.Telefon : null}></TextInput>
            {validation.some((item) => item.includes("telefon")) ? <Text style={{color: "red"}}>Unesite važeći broj telefona</Text> : null}

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


export default connect(mapStateToProps, mapDispatchToProps)(Step2);