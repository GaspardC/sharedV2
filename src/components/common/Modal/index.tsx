import React from 'react';
import { Modal } from "@chakra-ui/react";

const ModalChakra = ({isVisible, onBackdropPress, children, ...otherProps}) => {
    return <Modal isOpen={isVisible} onClose={onBackdropPress} {...otherProps}>{children}</Modal>
}


export default ModalChakra;

