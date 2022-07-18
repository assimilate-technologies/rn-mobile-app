import React, { useState } from "react";
import { Text, SafeAreaView, View, ScrollView } from "react-native";
import { Input, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@rneui/base";
import api from "../../../api/api";
import { setUser } from "../../../redux/actions/authAction";
const ProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)

    const {
        userInfo
    } = useSelector(state => state.auth);

    const [formValue, setFormValue] = useState({
        name: userInfo?.name || "", userId: userInfo?.userId || 0, UIDAI: userInfo?.UIDAI || "", email: userInfo?.email || "",
        phoneNumber: userInfo?.phoneNumber, UIDAIPath: userInfo?.UIDAIPath || "",
    })
    const getUser = async () => {
        const { data } = await api.getUser();
        const res = await api.getUserDetail();
        if (res?.data) {
            dispatch(setUser({ ...data, ...res?.data }));
        } else {
            dispatch(setUser({ ...data }));

        }
    }
    const onUpdateProfile = async () => {
        try {
            const payload = {
                name: formValue?.name, userId: formValue?.userId, UIDAI: formValue?.UIDAI, email: formValue?.email
            }
            if (formValue.userId > 0) {
                setLoader(true);
                const res = await api.handleUpdateUserDetails(payload);
                setLoader(false);
                getUser();
            } else {
                setLoader(true);
                const res = await api.handleCreateUserDetails(payload);
                setLoader(false);
                getUser();
            }

        } catch (error) {
            setLoader(false);
            console.log(error, 'errorerror')
        }
    }
    const onChangeEvent = (name, value) => {
        setFormValue({ ...formValue, [name]: value })
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={{ height: 80, backgroundColor: theme.colors.primary }}>
            </View>
            <ScrollView>
                <View style={{
                    marginHorizontal: 25, marginVertical: 25
                }}>
                    <Text style={{
                    }}>Name</Text>
                    <Input value={formValue?.name} onChangeText={(value) => onChangeEvent('name', value)} containerStyle={{
                        elevation: 2, backgroundColor: "#FFF",
                        borderRadius: 10
                    }}
                        placeholder='Enter amount' keyboardType="default" maxLength={50}
                    ></Input>
                </View>
                <View style={{
                    marginHorizontal: 25, marginVertical: 25
                }}>
                    <Text style={{
                    }}>Email</Text>
                    <Input onChangeText={(value) => onChangeEvent('email', value)} containerStyle={{
                        elevation: 2, backgroundColor: "#FFF",
                        borderRadius: 10
                    }}
                        placeholder='Enter email' keyboardType="email-address"
                        value={formValue?.email} ></Input>
                </View>
                <View style={{
                    marginHorizontal: 25, marginVertical: 25
                }}>
                    <Text style={{
                    }}>Phone Number</Text>
                    <Input onChangeText={(value) => onChangeEvent('phoneNumber', value)} containerStyle={{
                        elevation: 2, backgroundColor: "#FFF",
                        borderRadius: 10
                    }}
                        placeholder='' disabled keyboardType="number-pad"
                        value={formValue?.phoneNumber}></Input>
                </View>

                <View style={{
                    marginHorizontal: 25, marginVertical: 25
                }}>
                    <Text style={{
                    }}>Aadhar No</Text>
                    <Input onChangeText={(value) => onChangeEvent('UIDAI', value)} keyboardType="number-pad" containerStyle={{
                        elevation: 2, backgroundColor: "#FFF",
                        borderRadius: 10
                    }}
                        placeholder='Enter aadhar no' maxLength={12}
                        value={formValue?.UIDAI}></Input>
                </View>
                <View style={{
                    marginHorizontal: 25
                }}>
                    <Button onPress={() => onUpdateProfile()} title="Save" buttonStyle={{ borderRadius: 12, height: 50, width: "100%" }}
                        containerStyle={{ borderRadius: 12, width: "100%", height: 50 }} color={theme.colors.primary}
                        loading={loader} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ProfileScreen;