import { SafeAreaView, TextInput, Text, View } from "react-native";
import { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native";
import DatePicker from 'react-native-date-picker'
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { updateUserData } from '../../../actions/UserActions';
import { connect } from "react-redux";
function Step1({ onNext, updateUserData, userData, validation }) {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [name_surname, setName] = useState("")
    const [mail, setMail] = useState("")
    const [error, setError] = useState([])
    const [initalValue, setInital] = useState()
    useEffect(() => {
     setInital(userData);

    },[])
    const handleNext = () => {
        updateUserData({ name_surname });
        updateUserData({ mail });
    };
    const handleInputs = () => {
        if(name_surname.length < 3) {
            setError([...error, "name_usrname"])
        } else if(mail.length < 3) {
            setError([...error, "name_usrname"])
        }
    }
    return (
        <>
            <View style={{ width: "100%", gap: 10 }}>
                <Text style={{ fontWeight: "700", fontSize: 15 }} >Ime i Prezime</Text>
                <TextInput onChangeText={(e) => {setName(e); handleNext()}} placeholder="Ime i prezime" style={{ borderColor: "#CBCBCB", borderWidth: 1, padding: 10, borderRadius: 10 }} defaultValue={initalValue ? initalValue.name_surname : null}></TextInput>
                {validation.some((item) => item.includes("name_surname")) ? <Text style={{color: "red"}}>Ime i prezime moraju biti duzi od 6 karaktera</Text> : null}
                <Text style={{ fontWeight: "700", fontSize: 15 }}>E mail</Text>

                <TextInput onChangeText={(e) => {setMail(e); handleNext()}}   keyboardType="email-address" placeholder="example@example.com" style={{ borderColor: "#CBCBCB", borderWidth: 1, padding: 10, borderRadius: 10 }} defaultValue={initalValue ? initalValue.mail: null}></TextInput>
                {validation.some((item) => item.includes("mail")) ? <Text style={{color: "red"}}>Email koji ste unijeli nije važeći </Text> : null}

                <Text style={{ fontWeight: "700", fontSize: 15 }}>Datum rodjenja</Text>
                <TextInput onFocus={() => setOpen(true)} placeholder="Datum rodjenja" style={{ borderColor: "#CBCBCB", borderWidth: 1, padding: 10, borderRadius: 10 }}>{date.toISOString().split('T')[0]}</TextInput>
            </View>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
     
            </>
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


export default connect(mapStateToProps, mapDispatchToProps)(Step1);