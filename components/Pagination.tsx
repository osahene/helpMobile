import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { SharedValue } from "react-native-reanimated";

// Define the prop types
interface PaginationProps {
  data: any[];
  x: SharedValue<number>;
  screenWidth: number;
}

interface PaginationCompProps {
  i: number;
  x: SharedValue<number>;
  screenWidth: number;
}

const PaginationComp: React.FC<PaginationCompProps> = ({
  i,
  x,
  screenWidth,
}) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
      [10, 20, 10],
      Extrapolation.CLAMP
    );
    const opacityAnimation = interpolate(
      x.value,
      [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  return <Animated.View style={[styles.dotDirection, animatedDotStyle]} />;
};

const Pagination: React.FC<PaginationProps> = ({ data, x, screenWidth }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.isArray(data)
        ? data.map((_, i) => (
            <PaginationComp i={i} key={i} x={x} screenWidth={screenWidth} />
          ))
        : null}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dotDirection: {
    width: 20,
    height: 10,
    backgroundColor: "orange",
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
