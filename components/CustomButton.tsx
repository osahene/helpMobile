import React from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SharedValue } from "react-native-reanimated";
interface CustomButtonProps {
  flatListRef: React.RefObject<Animated.FlatList<any>>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  flatListRef,
  flatListIndex,
  dataLength,
}) => {
  const navigation = useNavigation();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  const handlePress = () => {
    if (flatListIndex.value < dataLength - 1) {
      flatListIndex.value + 1;
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      navigation.navigate("Home" as never); // Adjust type for your navigation
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
          <FontAwesomeIcon icon={faArrowRight} size={50} color="#ffffff" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 20,
  },
  arrow: {
    //   position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    position: "absolute",
  },
});
