import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { MODAL_SIZE } from "@my-monorepo/shared-local";
import { firstLetterUpper } from "@my-monorepo/shared/src/utils";
import { OutlineButton } from "../../button";

export const DeleteModal = ({
  isOpen,
  onValidate,
  onClose,
  type,
  action = "supprimer",
}: {
  isOpen: boolean;
  onValidate: any;
  onClose: any;
  type: string;
  action?: string;
}) => {
  const actionUppercase = firstLetterUpper(action);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
      <ModalOverlay />
      <ModalContent minWidth={MODAL_SIZE}>
        <ModalHeader>
          Êtes vous sur de vouloir {action} {type}
        </ModalHeader>
        <ModalCloseButton />
        <ModalFooter justifyContent="center">
          <OutlineButton ml={4} colorScheme="primary" onClick={onClose}>
            Annuler
          </OutlineButton>
          <OutlineButton ml={4} colorScheme="primary" onClick={onValidate}>
            {actionUppercase}
          </OutlineButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
