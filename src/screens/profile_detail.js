import React, { Component } from 'react'
import { Text, Image, View, Linking, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Header, Left, Body, Right, Title, Icon, Button } from 'native-base';
import { SocialIcon, Divider } from 'react-native-elements'
import moment from 'moment'
import axios from 'axios'

export default class profile_detail extends Component {
    state = {
        fullData: [],
        dataRepo: [],
        dataSlice: 4,
        loading: true
    }

    componentDidMount() {
        axios.get(`https://api.github.com/users/${this.props.navigation.state.params.accountName}?client_id=30c1b659d33c421d5dc7&client_secret=0520296f217a6afe525f48b32641666cea6069e2
        `).then(res => {
            this.setState({ fullData: res.data })
            axios.get(`${res.data.repos_url}?client_id=30c1b659d33c421d5dc7&client_secret=0520296f217a6afe525f48b32641666cea6069e2
            `).then(res => {
                console.log(res.data);
                this.setState({ dataRepo: res.data })
            }).catch(err => {
                console.log(err);
            })
            this.setState({ loading: false })
        }).catch(err => {
            console.log(err);
        })
    }

    emailButton = (email) => {
        if (email) {
            Linking.openURL(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&tf=1`)
        } else {
            Alert.alert('Sorry...', 'Email does not exist')
        }
    }

    render() {
        let { avatar_url, name, public_repos, following, followers, email, bio, html_url, location } = this.state.fullData
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ textAlign: 'center', fontSize: 25, padding: 10 }}>Please wait....</Text>
                </View>
            )
        }
        return (
            <View>
                <ScrollView>
                    <Header style={{ backgroundColor: 'white' }}>
                        <Left style={{ flex: 1, padding: 7 }} >
                            <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
                        </Left>
                        <Body style={{ flexDirection: 'row', flex: 2 }}>
                            <Image
                                source={{ uri: 'https://cdn1.iconfinder.com/data/icons/social-media-vol-1-1/24/_github-512.png' }}
                                style={{ width: 40, height: 40 }} />
                            <Title style={{ color: 'black', marginTop: 6, marginLeft: 10, fontFamily: 'Roboto', fontSize: 21, fontWeight: 'bold' }}>Github Finder</Title>
                        </Body>
                        <Right style={{ flex: 1 }} >
                        </Right>
                    </Header>
                    <View style={{ backgroundColor: '#eaeaea', padding: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginTop: 10 }}>
                                <Image
                                    source={{ uri: avatar_url }}
                                    style={{ alignSelf: 'center', width: 120, height: 120, borderRadius: 100, borderColor: 'grey', borderWidth: 2 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 10, textAlign: 'center', fontSize: 25 }}>{name}</Text>
                                {
                                    bio
                                        ?
                                        <Text style={{ textAlign: 'center', fontSize: 15, padding: 5 }}>{bio}</Text>
                                        :
                                        null
                                }
                                {
                                    location
                                        ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name="ios-flame" style={{ textAlign: 'center', color: 'grey' }} />
                                            <Text style={{ marginLeft: 8, fontSize: 20, color: 'grey' }}>{location}</Text>
                                        </View>
                                        :
                                        null
                                }
                                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ backgroundColor: '#DF691A', color: 'white', padding: 5, borderRadius: 6 }}>{public_repos} Repository</Text>
                                    <Text style={{ marginHorizontal: 10, backgroundColor: '#5BC0DE', color: 'white', padding: 5, borderRadius: 6 }}>{followers} Followers</Text>
                                    <Text style={{ backgroundColor: '#5CB85C', color: 'white', padding: 5, borderRadius: 6 }}>{following} Following</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                        <SocialIcon
                            style={{ flex: 1 }}
                            title='Email'
                            button
                            light
                            type='envelope'
                            onPress={() => { this.emailButton(email) }}
                        />
                        <SocialIcon
                            style={{ flex: 1 }}
                            title='See profile'
                            button
                            light
                            type='github'
                            onPress={() => Linking.openURL(html_url)}
                        />
                    </View>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Repository : </Text>
                        {
                            this.state.dataRepo.length !== 0
                                ?
                                this.state.dataRepo.slice(0, this.state.dataSlice).map(val => {
                                    return (
                                        <TouchableOpacity key={val.id} onPress={() => Linking.openURL(val.html_url)}>
                                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginVertical: 8 }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{val.name}</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ paddingTop: 13, fontSize: 15, color: '#C0D33C' }}>★&nbsp;&nbsp;{val.language ? val.language : 'Unknown'}</Text>
                                                    <Text style={{ paddingTop: 13, fontSize: 14, color: '#144331' }}>Updated at&nbsp;{moment(val.updated_at).fromNow()}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginTop: 25 }}>
                                    <Text style={{ fontSize: 20 }}>Sorry, repository not found...</Text>
                                </View>
                        }
                        {
                            this.state.dataRepo.length === 0
                                ?
                                null
                                :
                                this.state.dataSlice < this.state.dataRepo.length
                                    ?
                                    <TouchableOpacity onPress={() => { this.setState({ dataSlice: this.state.dataSlice + 4 }) }}>
                                        <Text style={{ textAlign: 'center', padding: 10, fontSize: 17, color: 'skyblue' }}>See More...</Text>
                                    </TouchableOpacity>
                                    :
                                    (this.state.dataRepo.length <= 4
                                        ?
                                        null
                                        :
                                        <TouchableOpacity onPress={() => { this.setState({ dataSlice: 4 }) }}>
                                            <Text style={{ textAlign: 'center', padding: 10, fontSize: 17, color: 'red' }}>Less More...</Text>
                                        </TouchableOpacity>
                                    )
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

