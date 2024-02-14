import { View } from "react-native"
import styled from "styled-components";
import useThemeContext from "~/hooks/useThemeContext";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
  } from "react-native-reanimated";
const IMG_HEIGHT = 300;

export default function CreateMarketplace(){
    const {theme} = useThemeContext();
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffSet = useScrollViewOffset(scrollRef);
    
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {
              translateY: interpolate(
                scrollOffSet.value,
                [-IMG_HEIGHT, 0, IMG_HEIGHT],
                [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
              ),
            },
            {
              scale: interpolate(
                scrollOffSet.value,
                [-IMG_HEIGHT, 0, IMG_HEIGHT],
                [3, 1, 1],
              ),
            },
          ],
        };
      });
    return(
        <MainContainer color={theme.colors.primary}>
            <HeaderContainer>

            </HeaderContainer>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollRef}
                style={{ height: "100%", backgroundColor: "white" }}
                scrollEventThrottle={16}
            >
        
           
        
            </Animated.ScrollView>
        </MainContainer>
    )
}
const MainContainer = styled(View)<{ color: string }>`
    height: 100%;
    background-color: ${(props) => props.color};
`;

const HeaderContainer = styled(View)`
  width: 100%;
  height: 100px; /* TODO this should be consistent across the app */
  justify-content: space-between;
  flex-direction: row;
`;