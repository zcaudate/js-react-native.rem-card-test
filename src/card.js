import React from 'react'
import * as ReactNative from 'react-native'
import * as reanimated from 'react-native-reanimated'
import * as redash from 'react-native-redash'
import * as rnGesture from 'react-native-gesture-handler'

// js-react-native.rem-card-test.card/RATIO
const RATIO = 228 / 362

// js-react-native.rem-card-test.card/CARD-WIDTH
const CARD_WIDTH = ReactNative.Dimensions.get("window").width * 0.8

// js-react-native.rem-card-test.card/CARD-HEIGHT
const CARD_HEIGHT = CARD_WIDTH * RATIO

// js-react-native.rem-card-test.card/ASSETS
const ASSETS = [
  require("./assets/card1.png"),
  require("./assets/card2.png"),
  require("./assets/card3.png"),
  require("./assets/card4.png"),
  require("./assets/card5.png"),
  require("./assets/card6.png")
]

// js-react-native.rem-card-test.card/CARDS
const CARDS = {"Card1":0,"Card2":1,"Card3":2,"Card4":3,"Card5":4,"Card6":5}

// js-react-native.rem-card-test.card/Card
function Card(props){
  let {card} = props;
  return (
    <ReactNative.Image style={{
        "width":CARD_WIDTH,
        "height":CARD_HEIGHT,
        "backgroundColor":"cyan",
        "borderRadius":16
      }}
      source={ASSETS[card]}></ReactNative.Image>
    );
}

// js-react-native.rem-card-test.card/PanGesture
function PanGesture(props){
  let {height,width} = props;
  let boundX = width - CARD_WIDTH;
  let boundY = height - CARD_HEIGHT;
  let translateX = reanimated.useSharedValue(0);
  let translateY = reanimated.useSharedValue(0);
  let onGestureEvent = reanimated.useAnimatedGestureHandler({
    "onStart":function (e,ctx){
        ctx.offsetX = translateX.value;
        ctx.offsetY = translateY.value;
      },
    "onActive":function (e,ctx){
        translateX.value = redash.clamp(ctx.offsetX + e.translationX,0,boundX);
        translateY.value = redash.clamp(ctx.offsetY + e.translationY,0,boundY);
      },
    "onEnd":function ({velocityX,velocityY}){
        translateX.value = reanimated.withDecay({"velocity":velocityX,"clamp":[0,boundX]});
        translateY.value = reanimated.withDecay({"velocity":velocityY,"clamp":[0,boundY]});
      }
  });
  let style = reanimated.useAnimatedStyle(() => ({
    "transform":[
        {"translateX":translateX.value},
        {"translateY":translateY.value}
      ]
  }),null);
  return (
    <ReactNative.View style={{"flex":1}}><rnGesture.PanGestureHandler onGestureEvent={onGestureEvent}><reanimated.default.View style={style}><Card card={(CARDS[["Card6"]])}></Card></reanimated.default.View></rnGesture.PanGestureHandler></ReactNative.View>
    );
}

// js-react-native.rem-card-test.card/Pan
function Pan(){
  let [container,setContainer] = React.useState(null);
  return (
    <ReactNative.View style={{"flex":1}}
      onLayout={(e) => setContainer(e.nativeEvent.layout)}>{container && (
        <PanGesture {...container}></PanGesture>
        )}</ReactNative.View>
    );
}

// js-react-native.rem-card-test.card/MODULE
const MODULE = // 1k22u6292cacm;
{
  "RATIO":RATIO,
  "CARD_WIDTH":CARD_WIDTH,
  "CARD_HEIGHT":CARD_HEIGHT,
  "ASSETS":ASSETS,
  "CARDS":CARDS,
  "Card":Card,
  "PanGesture":PanGesture,
  "Pan":Pan
};

export default MODULE