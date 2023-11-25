import { SafeAreaView, TextInput, Text, View } from "react-native";
import { useState } from "react"
import { TouchableOpacity } from "react-native";
import email from 'react-native-email';
export default function Step3() {
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
    const sendEmail = () => {
        const to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'Show how to use',
            body: 'Some body right here',
            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch(console.error)
      };
    return (

        <View style={{ width: "100%", gap: 10, }}>
            <TouchableOpacity  onPress={sendEmail} style={{ backgroundColor: "#cdeaff", alignItems: "center", padding: 10, borderRadius: 10 }}><Text style={{ color: "#0f2346", fontWeight: "600" }}>Pošalji prijavu</Text></TouchableOpacity>
            <Text style={{ color: "red" }}>{error}</Text>
        </View>



    )
}

