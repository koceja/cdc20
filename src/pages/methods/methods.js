import React from 'react';
import { Box, Card, Flex, Heading, Image } from 'rebass';


import samplePic from '../graphs/sample-graph.jpg';

import './methods.css';

const graphList = [
    {
        title: "first",
        graph: null
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

class Methods extends React.Component {


    render() {
        return (<div id="methods">
            <hr />
            <div className="page-header">
                <h1>Methodologies</h1>
            </div>
            <Flex flexWrap='wrap' mx={0}>
                {graphList.map((graph) => (
                    <Box px={3} py={4} width={1}>
                        <Card>
                            <Heading color="#5373ff">{graph.title}</Heading>
                            <Image src={samplePic} />
                        </Card>
                    </Box>
                ))}
            </Flex>
        </div>);
    }
}

export default Methods;