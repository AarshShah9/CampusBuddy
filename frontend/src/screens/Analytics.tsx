import React from "react";
import { View, Text, ScrollView } from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-gifted-charts";
import PieChartAnalytics from "~/components/PieChartAnalytics";
import Statistics from "~/components/Statistics";

export default function Analytics() {
  // Fake data for charts
  const eventData = [
    { value: 100, label: "Jan" },
    { value: 200, label: "Feb" },
    { value: 150, label: "Mar" },
  ];

  const pieData = [
    {
      value: 50,
      label: "Engineering",
      color: "#037bfc",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      value: 30,
      label: "Arts",
      color: "#a516f7",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      value: 20,
      label: "Science",
      color: "#04b34f",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const lineData = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        data: [40, 80, 60],
        color: "#FFA726",
      },
    ],
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <Statistics />
        <View style={{ paddingVertical: 40, alignItems: "center" }}>
          <PieChartAnalytics />
        </View>
      </View>
    </ScrollView>
  );
}
