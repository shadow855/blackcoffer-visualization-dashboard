import React, { useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Box,
    Icon,
    Image,
} from '@chakra-ui/react'
import { FaRegCircle, FaRegEnvelopeOpen } from "react-icons/fa";
import logo from '../Images/Logo.png'

export const LeftDrawer = ({ isOpen, onClose, setShowIntensityGraph, setShowLikelihoodGraph, setShowRelevanceGraph, setShowYearGraph, setShowCountryGraph, setShowTopicsGraph, setShowRegionGraph, dayNightToggle }) => {

    const handleIntensityGraphFromPanel = () => {
        setShowIntensityGraph(true);
        setShowLikelihoodGraph(false);
        setShowRelevanceGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
        onClose();
    };

    const handleLikelihoodGraphFromPanel = () => {
        setShowLikelihoodGraph(true);
        setShowIntensityGraph(false);
        setShowRelevanceGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
        onClose();
    };

    const handleRelevanceGraphFromPanel = () => {
        setShowRelevanceGraph(true);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
        onClose();
    };

    const handleYearGraphFromPanel = () => {
        setShowYearGraph(true);
        setShowRelevanceGraph(false);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
        onClose();
    };

    const handleTopicsGraphFromPanel = () => {
        setShowTopicsGraph(true);
        setShowRelevanceGraph(false);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowRegionGraph(false);
        onClose();
    };

    const handleRegionGraphFromPanel = () => {
        setShowRegionGraph(true);
        setShowRelevanceGraph(false);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        onClose();
    };

    const handleCountryGraphFromPanel = () => {
        setShowCountryGraph(true);
        setShowRelevanceGraph(false);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowYearGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
        onClose();
    };

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent maxWidth="261px"
                    backgroundColor={dayNightToggle ? 'white' : '#4d4d4d'}
                    color={dayNightToggle ? 'black' : 'white'}
                >
                    <DrawerCloseButton mr={0} mt={3} zIndex={98989} />
                    {/* <DrawerHeader>Create your account</DrawerHeader> */}

                    <DrawerBody>
                        <Box
                            ml={-6}
                            mt={-2}
                            // p={3}
                            position='relative'
                            display='flex'
                            flexDirection='column'
                            w={260}
                            overflowY='auto'
                            height='100%'
                        >
                            <Box
                                // borderRight='0px solid #ccc'
                                boxShadow={dayNightToggle ? "0 10px 15px -3px white" : "0 10px 15px -3px #4d4d4d"}
                                backgroundColor={dayNightToggle ? 'white' : '#4d4d4d'}
                                position='fixed'
                                w={259}
                                p={3}
                            >
                                <Image
                                    cursor='pointer'
                                    src={logo}
                                    objectFit='cover'
                                    h={10}
                                    w={180}
                                    onClick={handleIntensityGraphFromPanel}
                                />
                            </Box>
                            <Box p={3}
                                overflowX='hidden'
                                w='100%'
                            >
                                <Box
                                    backgroundColor={dayNightToggle ? '#f2f2f2' : '#1a1a1a'}
                                    borderRadius={5}
                                    h={10}
                                    mt={16}
                                    mb={2}
                                    display='flex'
                                    alignItems='center'
                                    fontSize={16}
                                >
                                    <Icon ml={3} mr={3} as={FaRegEnvelopeOpen} />
                                    Variables
                                </Box>
                                <Box
                                    className={dayNightToggle ? 'variables_hover' : 'variables_hover_night'}
                                    cursor='pointer'
                                    mb={2}
                                    // backgroundColor='#f2f2f2'
                                    borderRadius={5}
                                    h={10}
                                    display='flex'
                                    alignItems='center'
                                    fontSize={16}
                                    onClick={handleIntensityGraphFromPanel}
                                >
                                    <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                    Intensity</Box>

                                <Box
                                    className={dayNightToggle ? 'variables_hover' : 'variables_hover_night'}
                                    cursor='pointer'
                                    mb={2}
                                    // backgroundColor='#f2f2f2'
                                    borderRadius={5}
                                    h={10}
                                    display='flex'
                                    alignItems='center'
                                    fontSize={16}
                                    onClick={handleLikelihoodGraphFromPanel}
                                >
                                    <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                    Likelihood</Box>

                                <Box
                                    className={dayNightToggle ? 'variables_hover' : 'variables_hover_night'}
                                    cursor='pointer'
                                    mb={2}
                                    // backgroundColor='#f2f2f2'
                                    borderRadius={5}
                                    h={10}
                                    display='flex'
                                    alignItems='center'
                                    fontSize={16}
                                    onClick={handleRelevanceGraphFromPanel}
                                >
                                    <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                    Relevance</Box>

                                <Box
                                    className={dayNightToggle ? 'variables_hover' : 'variables_hover_night'}
                                    cursor='pointer'
                                    mb={2}
                                    // backgroundColor='#f2f2f2'
                                    borderRadius={5}
                                    h={10}
                                    display='flex'
                                    alignItems='center'
                                    fontSize={16}
                                    onClick={handleYearGraphFromPanel}
                                >
                                    <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                    Year</Box>

                                <Box
                                    className={dayNightToggle ? 'variables_hover' : 'variables_hover_night'}
                                    cursor='pointer'
                                    mb={2}
                                    // backgroundColor='#f2f2f2'
                                    borderRadius={5}
                                    h={10}
                                    display='flex'
                                    alignItems='center'
                                    fontSize={16}
                                    onClick={handleCountryGraphFromPanel}
                                >
                                    <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                    Country</Box>

                                <Box
                                    className={dayNightToggle ? 'variables_hover' : 'variables_hover_night'}
                                    cursor='pointer'
                                    mb={2}
                                    // backgroundColor='#f2f2f2'
                                    borderRadius={5}
                                    h={10}
                                    display='flex'
                                    alignItems='center'
                                    fontSize={16}
                                    onClick={handleTopicsGraphFromPanel}
                                >
                                    <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                    Topics</Box>

                                <Box
                                    className={dayNightToggle ? 'variables_hover' : 'variables_hover_night'}
                                    cursor='pointer'
                                    mb={2}
                                    // backgroundColor='#f2f2f2'
                                    borderRadius={5}
                                    h={10}
                                    display='flex'
                                    alignItems='center'
                                    fontSize={16}
                                    onClick={handleRegionGraphFromPanel}
                                >
                                    <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                    Region</Box>
                            </Box>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
