import React, { useContext, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { MobXProviderContext } from "mobx-react";
import { LineChart } from "react-native-chart-kit";
import { SensorDataList } from "@/models/sensor";
import { dateTimeToTimeFormatter } from "@/domain/dateTimeFormatter";

interface SensorGraphProps {
  sensorDataList: SensorDataList;
  // Enables a single decimal place for the horizontal labels (y axis).
  isDecimal?: boolean;
  colourScheme?: string;
}

const SensorGraph = (props: SensorGraphProps) => {
  const { userViewModel } = useContext(MobXProviderContext);
  const theme = useTheme();

  const [parentDims, setParentDims] = useState({ width: 0, height: 0 });

  // Used to resize the chart dynamically. The chart can't take percentage values (e.g. "100%").
  const onParentLayout = (event: {
    nativeEvent: { layout: { width: any; height: any } };
  }) => {
    const { width, height } = event.nativeEvent.layout;
    setParentDims({ width, height });
  };

  // Makes a list for the vertical labels (x axis) based on the timestamp of each sensorData value.
  const labelList = props.sensorDataList.sensorData.map((dataPoint) => {
    return dateTimeToTimeFormatter(dataPoint.timestamp, userViewModel.locale);
  });

  // Makes a list for the chart values based on the value of each sensorData value.
  const dataList = props.sensorDataList.sensorData.map(
    (dataPoint) => dataPoint.value
  );

  // Note that the colours are bugged in web in the dev build. They work fine on mobile though.
  // If several graphs are rendered on the same page then they all have the same colour (the
  // colour of the first graph).
  const getGradientFromForColourScheme = () => {
    switch (props.colourScheme) {
      case "blue":
        return "#2193b0";
      case "orange":
        return "#f12711";
      case "green":
        return "#11998e";
      case "violet":
        return "#654ea3";
      default:
        return "#0F2027";
    }
  };

  const getGradientToForColourScheme = () => {
    switch (props.colourScheme) {
      case "blue":
        return "#6dd5ed";
      case "orange":
        return "#f5af19";
      case "green":
        return "#38ef7d";
      case "violet":
      default:
        return "#2C5364";
    }
  };

  return (
    <View onLayout={onParentLayout}>
      <LineChart
        data={{
          labels: labelList,
          datasets: [
            {
              data: dataList,
            },
          ],
        }}
        width={parentDims.width}
        height={200}
        yAxisLabel=""
        yAxisSuffix={` ${props.sensorDataList.measurement}`}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: theme.colors.background,
          backgroundGradientFrom: getGradientFromForColourScheme(),
          backgroundGradientTo: getGradientToForColourScheme(),
          decimalPlaces: props.isDecimal ? 1 : 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ff9966",
          },
          propsForLabels: {
            font: theme.fonts.bodySmall,
          },
          propsForVerticalLabels: {
            dy: -5,
            dx: -5,
          },
        }}
        verticalLabelRotation={25}
        bezier
        style={{
          ...theme.fonts.bodySmall,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default SensorGraph;
