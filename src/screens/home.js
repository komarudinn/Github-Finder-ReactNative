import React, { Component } from 'react'
import { View, Image, Alert } from 'react-native'
import { Container, Header, Left, Body, Right, Title, Icon, Item, Input } from 'native-base';
import { Text, Card, SocialIcon } from 'react-native-elements';
import ProfileDetail from '../screens/profile_detail'
import axios from 'axios'


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
                <View style={{ marginTop: 120, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 80, height: 80, }}
                        source={{ uri: 'https://lh3.googleusercontent.com/proxy/pGPrMuekOq7uZ-rUGxPk69cVV6g2c2q0K7-VLTKhuwvpLjWFUF0veBIpt-n3VC3wkU0ccDD0VO29fK2eFZYoLZpD8ciJeA' }}
                    />
                    <Text style={{ fontSize: 15, padding: 10, color: 'grey' }}>Lets find some Github users...</Text>
                </View>
            )
        } else {
            return (
                <View style={{ padding: 20 }}>
                    <Card>
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
            )
        }
    }


    render() {
        return (
            <View>
                <Container>
                    <Header style={{ backgroundColor: '#fff' }}>
                        <Left style={{ flex: 1 }} />
                        <Body style={{ flexDirection: 'row', flex: 2 }}>
                            <Image
                                source={{ uri: 'https://cdn1.iconfinder.com/data/icons/social-media-vol-1-1/24/_github-512.png' }}
                                style={{ width: 40, height: 40 }} />
                            <Title style={{ color: 'black', marginTop: 6, marginLeft: 10, fontFamily: 'Roboto', fontSize: 21, fontWeight: 'bold' }}>Github Finder</Title>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                </Container>
                <View style={{ padding: 20 }}>
                    <View style={{ marginTop: 70, padding: 20, backgroundColor: '#EAEAEA' }}>
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
                </View>
                {this.rendBox()}
            </View>
        )
    }
}
