import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Icon,
    Input,
} from '@chakra-ui/react'
import { IoIosSearch } from 'react-icons/io'

const SearchModal = ({ isOpen, onClose, dayNightToggle }) => {
    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    backgroundColor={dayNightToggle ? 'white' : '#4d4d4d'}
                    color={dayNightToggle ? 'black' : 'white'}
                >
                    <ModalHeader
                        display='flex'
                        maxH={16}
                        borderBottom='1px solid #ccc'
                    >
                        <Icon as={IoIosSearch} w={6} h={10} mr={3} />
                        <Input mr={5} />
                    </ModalHeader>
                    <ModalCloseButton mt={3} />
                    <ModalBody>
                        Implement Search Functionality Here
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SearchModal