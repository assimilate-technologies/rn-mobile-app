import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView, ToastAndroid } from "react-native";
import { Input, useTheme } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@rneui/base";
import api from "../../../api/api";
import { setUser } from "../../../redux/actions/authAction";
import DocumentPicker from 'react-native-document-picker';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const ProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [loaderAadhar, setLoaderAadhar] = useState(false)
    const [loaderPan, setLoaderPan] = useState(false)
    const [aadharFile, setAadharFile] = useState(null)
    const [panFile, setPanFile] = useState(null)

    const {
        userInfo
    } = useSelector(state => state.auth);

    const [formValue, setFormValue] = useState({
        name: userInfo?.name || "", userId: userInfo?.userId || 0, UIDAI: userInfo?.UIDAI || "", email: userInfo?.email || "",
        phoneNumber: userInfo?.phoneNumber, UIDAIPath: userInfo?.UIDAIPath || "", PAN: userInfo?.PAN || "", PATHPath: userInfo?.PATHPath
    })
    const getUser = async () => {
        const { data } = await api.getUser();
        const res = await api.getUserDetail();
        if (res?.data) {
            const { id, ...others } = res?.data;
            dispatch(setUser({ ...data, ...others }));
        } else {
            dispatch(setUser({ ...data }));

        }
    }
    useEffect(() => {
        // console.log(userInfo);
        setFormValue({
            name: userInfo?.name || "", userId: userInfo?.userId || 0, UIDAI: userInfo?.UIDAI || "", email: userInfo?.email || "",
            phoneNumber: userInfo?.phoneNumber, UIDAIPath: userInfo?.UIDAIPath || "",
            PAN: userInfo?.PAN || "", PATHPath: userInfo?.PATHPath
        })
    }, [userInfo])

    const aadharUpload = async () => {
        try {
            if (!aadharFile) {
                showToast("Select aadhar card file....")
                return;
            }
            setLoaderAadhar(true)
            const response = await api.uploadProfileImage(aadharFile, userInfo?.token);

            setLoaderAadhar(false)
            const { data } = response;
            if (data) {
                return data.fileName;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            setLoaderAadhar(false)
        }

    }
    const panUpload = async () => {
        try {
            if (!panFile) {
                showToast("Select pan card file....")
                return;
            }
            setLoaderPan(true)
            const response = await api.uploadProfileImage(panFile, userInfo?.token);
            setLoaderPan(false)
            const { data } = response;
            if (data) {
                return data.fileName;
            }
        } catch {
            setLoaderPan(false)
        }
    }
    const onUpdateProfile = async () => {
        try {
            // const UIDAIPath = await aadharUpload();
            // console.log(UIDAIPath, 'UIDAIPathUIDAIPath');
            // if (!UIDAIPath) {
            //     return;
            // }
            // const PATHPath = await panUpload();
            // console.log(PATHPath, 'PATHPathPATHPath');
            // if (!PATHPath) {
            //     return;
            // }
            const payload = {
                name: formValue?.name, userId: userInfo?.id, UIDAI: formValue?.UIDAI, email: formValue?.email,
                UIDAIPath: formValue?.UIDAIPath || "",
                PAN: formValue?.PAN || "", PATHPath: formValue?.PATHPath || ""
            }
            if (formValue.userId > 0) {
                setLoader(true);
                const res = await api.handleUpdateUserDetails(payload);
                setLoader(false);
                getUser();
                showToast();
            } else {
                setLoader(true);
                const res = await api.handleCreateUserDetails(payload);
                setLoader(false);
                getUser();
                showToast();
            }

        } catch (error) {
            setLoader(false);
            console.log(error, 'errorerror')
        }
    }
    const onChangeEvent = (name, value) => {
        setFormValue({ ...formValue, [name]: value })
    }
    const showToast = (msg = "Profile update successful.....!") => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const selectOneFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
            });
            if (res) {
                console.log(res[0], 'selectOneFile');
                setAadharFile(res[0])
                setFormValue({ ...formValue, UIDAIPath: res[0]?.uri })
            }

        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    const selectOneFilePan = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
            });
            if (res) {
                console.log(res[0], 's');
                setPanFile(res[0])
                setFormValue({ ...formValue, PATHPath: res[0]?.uri })
            }

        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const fileIcon = () => {
        if (aadharFile || formValue.UIDAIPath) {
            return <FontAwesome name="check-circle" size={25} color="green" />;
        }
        return <FontAwesome name="file-pdf-o" size={25} />;
    }
    const fileIconPan = () => {
        if (panFile || formValue.PATHPath) {
            return <FontAwesome name="check-circle" size={25} color="green" />;
        }
        return <FontAwesome name="file-pdf-o" size={25} />;
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={{ height: 80, backgroundColor: theme.colors.primary }}>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{
                    marginHorizontal: 25, marginVertical: 25
                }}>
                    <Text style={{
                    }}>Name</Text>
                    <Input value={formValue?.name} onChangeText={(value) => onChangeEvent('name', value)} containerStyle={{
                        elevation: 2, backgroundColor: "#FFF",
                        borderRadius: 10
                    }}
                        placeholder='Enter name' keyboardType="default" maxLength={50}
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
                    marginHorizontal: 25, marginVertical: 25
                }}>
                    <Text style={{
                    }}>PAN No</Text>
                    <Input onChangeText={(value) => onChangeEvent('PAN', value)} keyboardType="default" containerStyle={{
                        elevation: 2, backgroundColor: "#FFF",
                        borderRadius: 10
                    }}
                        placeholder='Enter pan no' maxLength={10}
                        value={formValue?.PAN}></Input>
                </View>
                <View style={{
                    marginHorizontal: 25, marginVertical: 10
                }}>
                    <Button onPress={() => selectOneFile()} title="Upload Aadhar Card " buttonStyle={{ borderRadius: 12, height: 50, width: "100%" }}
                        containerStyle={{ borderRadius: 12, width: "100%", height: 50 }} color={theme.colors.primary}
                        type="outline" loading={loaderAadhar} iconPosition="right" icon={fileIcon()} />

                </View>

                <View style={{
                    marginHorizontal: 25
                    , marginVertical: 10
                }}>
                    <Button onPress={() => selectOneFilePan()} title="Upload Pan Card " buttonStyle={{ borderRadius: 12, height: 50, width: "100%" }}
                        containerStyle={{ borderRadius: 12, width: "100%", height: 50 }} color={theme.colors.primary}
                        type="outline" iconPosition="right" loading={loaderPan} icon={fileIconPan()} />
                </View>


                <View style={{
                    marginHorizontal: 25, marginVertical: 10
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