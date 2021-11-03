import React from 'react'
import { Div } from 'react-native-magnus'
import Text from '../Texts'

const InfoMessage = ({ children, icon } : {children: any, icon?: any}) => {
    return (
        <Div h='100%' w='100%' alignItems='center' justifyContent='center' mt={-20}>
            {icon}
            <Text mt={10}>{children}</Text>
        </Div>
    )
}

export default InfoMessage;