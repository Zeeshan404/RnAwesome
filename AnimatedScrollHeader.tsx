import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 100;
const SCROLL_THRESHOLD = 300;

interface AnimatedScrollHeaderProps {
  headerImage: string;
  title: string;
}

const AnimatedScrollHeader: React.FC<AnimatedScrollHeaderProps> = ({ headerImage, title }) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP
    );

    return {
      height,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      overflow: 'hidden',
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD / 2],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const orangeBackgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      backgroundColor: 'orange',
      ...StyleSheet.absoluteFillObject,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [32, 24],
      Extrapolation.CLAMP
    );

    const bottom = interpolate(
      scrollY.value,
      [0, SCROLL_THRESHOLD],
      [32, 16],
      Extrapolation.CLAMP
    );

    return {
      fontSize,
      bottom,
      color: 'white',
      position: 'absolute',
      left: 16,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={headerStyle}>
        <Animated.View style={orangeBackgroundStyle} />
        <Animated.Image source={{ uri: headerImage }} style={[styles.image, imageStyle]} />
        <Animated.Text style={titleStyle}>{title}</Animated.Text>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Add your scroll content here */}
        <View style={{ paddingTop: HEADER_MAX_HEIGHT }}>
          <Text style={styles.contentText}>Your content goes here</Text>
          {/* Add more content as needed */}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: SCREEN_WIDTH,
    height: HEADER_MAX_HEIGHT,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    minHeight: SCREEN_HEIGHT + HEADER_MAX_HEIGHT,
    backgroundColor:'red'
  },
  contentText: {
    padding: 16,
    fontSize: 18,
  },
});

export default AnimatedScrollHeader;