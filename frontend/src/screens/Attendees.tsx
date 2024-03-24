import { useCallback, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import useThemeContext from "~/hooks/useThemeContext";
import useEventsContext from "~/hooks/useEventsContext";
import { useQuery } from "@tanstack/react-query";
import AttendeeCard from "~/components/AttendeeCard";
import { SearchArea } from "~/components/SearchArea";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function Attendees() {
  const {
    params: { id },
  } = useRoute<any>();
  const { getAttendees } = useEventsContext();
  const { theme } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: attendeeData } = useQuery({
    queryKey: ["attendees", id],
    queryFn: () => getAttendees(id),
  });

  const filteredAttendees = attendeeData?.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const setSearchQueryCallback = useCallback(
    (text: string) => {
      setSearchQuery(text);
    },
    [setSearchQuery],
  );

  const { navigateBack } = useNavigationContext();

  return (
    <MainContainer color={theme.colors.primary}>
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigateBack()}>
          <AntDesign name="caretleft" size={24} color="white" />
        </TouchableOpacity>
        <SearchArea setSearchQuery={setSearchQueryCallback} />
      </HeaderContainer>

      <FlatList
        data={filteredAttendees}
        renderItem={({ item }) => <AttendeeCard item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 16,
    color: "#333",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    alignSelf: "center",
    opacity: 0.2,
  },
  list: {
    backgroundColor: "white",
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  searchArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "87%",
    minWidth: 300,
    minHeight: 34,
    borderRadius: 10,
    paddingLeft: 6,
  },
  searchBarInput: {
    height: "90%",
    marginHorizontal: 5,
    fontSize: 18,
    flex: 0.98,
  },
});

// prettier-ignore
const MainContainer = styled(View) <{ color: string }>`
    height: 100%;
    background-color: ${(props) => props.color};
`;
// prettier-ignore
const HeaderContainer = styled(View)`
    width: 100%;
    height: 60px; /* TODO this should be consistent across the app */
    justify-content: space-between;
    padding: 0 20px;
    flex-direction: row;
    align-items: center
`;
