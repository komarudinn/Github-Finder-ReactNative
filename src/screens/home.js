import React, { Component } from 'react'
import { View, Image, Alert } from 'react-native'
import { Container, Header, Left, Body, Right, Title, Icon, Item, Input } from 'native-base';
import { Text, Card, SocialIcon } from 'react-native-elements';
import ProfileDetail from '../screens/profile_detail'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';


export default class home extends Component {
    state = {
        dataUsers: null,
        nameSearch: ""
    }

    componentDidUpdate() {
        if (this.state.nameSearch) {
            axios.get(`https://api.github.com/users/${this.state.nameSearch.toLowerCase()}?client_id=30c1b659d33c421d5dc7&client_secret=0520296f217a6afe525f48b32641666cea6069e2
          `).then(res => {
                this.setState({ dataUsers: res.data, dataErr: false })
            }).catch(err => {
                console.log(err);
            })
            this.setState({ nameSearch: "" })
        }
    }

    rendBox = () => {
        if (!this.state.dataUsers) {
            return (
                <View style={{ backgroundColor: '#ffff', height: 500 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 150 }}>
                        <Image
                            style={{ width: 80, height: 80, }}
                            source={{ uri: 'https://lh3.googleusercontent.com/proxy/pGPrMuekOq7uZ-rUGxPk69cVV6g2c2q0K7-VLTKhuwvpLjWFUF0veBIpt-n3VC3wkU0ccDD0VO29fK2eFZYoLZpD8ciJeA' }}
                        />
                        <Text style={{ fontSize: 15, padding: 10, color: 'grey' }}>Lets find some Github users...</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: '#ffff', height: 500 }}>
                    <View style={{ padding: 20 }}>
                        <Card
                            style={{ backgroundColor: "#EAEAEA" }}>
                            {
                                !this.state.dataUsers.name || !this.state.dataUsers
                                    ?
                                    <Text>User not found </Text>
                                    :
                                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={{ width: 80, height: 80, borderRadius: 100 }}
                                            resizeMode="cover"
                                            source={{ uri: this.state.dataUsers.avatar_url }}
                                        />
                                        <View>
                                            <Text style={{ fontSize: 22, marginTop: 5, fontWeight: 'bold', textAlign: 'center' }}>{this.state.dataUsers.name}</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20, marginBottom: 10 }}>
                                                <Text style={{ backgroundColor: '#DF691A', color: 'white', padding: 5, borderRadius: 6 }}>{this.state.dataUsers.public_repos} Repository</Text>
                                                <Text style={{ marginHorizontal: 10, backgroundColor: '#5BC0DE', color: 'white', padding: 5, borderRadius: 6 }}>{this.state.dataUsers.followers} Followers</Text>
                                                <Text style={{ backgroundColor: '#5CB85C', color: 'white', padding: 5, borderRadius: 6 }}>{this.state.dataUsers.following} Following</Text>
                                            </View>
                                            {
                                                !this.state.dataUsers.name
                                                    ?
                                                    null
                                                    :

                                                    this.state.dataUsers.location
                                                        ?
                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                                            <Icon name="ios-flame" style={{ textAlign: 'center', color: 'grey' }} />
                                                            <Text style={{ marginLeft: 8, fontSize: 20, color: 'grey' }}>{this.state.dataUsers.location}</Text>
                                                        </View>
                                                        :
                                                        null
                                            }
                                            <SocialIcon
                                                title='See user profile'
                                                button
                                                type='github'
                                                light
                                                onPress={() => {
                                                    this.props.navigation.navigate('profileDetail', { accountName: this.state.dataUsers.login })
                                                }}
                                            />
                                        </View>
                                    </View>
                            }
                        </Card>
                    </View>
                </View>
            )
        }
    }


    render() {
        return (
            <View style={{ backgroundColor: '#FFF', backgroundSize: 'cover' }}>
                <ScrollView>
                    <View style={{ padding: 20, backgroundColor: '#EAEAEA', height: 230, borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Image
                                source={{ uri: 'https://cdn0.iconfinder.com/data/icons/social-glyph/30/github-480.png' }}
                                style={{ width: 35, height: 35 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 7, marginLeft: 5 }}>Github Finder</Text>
                        </View>
                        <Text style={{ fontSize: 25 }}>Search Github Users</Text>
                        <Text style={{ fontSize: 16 }}>Enter a username to fetch user profile</Text>
                        <Item regular style={{ marginTop: 20, backgroundColor: 'white', borderRadius: 100 }}>
                            <Icon name="ios-search" style={{ marginLeft: 10 }} />
                            <Input
                                placeholder='Search Users'
                                ref={(input) => { this.search = input; }}
                                onChangeText={(search) => { this.setState({ nameSearch: search }) }}
                            />
                        </Item>
                    </View>
                    {this.rendBox()}
                </ScrollView>
            </View>
        )
    }
}
