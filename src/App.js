import React from 'react'
import * as ReactNative from 'react-native'
import * as expo from 'expo'

import card from './card'

// js-react-native.rem-card-test.app/App
function App(){
  // s18cxuto28v9;
  return (
    <card.Pan></card.Pan>
    );
}

// js-react-native.rem-card-test.app/MODULE
const MODULE = expo.registerRootComponent(App)

export default MODULE