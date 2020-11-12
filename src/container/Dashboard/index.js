import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { Alert, SafeAreaView, Text, FlatList, View } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { color, globalStyle } from "../../utility";
import { LogOutUser, UpdateUser } from '../../network'
import { clearAsyncStorage } from '../../asyncStorage';
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import firebase from '../../firebase/config'
import { smallDeviceHeight, uuid } from '../../utility/constants';
import { Profile, ShowUsers, StickyHeader } from "../../component";
import * as ImagePicker from 'expo-image-picker'
import { deviceHeight } from '../../utility/styleHelper/appStyle';

const Dashboard = ({ navigation }) => {
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;
    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        profileImg: '',
    });
    const { name, profileImg } = userDetail;
    const [allUsers, setAllUsers] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Log out user current
    const logout = () => {
        LogOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => {
                        navigation.replace('Login');
                    })
                    .catch((err) => {
                        alert(err);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SimpleLineIcon name='logout' size={26} color={color.WHITE}
                    style={{ right: 10 }}
                    onPress={() => {
                        Alert.alert('logout',
                            'Are you sure to logout',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => logout(),
                                },
                                {
                                    text: 'No'
                                }
                            ],
                            {
                                cancelable: false,
                            })
                    }}
                />
            )
        });
    });

    useEffect(() => {

        dispatchLoaderAction({
            type: LOADING_START,
        });
        try {
            firebase.database()
                .ref('users')
                .on('value', (dataSnapshot) => {
                    let users = [];
                    let currentUser = {
                        id: '',
                        name: '',
                        profileImg: '',
                    };
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.id = uuid;
                            currentUser.name = child.val().name;
                            currentUser.profileImg = child.val().profileImg;
                        } else {
                            users.push({
                                id: child.val().uuid,
                                name: child.val().name,
                                profileImg: child.val().profileImg,
                            });
                        };
                        setUserDetail(currentUser);
                        setAllUsers(users);
                        dispatchLoaderAction({
                            type: LOADING_STOP,
                        });
                    });
                });
        } catch (error) {
            alert(error);
        };
    }, [])

    const selectPhotoTapped = async () => {
        /*
            Không sử  dụng được react-native-image-picker vì chỉ dành cho react-native
            Thay bằng ẽpo-image-picker nhưng chưa load được data hình ảnh vào profileImg, 
            upload hình ảnh vào FireStorage 
        */

        // const option = {
        //     storageOptions: {
        //         skipBackup: true,
        //     },
        // };
        // const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

        // if (status !== 'granted') {
        //     alert('Sorry, we need camera roll permissions to make this work!');
        //     return;
        // }
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1,
        // });
        // if (result.cancelled) {
        //     console.log('User cancel image picker');
        // } else {
        //     let response = await fetch(result.uri);
        //     let source = await response.blob();
        //     dispatchLoaderAction({
        //         type: LOADING_START,
        //     });
        //     UpdateUser(uuid, source)
        //         .then(() => {
        //             setUserDetail({
        //                 ...userDetail,
        //                 profileImg: source,
        //             });
        //             console.log(userDetail)
        //             dispatchLoaderAction({
        //                 type: LOADING_STOP,
        //             });
        //         })
        //         .catch((err) => {
        //             dispatchLoaderAction({
        //                 type: LOADING_STOP,
        //             });
        //             alert(err);
        //         });
        // }
    };
    // On Imgge Tap
    const imgTap = (profileImg, name) => {
        if (!profileImg) {
            navigation.navigate('ShowFullImg', {
                name,
                imgText: name.charAt(0),
            });
        } else {
            navigation.navigate('ShowFullImg', {
                name,
                img: profileImg,
            });
        };
    }

    const getOpacity = () => {
        if (deviceHeight < smallDeviceHeight) {
            return deviceHeight / 4;
        } else {
            return deviceHeight / 6;
        }
    }

    return (
        <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
            {
                scrollPosition > getOpacity() &&
                <StickyHeader
                    name={name}
                    img={profileImg}
                    onImgTap={() => imgTap(profileImg, name)}
                />
            }
            <FlatList
                alwaysBounceVertical={false}
                data={allUsers}
                onScroll={(event) => {
                    setScrollPosition(event.nativeEvent.contentOffset.y)
                }}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={
                    <View
                        style={{
                            opacity: scrollPosition < getOpacity()
                                ? (getOpacity() - scrollPosition) / 100 : 0
                        }}>
                        <Profile
                            img={profileImg}
                            name={name}
                            onEditImgTap={() => selectPhotoTapped()}
                            onImgTap={() => imgTap(profileImg, name)}
                        />
                    </View>
                }
                renderItem={({ item }) => (
                    <ShowUsers
                        name={item.name}
                        img={item.profileImg}
                        onImgTap={() => imgTap(item.profileImg, item.name)}
                    />
                )}
            />
        </SafeAreaView>
    );
};



export default Dashboard;
