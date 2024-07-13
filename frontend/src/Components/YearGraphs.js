import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Box, Select } from '@chakra-ui/react';

const YearSectorGraphs = ({ jsonData = [] }) => {
    const [data, setData] = useState([]);
    const [startYear, setStartYear] = useState([]);
    const [selectedStartYear, setSelectedStartYear] = useState('');
    const [selectedSector, setSelectedSector] = useState('Energy');

    const [endYear, setEndYear] = useState([]);
    const [selectedEndYear, setSelectedEndYear] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('gas');
    const [sectors, setSectors] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [pestles, setPestles] = useState([]);
    const [selectedPestle, setSelectedPestle] = useState('');
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');

    useEffect(() => {
        if (Array.isArray(jsonData) && jsonData.length > 0) {
            // Extract unique start years and sort them
            const uniqueStartYears = [...new Set(jsonData.map(item => item.start_year))].sort((a, b) => a - b);
            setStartYear(uniqueStartYears);

            // Extract unique end years
            const uniqueEndYears = [...new Set(jsonData.map(item => item.end_year))].sort((a, b) => a - b);
            setEndYear(uniqueEndYears);

            // Extract unique topics
            const uniqueTopics = [...new Set(jsonData.map(item => item.topic))].sort();
            setTopics(uniqueTopics);

            // Extract unique sectors
            const uniqueSectors = [...new Set(jsonData.map(item => item.sector))].sort();
            setSectors(uniqueSectors);

            // Extract unique regions
            const uniqueRegions = [...new Set(jsonData.map(item => item.region))].sort();
            setRegions(uniqueRegions);

            // Extract unique pestles
            const uniquePestles = [...new Set(jsonData.map(item => item.pestle))].sort();
            setPestles(uniquePestles);

            // Extract unique sources
            const uniqueSources = [...new Set(jsonData.map(item => item.source))].sort();
            setSources(uniqueSources);

            // Filter data for the default selected start year and sector
            const filteredData = jsonData.filter(item => (
                (selectedEndYear === "" || item.end_year === selectedEndYear) &&
                (selectedTopic === "" || item.topic === selectedTopic) &&
                (selectedSector === "" || item.sector === selectedSector) &&
                (selectedRegion === "" || item.region === selectedRegion) &&
                (selectedPestle === "" || item.pestle === selectedPestle) &&
                (selectedSource === "" || item.source === selectedSource) &&
                (item.start_year !== "")
            ));

            // Calculate count of data points per start year per sector
            const sectorData = filteredData.reduce((acc, item) => {
                const key = `${item.start_year}-${item.sector}`;
                if (key in acc) {
                    acc[key].count++;
                } else {
                    acc[key] = {
                        start_year: item.start_year,
                        sector: item.sector,
                        count: 1,
                    };
                }
                return acc;
            }, {});

            // Convert sectorData into an array of objects
            const sectorDataArray = Object.values(sectorData);

            // Set data state
            setData(sectorDataArray);
        }
    }, [jsonData, selectedStartYear, selectedSector]);

    useEffect(() => {
        if (data.length > 0) {
            // D3.js code to render the bar chart
            drawBarChart(data);
        }
    }, [data]);

    const handleStartYearChange = (event) => {
        setSelectedStartYear(event.target.value);
    };

    const handleSectorChange = (event) => {
        setSelectedSector(event.target.value);
    };

    const handleEndYearChange = (event) => {
        setSelectedEndYear(event.target.value);
    };

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const handlePestleChange = (event) => {
        setSelectedPestle(event.target.value);
    };

    const handleSourceChange = (event) => {
        setSelectedSource(event.target.value);
    };

    const drawBarChart = (data) => {
        const margin = { top: 20, right: 20, bottom: 90, left: 70 };
        const barWidth = 35;
        const totalWidth = data.length * barWidth + margin.left + margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Remove existing chart if any
        d3.select("#sectorChart").selectAll("*").remove();

        // Create SVG element
        const svg = d3.select("#sectorChart")
            .append("svg")
            .attr("width", totalWidth)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X scale
        const x = d3.scaleBand()
            .domain(data.map(d => d.sector))
            .range([0, totalWidth - margin.left - margin.right])
            .padding(0.1);

        // Y scale
        const y = d3.scaleBand()
            .domain(data.map(d => d.start_year))
            .range([height, 0])
            .padding(0.1);

        // X-axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-45)");

        // Y-axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Bars with animation
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.sector))
            .attr("y", d => y(d.start_year))
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", "#7367F0")
            .on("mouseover", function (event, d) {
                // Show the start year on hover
                const xPos = x(d.sector) + x.bandwidth() / 2;
                const yPos = y(d.start_year) - 10;
                svg.append("text")
                    .attr("id", "hoveredYear")
                    .attr("x", xPos)
                    .attr("y", yPos)
                    .text(`${d.start_year}, ${d.sector}`)
                    .style("text-anchor", "middle")
                    .style("font-weight", "bold");
            })
            .on("mouseout", function () {
                // Remove the text on mouseout
                svg.select("#hoveredYear").remove();
            });
    };



    return (
        <Box>
            <Box mb={3} fontSize={18} fontWeight={500}>
                Start Year vs Sector Graph
            </Box>
            <Box display='flex' flexDirection={{ base: 'column', md: 'row' }}>
                <Select
                    mr={2}
                    placeholder="Select Start Year"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleStartYearChange}
                    mb={4}
                    value={selectedStartYear}
                >
                    {startYear.map((start_year, index) => (
                        <option key={index} value={start_year}>
                            {start_year}
                        </option>
                    ))}
                </Select>

                <Select
                    mr={2}
                    placeholder="Select Sector"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleSectorChange}
                    mb={4}
                    value={selectedSector}
                >
                    {sectors.map((sector, index) => (
                        <option key={index} value={sector}>
                            {sector.charAt(0).toUpperCase() + sector.slice(1)}
                        </option>
                    ))}
                </Select>

                <Select
                    placeholder="Select End Year"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleEndYearChange}
                    mb={4}
                    value={selectedEndYear}
                >
                    {endYear.map((end_year, index) => (
                        <option key={index} value={end_year}>
                            {end_year}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box display='flex' flexDirection={{ base: 'column', md: 'row' }}>
                <Select
                    mr={2}
                    placeholder="Select Topic"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleTopicChange}
                    mb={4}
                    value={selectedTopic}
                >
                    {topics.map((topic, index) => (
                        <option key={index} value={topic}>
                            {topic.charAt(0).toUpperCase() + topic.slice(1)}
                        </option>
                    ))}
                </Select>

                <Select
                    mr={2}
                    placeholder="Select Region"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleRegionChange}
                    mb={4}
                    value={selectedRegion}
                >
                    {regions.map((region, index) => (
                        <option key={index} value={region}>
                            {region.charAt(0).toUpperCase() + region.slice(1)}
                        </option>
                    ))}
                </Select>

                <Select
                    placeholder="Select PEST"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handlePestleChange}
                    mb={4}
                    value={selectedPestle}
                >
                    {pestles.map((pestle, index) => (
                        <option key={index} value={pestle}>
                            {pestle.charAt(0).toUpperCase() + pestle.slice(1)}
                        </option>
                    ))}
                </Select>

                <Select
                    placeholder="Select Source"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleSourceChange}
                    mb={4}
                    value={selectedSource}
                >
                    {sources.map((source, index) => (
                        <option key={index} value={source}>
                            {source.charAt(0).toUpperCase() + source.slice(1)}
                        </option>
                    ))}
                </Select>
            </Box>
            <div id="sectorChart" style={{ overflowX: 'auto' }}></div>
        </Box>
    );
};

export default YearSectorGraphs;
