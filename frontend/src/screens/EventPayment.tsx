import { CardForm } from "@stripe/stripe-react-native";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { attendEvent } from "~/lib/apiFunctions/Events";
import useEventsContext from "~/hooks/useEventsContext";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function EventPayment() {
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  // const { confirmPayment } = useStripe();

  const [addressSheetVisible, setAddressSheetVisible] = useState(false);
  const { refetchEventDetails } = useEventsContext();
  const { navigateTo } = useNavigationContext();

  const {
    params: { eventId },
  } = useRoute<any>();

  // useEffect(() => {
  //   (async function () {
  //     setIsApplePaySupported(await isPlatformPaySupported());
  //   })();
  // }, [isPlatformPaySupported]);

  const attendMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await attendEvent(id);
    },
    onSuccess: () => {
      refetchEventDetails();
      navigateTo({ page: "EventDetails", id: eventId });
      Alert.alert("Success", "You have successfully got the tickets!");
    },
  });

  // const pay = async () => {
  //   // ...
  // };
  //
  // const handleCardDetailsChange = (cardDetails: any) => {
  //   if (cardDetails.complete) {
  //     setPaymentMethod(cardDetails);
  //   }
  // };

  const payWithCard = async () => {
    attendMutation.mutate({
      id: eventId,
    });

    // if (!paymentMethod) {
    //   alert("Please fill in your credit card details.");
    //   return;
    // }
    // // Assuming you have a payment intent or similar setup
    // const { error, paymentIntent } = await confirmPayment("client_secret", {
    //   type: "Card",
    //   billingDetails: {},
    // });
    // if (error) {
    //   alert(`Payment failed: ${error.message}`);
    // } else if (paymentIntent) {
    //   alert("Payment successful!");
    // }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        {/*<PlatformPayButton*/}
        {/*  onPress={pay}*/}
        {/*  type={PlatformPay.ButtonType.Pay}*/}
        {/*  appearance={PlatformPay.ButtonStyle.Black}*/}
        {/*  borderRadius={10}*/}
        {/*  style={{*/}
        {/*    width: "100%",*/}
        {/*    height: 50,*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<View style={styles.container}>*/}
        {/*  <View style={styles.line} />*/}
        {/*  <Text style={styles.text}>Or pay with card</Text>*/}
        {/*  <View style={styles.line} />*/}
        {/*</View>*/}
        {/*<CardField*/}
        {/*  postalCodeEnabled={true}*/}
        {/*  placeholders={{*/}
        {/*    number: "4242 4242 4242 4242",*/}
        {/*  }}*/}
        {/*  style={{*/}
        {/*    width: "100%",*/}
        {/*    height: 50,*/}
        {/*    marginVertical: 30,*/}
        {/*  }}*/}
        {/*  onCardChange={handleCardDetailsChange}*/}
        {/*/>*/}
        <CardForm
          style={{
            width: "100%",
            height: 170,
            marginVertical: 30,
          }}
          defaultValues={{
            countryCode: "CA",
          }}
          placeholders={{
            number: "4242 4242 4242 4242",
            expiration: "09/26",
            cvc: "813",
            postalCode: "A1A 1A1",
          }}
        />
        <Button
          style={{
            borderRadius: 8,
            width: "100%",
            height: 48,
          }}
          mode="contained"
          onPress={payWithCard}
        >
          <Text
            style={{
              lineHeight: 30,
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
              fontFamily: "Nunito-Bold",
            }}
          >
            Pay
          </Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    paddingHorizontal: 10,
  },
});
