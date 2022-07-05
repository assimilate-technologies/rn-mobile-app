import React, { useState } from "react";
import { Dimensions, View } from 'react-native';
import { Text, useTheme } from "@rneui/themed";
import RBSheet from "react-native-raw-bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { countryCodes } from "../constants/countryCodes";
import { Input, ListItem, SearchBar } from "@rneui/base";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CountryCodePicker = ({ refRBSheet, onSelect, countryCode }) => {
    const { theme } = useTheme();
    const [search, setSearch] = useState("");
    const [filterList, setFilterList] = useState(countryCodes);
    const renterItem = ({ item, index }) => {
        return (
            <ListItem key={index} bottomDivider onPress={() => onSelect(item)} containerStyle={countryCode.code == item.code ? { backgroundColor: "#cacccb" } : {}}>
                <ListItem.Subtitle>{item.dial_code}</ListItem.Subtitle>
                <ListItem.Content>
                    <ListItem.Title>{item.name.en}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }
    const updateSearch = (search) => {
        setSearch(search);
        const _countryCodes = [...countryCodes];
        const keys = ["name.en"];
        const s = _countryCodes.filter(item =>
            String(item.name.en).toLowerCase().includes(search.toLowerCase())
        );
        setFilterList(s);
    };


    return (
        <RBSheet
            ref={refRBSheet}
            height={windowHeight - 250}
            openDuration={250}
            customStyles={{
                container: {
                }
            }}
        >

            <SearchBar lightTheme containerStyle={{ backgroundColor: "#fff" }}
                inputStyle={{ color: "#011A51" }}
                inputContainerStyle={{ backgroundColor: "#ebeced" }}
                round
                placeholder="Search Here..."
                onChangeText={updateSearch}
                value={search} />
            <FlashList
                data={filterList}
                renderItem={renterItem}
                estimatedItemSize={800}
            />
        </RBSheet>
    )
}
export default CountryCodePicker;