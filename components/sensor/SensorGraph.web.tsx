import React, { useContext, useState } from "react";
import { View } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { MobXProviderContext } from "mobx-react";
import {
  VictoryLine,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryAxis,
  VictoryLabel,
} from "victory";
import { SensorDataList } from "@/models/sensor";
import {
  dateTimeFormatter,
  dateTimeToTimeFormatter,
} from "@/domain/dateTimeFormatter";

interface SensorGraphProps {
  sensorDataList: SensorDataList;
  // Enables a single decimal place for the horizontal labels (y axis).
  isDecimal?: boolean;
  colourScheme?: string;
  onClick: () => void;
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

  /*
  // Makes a list for the vertical labels (x axis) based on the timestamp of each sensorData value.
  const labelList = props.sensorDataList.sensorData.map((dataPoint) => {
    return dateTimeToTimeFormatter(dataPoint.timestamp, userViewModel.locale);
  });

  // Makes a list for the chart values based on the value of each sensorData value.
  const dataList = props.sensorDataList.sensorData.map(
    (dataPoint) => dataPoint.value
  );
  */

  const data = props.sensorDataList.sensorData.map((dataPoint) => ({
    x: dateTimeFormatter(dataPoint.timestamp, userViewModel.locale),
    y: dataPoint.value,
    label: dataPoint.value,
  }));

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
    <View
      onLayout={onParentLayout}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer label={(d) => `${d.label}`} />
        }
      >
        <VictoryLine
          labelComponent={
            <VictoryTooltip
              style={{
                fontSize: theme.fonts.bodySmall.fontSize,
                fontFamily: theme.fonts.bodySmall.fontFamily,
                fontWeight: theme.fonts.bodySmall.fontWeight,
                fill: theme.colors.onPrimaryContainer,
              }}
              flyoutStyle={{
                fill: theme.colors.primaryContainer,
              }}
            />
          }
          data={data}
          style={{
            data: {
              stroke: theme.colors.primary,
              strokeWidth: 3,
            },
          }}
        />
        <VictoryAxis
          tickLabelComponent={<VictoryLabel angle={45} dx={20} />}
          tickFormat={(x) =>
            `${dateTimeToTimeFormatter(x, userViewModel.locale)}`
          }
          style={{
            tickLabels: {
              ...theme.fonts.bodySmall,
              fill: theme.colors.onBackground,
            },
            axis: {
              stroke: theme.colors.onBackground,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `${y} ${props.sensorDataList.measurement}`}
          style={{
            tickLabels: {
              ...theme.fonts.bodySmall,
              fill: theme.colors.onBackground,
            },
            axis: {
              stroke: theme.colors.onBackground,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default SensorGraph;
