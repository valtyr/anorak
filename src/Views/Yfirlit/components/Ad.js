import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {AutoImage} from '../../../Components';

import {Analytics} from '../../../Services';


const openAd = ({url, id}) => {
    Analytics.track('Ad interaction', {id});
    WebBrowser.openBrowserAsync(url);
}


const Ad = ({ad}) => {
    if (!ad) return null;
    const {image} = ad;
    return <View style={styles.root}>
        <View style={styles.adImageWrapper}>
            <TouchableOpacity style={styles.adTouchable} onPress={() => openAd(ad)}>
                <AutoImage uri={image} />
            </TouchableOpacity>
        </View>
        <Text style={styles.adDisclaimer}>AUGLÝSING</Text>
    </View>;
};

const styles = StyleSheet.create({
    root: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    adImageWrapper: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    adTouchable: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    adDisclaimer: {
        marginTop: 15,
        fontStyle: 'italic',
        fontWeight: '600',
        textAlign: 'center',
        color: '#E0E0E0',
    }
});

export default Ad;
