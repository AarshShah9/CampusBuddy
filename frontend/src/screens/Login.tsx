import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import InputField from "~/components/InputField";


export default function Login() {
  return (
    <View style={styles.main_container}>
      <View style={styles.logo_container}>
        <Image
          style={{ marginTop: 42 }}
          source={require("../../assets/Campus_Buddy_Logo.png")}
        />
      </View>
      <View style={styles.layover_container}>
        <Text style={styles.header}>{"Login"}</Text>
        <InputField name="Email" placeholder="Email" />
        <InputField name="Password" placeholder="Password" />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          <Text style={{fontSize:20,fontWeight:'bold', color:'white'}}>{"Login"}</Text>
        </Button>
        <Text style={styles.signUpText}>
        {"Don't have any account? "}
        <TouchableOpacity onPress={()=>{}}>
          <Text style={{ color: '3A86FF'}}>
            Sign up
          </Text>
        </TouchableOpacity>
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    height: "100%",
    backgroundColor: "#3A86FF",
  },
  logo_container: {
    height: "28%",
    alignItems: "center",
    justifyContent: "center",
  },
  layover_container: {
    height: "74%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 76,
  },

  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 64,
    marginBottom: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    width: "84%",
    height: "8%",
    fontSize:24,
    fontWeight:'bold',
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent:'center',
    backgroundColor:"#3A86FF"
  },
  signUpText:{
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:64,
    fontSize:16
  }
});
