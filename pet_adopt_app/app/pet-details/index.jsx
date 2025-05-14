import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import {useLocalSearchParams, useNavigation} from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';

export default function PetDetails() {
    const petInfo = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: ''
        })
    },[])

  return (
    <View>
        {/* Pet info */}
        <PetInfo petInfo={petInfo}/>

        {/* Pet details */}
        <PetSubInfo petInfo={petInfo} />

        {/* about */}

        {/* owner details */}

        {/* adopt me button  */}
    </View>
  )
}
