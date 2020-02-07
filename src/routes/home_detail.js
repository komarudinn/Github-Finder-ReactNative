import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/home'
import Profile from '../screens/profile_detail'

const MainStack = createAppContainer(createStackNavigator({
    home: Home,
    profileDetail: Profile
}, {
    initialRouteName: 'home',
    headerMode: "none"
}))

export default MainStack