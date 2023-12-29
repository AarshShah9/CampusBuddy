import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import InputField from "~/components/InputField";
import useThemeContext from "~/hooks/useThemeContext";
 
export default function Login() {
    const {theme} = useThemeContext(); 
  return (
    <View style={[styles.main_container,{backgroundColor:theme.colors.primary}]}>
      <View style={styles.logo_container}>
        <Image
          style={{ marginTop: 42 }}
          source={require("../../assets/Campus_Buddy_Logo.png")}
        />
      </View>
      <View style={[styles.layover_container,{backgroundColor:theme.colors.tertiary}]}>
        <Text style={styles.header}>{"Login"}</Text>
        <InputField name="Email" placeholder="Email" />
        <InputField name="Password" placeholder="Password" />
        <Button
          style={[styles.button,{backgroundColor:theme.colors.primary}]}
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          <Text style={{fontSize:20,fontWeight:'bold', color:'white'}}>{"Login"}</Text>
        </Button>
        <Text style={styles.signUpText}>
        {"Don't have any account? "}
        <TouchableOpacity onPress={()=>{}}>
          <Text style={{ color:theme.colors.primary}}>
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
   
  },
  logo_container: {
    height: "28%",
    alignItems: "center",
    justifyContent: "center",
  },
  layover_container: {
    height: "74%",
    width: "100%",
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

  },
  signUpText:{
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:64,
    fontSize:16
  }
});
