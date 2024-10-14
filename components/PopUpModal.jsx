import { View, Text, Modal } from 'react-native'
import React from 'react'

export default function PopUpModal(title, description) {
  return (
    <Modal >
        <View className= 'flex-1 bg-slate-100 p-60'>
            <Text>{title} </Text>
            <Text>{description} </Text>
        </View>
        <View>
            <Text>
                Rewiews here...
            </Text>
        </View>
    </Modal>
  )
}