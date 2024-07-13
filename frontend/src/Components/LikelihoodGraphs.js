import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Box, Select } from '@chakra-ui/react';

const LikelihoodGraphs = ({ jsonData = [] }) => {
    const [data, setData] = useState([]);
    const [endYear, setEndYear] = useState([]);
    const [selectedEndYear, setSelectedEndYear] = useState("");
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [sectors, setSectors] = useState([]);
    const [selectedSector, setSelectedSector] = useState('');
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [pestles, setPestles] = useState([]);
    const [selectedPestle, setSelectedPestle] = useState('');
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');

    useEffect(() => {
        if (Array.isArray(jsonData) && jsonData.length > 0) {

            // Extract unique endYear and sort them
            const uniqueEndYear = [...new Set(jsonData.map(item => item.end_year))].sort((a, b) => a - b);
            setEndYear(uniqueEndYear);

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

            // Filter data for the default selected topic
            const filteredData = jsonData.filter(item => (
                (selectedEndYear === "" || item.end_year === selectedEndYear) &&
                (selectedTopic === "" || item.topic === selectedTopic) &&
                (selectedSector === "" || item.sector === selectedSector) &&
                (selectedRegion === "" || item.region === selectedRegion) &&
                (selectedPestle === "" || item.pestle === selectedPestle) &&
                (selectedSource === "" || item.source === selectedSource) &&
                (item.start_year !== "")
            ));

            // Group data by start year and calculate average likelihood per start year
            const likelihoodByYear = filteredData.reduce((acc, item) => {
                if (item.start_year in acc) {
                    acc[item.start_year].count++;
                    acc[item.start_year].totalLikelihood += item.likelihood;
                } else {
                    acc[item.start_year] = {
                        count: 1,
                        totalLikelihood: item.likelihood,
                    };
                }
                return acc;
            }, {});

            const averageLikelihoodData = Object.entries(likelihoodByYear).map(([start_year, { count, totalLikelihood }]) => ({
                start_year,
                averageLikelihood: totalLikelihood / count,
            }));

            // Set data state
            setData(averageLikelihoodData);
        }
    }, [jsonData, selectedTopic, selectedSector, selectedEndYear, selectedRegion, selectedPestle, selectedSource]);

    useEffect(() => {
        if (data.length > 0) {
            // D3.js code to render the line chart
            drawLineChart(data);
        }
    }, [data]);

    const handleEndYearChange = (event) => {
        setSelectedEndYear(event.target.value);
    };

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    const handleSectorChange = (event) => {
        setSelectedSector(event.target.value);
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

    const drawLineChart = (data) => {
        const margin = { top: 20, right: 20, bottom: 90, left: 70 };
        const width = 1000 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Remove existing chart if any
        d3.select("#lineChart").selectAll("*").remove();

        // Create SVG element
        const svg = d3.select("#lineChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X scale
        const x = d3.scaleBand()
            .domain(data.map(d => d.start_year))
            .range([0, width])
            .padding(0.1);

        // Y scale
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.averageLikelihood)])
            .nice()
            .range([height, 0]);

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

        // Line generator
        const line = d3.line()
            .x(d => x(d.start_year) + x.bandwidth() / 2)
            .y(d => y(d.averageLikelihood))
            .curve(d3.curveMonotoneX);

        // Add the line path with transition
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "#7367F0")
            .style("stroke-width", 2)
            .attr("stroke-dasharray", function () {
                const length = this.getTotalLength();
                return `${length} ${length}`;
            })
            .attr("stroke-dashoffset", function () {
                return this.getTotalLength();
            })
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        // Add data points
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.start_year) + x.bandwidth() / 2)
            .attr("cy", height)
            .attr("r", 5)
            .style("fill", "#7367F0")
            .transition()
            .duration(2000)
            .ease(d3.easeBounceOut)
            .attr("cy", d => y(d.averageLikelihood));

        // Add event listeners for mouseover and mouseout
        svg.selectAll(".dot")
            .on("mouseover", function (event, d) {
                // Show the text element on hover
                d3.select(this.parentNode).select(`#text-${d.start_year}`).style("display", "block");
            })
            .on("mouseout", function (event, d) {
                // Hide the text element when not hovering
                d3.select(this.parentNode).select(`#text-${d.start_year}`).style("display", "none");
            });

        // Add text elements on top of each data point
        svg.selectAll(".dot-text")
            .data(data)
            .enter().append("text")
            .attr("id", d => `text-${d.start_year}`)
            .attr("x", d => x(d.start_year) + x.bandwidth() / 2)
            .attr("y", d => y(d.averageLikelihood) - 10)
            .attr("text-anchor", "middle")
            .style("fill", "#ff6600")
            .style("display", "none") // Hide text initially
            .text(d => `${Number.isInteger(d.averageLikelihood) ? d.averageLikelihood : d.averageLikelihood.toFixed(2)}`);
    };

    return (
        <Box>
            <Box
                mb={3}
                fontSize={18}
                fontWeight={500}
            >Likelihood Vs Start Year Graph:-</Box>
            <Box
                display='flex'
                flexDirection={{ base: 'column', md: 'row' }}
            >
                <Select mr={2} placeholder="Select End Year"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleEndYearChange} mb={4} value={selectedEndYear}>
                    {endYear.map((end_year, index) => (
                        <option key={index} value={end_year}>
                            {end_year}
                        </option>
                    ))}
                </Select>

                <Select mr={2} placeholder="Select Topic"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleTopicChange} mb={4} value={selectedTopic}>
                    {topics.map((topic, index) => (
                        <option key={index} value={topic}>
                            {topic.charAt(0).toUpperCase() + topic.slice(1)}
                        </option>
                    ))}
                </Select>

                <Select placeholder="Select Sector"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleSectorChange} mb={4} value={selectedSector}>
                    {sectors.map((sector, index) => (
                        <option key={index} value={sector}>
                            {sector.charAt(0).toUpperCase() + sector.slice(1)}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box
                display='flex'
                flexDirection={{ base: 'column', md: 'row' }}
            >
                <Select mr={2} placeholder="Select Region"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleRegionChange} mb={4} value={selectedRegion}>
                    {regions.map((region, index) => (
                        <option key={index} value={region}>
                            {region.charAt(0).toUpperCase() + region.slice(1)}
                        </option>
                    ))}
                </Select>

                <Select mr={2} placeholder="Select PEST"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handlePestleChange} mb={4} value={selectedPestle}>
                    {pestles.map((pestle, index) => (
                        <option key={index} value={pestle}>
                            {pestle.charAt(0).toUpperCase() + pestle.slice(1)}
                        </option>
                    ))}
                </Select>

                <Select placeholder="Select Source"
                    sx={{
                        color: '#8c8c8c',
                    }}
                    onChange={handleSourceChange} mb={4} value={selectedSource}>
                    {sources.map((source, index) => (
                        <option key={index} value={source}>
                            {source.charAt(0).toUpperCase() + source.slice(1)}
                        </option>
                    ))}
                </Select>
            </Box>
            <div id="lineChart" style={{ overflowX: 'auto' }}></div>
        </Box>
    );
};

export default LikelihoodGraphs;
