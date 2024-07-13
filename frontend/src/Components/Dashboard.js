import { Box, Button, Icon, Image, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import logo from '../Images/Logo.png'
import { IoIosSearch } from "react-icons/io";
import { FaRegCircle, FaRegEnvelopeOpen } from "react-icons/fa";
import { CiCloudMoon, CiCloudSun } from "react-icons/ci";
import IntensityGraphs from './IntensityGraphs';
import { LeftDrawer } from './LeftDrawer';
import LikelihoodGraphs from './LikelihoodGraphs';
import RelevanceGraphs from './RelevanceGraphs';
import YearGraphs from './YearGraphs';
import TopicsGraphs from './TopicsGraphs';
import RegionGraphs from './RegionGraphs';
import SearchModal from './SearchModal';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [showLeftPanel, setShowLeftPanel] = useState(false);
    const [showIntensityGraph, setShowIntensityGraph] = useState(true);
    const [showLikelihoodGraph, setShowLikelihoodGraph] = useState(false);
    const [showRelevanceGraph, setShowRelevanceGraph] = useState(false);
    const [showYearGraph, setShowYearGraph] = useState(false);
    const [showCountryGraph, setShowCountryGraph] = useState(false);
    const [showTopicsGraph, setShowTopicsGraph] = useState(false);
    const [showRegionGraph, setShowRegionGraph] = useState(false);
    const [dayNightToggle, setDayNightToggle] = useState(true);
    const [showModal, setShowModal] = useState(true);

    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    const breakpoint = useBreakpointValue({ base: false, lg: true });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDayNightToggle = () => {
        setDayNightToggle(!dayNightToggle);
    }

    const handleLeftPanel = () => {
        setShowLeftPanel(true);
        onDrawerOpen();
    };

    const handleOpenModal = () => {
        setShowModal(true);
        onModalOpen();
    }

    const handleIntensityGraph = () => {
        setShowIntensityGraph(true);
        setShowLikelihoodGraph(false);
        setShowRelevanceGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
    };

    const handleLikelihoodGraph = () => {
        setShowLikelihoodGraph(true);
        setShowIntensityGraph(false);
        setShowRelevanceGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
    };

    const handleRelevanceGraph = () => {
        setShowRelevanceGraph(true);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
    };

    const handleYearGraph = () => {
        setShowYearGraph(true);
        setShowRelevanceGraph(false);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
    };

    const handleCountryGraph = () => {
        setShowCountryGraph(true);
        setShowIntensityGraph(false);
        setShowRelevanceGraph(false);
        setShowLikelihoodGraph(false);
        setShowYearGraph(false);
        setShowTopicsGraph(false);
        setShowRegionGraph(false);
    };

    const handleTopicsGraph = () => {
        setShowTopicsGraph(true);
        setShowRelevanceGraph(false);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowRegionGraph(false);
    };

    const handleRegionGraph = () => {
        setShowRegionGraph(true);
        setShowRelevanceGraph(false);
        setShowLikelihoodGraph(false);
        setShowIntensityGraph(false);
        setShowYearGraph(false);
        setShowCountryGraph(false);
        setShowTopicsGraph(false);
    };

    return (
        <>
            <Box
                backgroundColor={dayNightToggle ? 'white' : '#4d4d4d'}
                color={dayNightToggle ? 'black' : 'white'}
                id='main'
                width='100%'
                height='100vh'
                // border='0.1px solid red'
                display='flex'
                overflow='hidden'
            >
                {breakpoint ?
                    <Box
                        id='left'
                        borderRight='1px solid #ccc'
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
                            boxShadow={dayNightToggle ? "0 10px 15px -2px white" : "0 10px 15px -2px #4d4d4d"}
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
                                onClick={handleIntensityGraph}
                            />
                        </Box>
                        <Box p={3}>
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
                                className={showIntensityGraph || (dayNightToggle ? 'variables_hover' : 'variables_hover_night')}
                                cursor='pointer'
                                mb={2}
                                backgroundColor={showIntensityGraph ? '#7367F0' : ''}
                                color={showIntensityGraph ? 'white' : ''}
                                borderRadius={5}
                                h={10}
                                display='flex'
                                alignItems='center'
                                fontSize={16}
                                onClick={handleIntensityGraph}
                            >
                                <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                Intensity</Box>

                            <Box
                                className={showLikelihoodGraph || (dayNightToggle ? 'variables_hover' : 'variables_hover_night')}
                                cursor='pointer'
                                mb={2}
                                backgroundColor={showLikelihoodGraph ? '#7367F0' : ''}
                                color={showLikelihoodGraph ? 'white' : ''}
                                borderRadius={5}
                                h={10}
                                display='flex'
                                alignItems='center'
                                fontSize={16}
                                onClick={handleLikelihoodGraph}
                            >
                                <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                Likelihood</Box>

                            <Box
                                className={showRelevanceGraph || (dayNightToggle ? 'variables_hover' : 'variables_hover_night')}
                                cursor='pointer'
                                mb={2}
                                backgroundColor={showRelevanceGraph ? '#7367F0' : ''}
                                color={showRelevanceGraph ? 'white' : ''}
                                borderRadius={5}
                                h={10}
                                display='flex'
                                alignItems='center'
                                fontSize={16}
                                onClick={handleRelevanceGraph}
                            >
                                <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                Relevance</Box>

                            <Box
                                className={showYearGraph || (dayNightToggle ? 'variables_hover' : 'variables_hover_night')}
                                cursor='pointer'
                                mb={2}
                                backgroundColor={showYearGraph ? '#7367F0' : ''}
                                color={showYearGraph ? 'white' : ''}
                                borderRadius={5}
                                h={10}
                                display='flex'
                                alignItems='center'
                                fontSize={16}
                                onClick={handleYearGraph}
                            >
                                <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                Year</Box>

                            <Box
                                className={showCountryGraph || (dayNightToggle ? 'variables_hover' : 'variables_hover_night')}
                                cursor='pointer'
                                mb={2}
                                backgroundColor={showCountryGraph ? '#7367F0' : ''}
                                color={showCountryGraph ? 'white' : ''}
                                borderRadius={5}
                                h={10}
                                display='flex'
                                alignItems='center'
                                fontSize={16}
                                onClick={handleCountryGraph}
                            >
                                <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                Country</Box>

                            <Box
                                className={showTopicsGraph || (dayNightToggle ? 'variables_hover' : 'variables_hover_night')}
                                cursor='pointer'
                                mb={2}
                                backgroundColor={showTopicsGraph ? '#7367F0' : ''}
                                color={showTopicsGraph ? 'white' : ''}
                                borderRadius={5}
                                h={10}
                                display='flex'
                                alignItems='center'
                                fontSize={16}
                                onClick={handleTopicsGraph}
                            >
                                <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                Topics</Box>

                            <Box
                                className={showRegionGraph || (dayNightToggle ? 'variables_hover' : 'variables_hover_night')}
                                cursor='pointer'
                                mb={2}
                                backgroundColor={showRegionGraph ? '#7367F0' : ''}
                                color={showRegionGraph ? 'white' : ''}
                                borderRadius={5}
                                h={10}
                                display='flex'
                                alignItems='center'
                                fontSize={16}
                                onClick={handleRegionGraph}
                            >
                                <Icon ml={3} mr={4} as={FaRegCircle} w={3} h={3} color={dayNightToggle ? '#666666' : 'white'} />
                                Region</Box>
                        </Box>
                    </Box>
                    : <></>}

                <Box
                    id='right'
                    overflowY='auto'
                    height='100%'
                    // border='1px solid red'
                    flex='1'
                    padding={5}
                    position='relative'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                >
                    <Box
                        zIndex={9}
                        border='1px solid #ccc'
                        position='fixed'

                        width={breakpoint ? 'calc(100% - 295px)' : '97%'}
                        borderRadius={5}
                        h={14}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        backgroundColor="rgba(255, 255, 255, 0.3)"
                        backdropFilter="blur(10px)"
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                        >
                            {breakpoint ? <></> : <HamburgerIcon w={6} h={10} ml={6} onClick={handleLeftPanel} cursor='pointer' />}
                            <Box
                                className={dayNightToggle ? 'variables_hover' : 'variables_hover_night'}
                                cursor='pointer'
                                ml={3}
                                w={10}
                                h={10}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                borderRadius={100}
                            >
                                <Icon as={IoIosSearch} w={6} h={10} onClick={handleOpenModal} />
                            </Box>
                            <Box
                                ml={2}
                                color='#b3b3b3'
                                fontSize={16}
                                cursor='pointer'
                                onClick={handleOpenModal}
                            >Search</Box>
                        </Box>
                        <Box
                            mr={3}
                            cursor='pointer'
                        >
                            {dayNightToggle ?
                                <Icon as={CiCloudSun} w={8} h={8} onClick={handleDayNightToggle} />
                                : <Icon as={CiCloudMoon} w={8} h={8} onClick={handleDayNightToggle} />}
                        </Box>
                    </Box>
                    <Box
                        width='100%'
                        mt={20}
                    >

                        {/* all compoenents here which will show graphs */}
                        {(showIntensityGraph) ?
                            <IntensityGraphs jsonData={data} />
                            : <></>}
                        {(showLikelihoodGraph) ?
                            <LikelihoodGraphs jsonData={data} />
                            : <></>}
                        {(showRelevanceGraph) ?
                            <RelevanceGraphs jsonData={data} />
                            : <></>}
                        {(showYearGraph) ?
                            <YearGraphs jsonData={data} />
                            : <></>}
                        {(showCountryGraph) ?
                            <IntensityGraphs jsonData={data} />
                            : <></>}
                        {(showTopicsGraph) ?
                            <TopicsGraphs jsonData={data} />
                            : <></>}
                        {(showRegionGraph) ?
                            <RegionGraphs jsonData={data} />
                            : <></>}
                    </Box>
                </Box>
            </Box>
            {showLeftPanel ?
                <LeftDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => {
                        onDrawerClose();
                        setShowLeftPanel(false);
                    }}
                    setShowIntensityGraph={setShowIntensityGraph}
                    setShowLikelihoodGraph={setShowLikelihoodGraph}
                    setShowRelevanceGraph={setShowRelevanceGraph}
                    setShowYearGraph={setShowYearGraph}
                    setShowCountryGraph={setShowCountryGraph}
                    setShowTopicsGraph={setShowTopicsGraph}
                    setShowRegionGraph={setShowRegionGraph}
                    dayNightToggle={dayNightToggle}
                />
                : <></>}
            {showModal ?
                <SearchModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        onModalClose();
                        setShowModal(false);
                    }}
                    dayNightToggle={dayNightToggle}
                /> : <></>}
        </>
    )
}

export default Dashboard