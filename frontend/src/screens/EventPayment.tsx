import {
  PlatformPayButton,
  isPlatformPaySupported,
  PlatformPay,
  CardField,
  useStripe,
  AddressSheet,
  AddressSheetError,
  CardForm,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GOOGLE_MAPS_API_KEY } from "@env";

export default function EventPayment() {
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { confirmPayment } = useStripe();
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    line1: "",
    city: "",
    postal_code: "",
    state: "",
    country: "",
  });
  const [addressSheetVisible, setAddressSheetVisible] = useState(false);

  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

  // ...

  const pay = async () => {
    // ...
  };

  const handleCardDetailsChange = (cardDetails: any) => {
    if (cardDetails.complete) {
      setPaymentMethod(cardDetails);
    }
  };

  const payWithCard = async () => {
    if (!paymentMethod) {
      alert("Please fill in your credit card details.");
      return;
    }
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
        <PlatformPayButton
          onPress={pay}
          type={PlatformPay.ButtonType.Order}
          appearance={PlatformPay.ButtonStyle.Black}
          borderRadius={4}
          style={{
            width: "100%",
            height: 50,
            borderRadius: 10,
          }}
        />
        <AddressSheet
          defaultValues={{
            phone: "111-222-3333",
            address: {
              country: "United States",
              city: "San Francisco",
            },
          }}
          additionalFields={{
            phoneNumber: "required",
          }}
          allowedCountries={["CA"]}
          primaryButtonTitle={"Use this address"}
          sheetTitle={"Shipping Address"}
          googlePlacesApiKey={GOOGLE_MAPS_API_KEY}
          visible={addressSheetVisible}
          onSubmit={async (addressDetails) => {
            setAddressSheetVisible(false);
          }}
          onError={(error) => {
            if (error.code === AddressSheetError.Failed) {
              Alert.alert("There was an error.", "Check the logs for details.");
              console.log(error?.localizedMessage);
            }
            setAddressSheetVisible(false);
          }}
        />
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={handleCardDetailsChange}
        />
        <CardForm
          style={{
            width: "100%",
            height: 170,
            marginVertical: 30,
          }}
        />
        <Button
          title="Add Shipping Address"
          onPress={() => setAddressSheetVisible(true)}
        />
        <Button title="Pay with Card" onPress={payWithCard} />
      </View>
    </TouchableWithoutFeedback>
  );
}
