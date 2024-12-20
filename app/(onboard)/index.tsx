import { ThemedText } from "@/components/ThemedText";
import { Stack, router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import {
  faBookReader,
  faShareFromSquare,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

type OnboardStep = {
  id: number;
  icons: typeof faTruckFast; // Type for FontAwesomeIcon
  title: string;
  title2?: string;
  description: string;
};
type viewablProp = {
  viewableItems: any[];
};

const onboardSteps: OnboardStep[] = [
  {
    id: 1,
    icons: faTruckFast,
    title: "Welcome to",
    title2: "Help OO Help",
    description:
      "Use our services to swiftly reach out to your loved ones in real time during emergency situations.",
  },
  {
    id: 2,
    icons: faShareFromSquare,
    title: "Swift Info Sharing",
    description:
      "Provide your loved ones with all the necessary about your current situation and whereabout in just two taps.",
  },
  {
    id: 3,
    icons: faBookReader,
    title: "Emergency Tips",
    description:
      "Get all the latest tips and education on how to handle both emergency and security situations.",
  },
];

export default function OnboardPage() {
  const [screenIndex, setScreenIndex] = useState(0);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const x = useSharedValue(0);
  const flatListRef = useAnimatedRef();
  const flatListIndex = useSharedValue(0);
  const onVIewableItemChanged: React.FC<viewablProp> = ({ viewableItems }) => {
    return (flatListIndex.value = viewableItems[0].index);
  };
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const data = onboardSteps[screenIndex];

  const onContinue = () => {
    const lastScreen = screenIndex === onboardSteps.length - 1;
    if (lastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  type RenderedItemsProps = {
    item: OnboardStep;
    index: number;
  };
  type PageProp = {
    data: any[];
    x: number;
    screenWidth: number;
  };
  const RenderedItems: React.FC<RenderedItemsProps> = ({ item, index }) => {
    const imageAnimatedStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP
      );
      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        transform: [{ translateY: translateYAnimation }],
      };
    });
    const textAnimatedStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP
      );
      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
      };
    });
    return (
      <View style={{ width: SCREEN_WIDTH }}>
        <Animated.View style={[styles.logo, imageAnimatedStyle]}>
          <FontAwesomeIcon color="#FDFDFD" size={100} icon={item.icons} />
        </Animated.View>
        <Animated.View style={[styles.footer, textAnimatedStyle]}>
          <Text style={styles.titles}>{item.title}</Text>
          <Text style={styles.titles}>{item.title2}</Text>
          <ThemedText style={styles.description}>
            {item.description}{" "}
          </ThemedText>
        </Animated.View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <Animated.FlatList
        onScroll={onScroll}
        data={onboardSteps}
        renderItem={({ item, index }) => (
          <RenderedItems item={item} index={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onVIewableItemChanged}
      />
      <View style={styles.buttomContainer}>
        <Text style={styles.buttonText}>Skip</Text>
        <Pagination data={onboardSteps} x={x} screenWidth={SCREEN_WIDTH} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={onboardSteps.length}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  titles: {
    fontSize: 50,
    fontFamily: "PoppinsBlack",
    letterSpacing: 1.3,
    marginVertical: 20,
    textShadowColor: "white",
    color: "#fdfdfd",
  },
  description: {
    fontFamily: "PoppinsLight",
    fontSize: 30,
    lineHeight: 40,
  },
  logo: {
    display: "flex",
    color: "red",
    flexDirection: "row",
    margin: 20,
    alignSelf: "center",
  },
  logoControl: {
    position: "relative",
    right: -10,
  },
  footer: {
    marginTop: "auto",
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    padding: 15,
    paddingHorizontal: 20,
    fontFamily: "PoppinsBold",
    fontSize: 30,
    color: "white",
  },
  buttomContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});
