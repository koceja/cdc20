import React from 'react';
import { Box, Card, Flex, Heading, Image } from 'rebass';
import TableauReport from 'react-tableau-report';

import BasicEmbed from './tableau.js';
import tableau from "tableau-api";




import './graphs.css';

const graphList = [
    {
        title: "first",
        graph: <BasicEmbed />
           
    },
    {
        title: "second",
        graph: null
    },
    {
        title: "third",
        graph: null
    },
    {
        title: "fourth",
        graph: null
    },
    {
        title: "fifth",
        graph: null
    },
    {
        title: "sixth",
        graph: null
    },
    {
        title: "seventh",
        graph: null
    },
    {
        title: "eighth",
        graph: null
    },
];

class Graphs extends React.Component {


    render() {
        return (<div id="graphs">
            <hr />
            
            <Flex flexWrap='wrap' mx={0}>
                {graphList.map((graph) => (
                    <Box px={3} py={4} width={1}>
                        <Card>
                            <Heading color="#5373ff">{graph.title}</Heading>
                            {graph.graph}
                        </Card>
                    </Box>
                ))}
            </Flex>
        </div>);
    }
}

export default Graphs;