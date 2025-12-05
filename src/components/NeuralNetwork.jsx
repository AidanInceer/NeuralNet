import React, { useMemo } from 'react';

const NeuralNetwork = ({ layers }) => {
    const width = 800;
    const height = 500;
    const padding = 50;

    const networkData = useMemo(() => {
        const nodes = [];

        // Calculate node positions
        const layerSpacingX = layers.length > 1 ? (width - 2 * padding) / (layers.length - 1) : 0;

        layers.forEach((nodeCount, layerIndex) => {
            const layerNodes = [];
            const layerSpacingY = nodeCount > 1 ? (height - 2 * padding) / (nodeCount - 1) : 0;

            // If single node, center it vertically
            const startY = nodeCount === 1 ? height / 2 : padding;

            for (let i = 0; i < nodeCount; i++) {
                layerNodes.push({
                    x: padding + layerIndex * layerSpacingX,
                    y: nodeCount > 1 ? padding + i * layerSpacingY : height / 2,
                    id: `l${layerIndex}-n${i}`
                });
            }
            nodes.push(layerNodes);
        });

        const connections = [];
        for (let l = 0; l < nodes.length - 1; l++) {
            const currentLayer = nodes[l];
            const nextLayer = nodes[l + 1];

            currentLayer.forEach(startNode => {
                nextLayer.forEach(endNode => {
                    connections.push({
                        x1: startNode.x,
                        y1: startNode.y,
                        x2: endNode.x,
                        y2: endNode.y,
                        id: `${startNode.id}-${endNode.id}`
                    });
                });
            });
        }

        return { nodes, connections };
    }, [layers]);

    return (
        <div className="network-container">
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
                {/* Connections */}
                {networkData.connections.map(conn => (
                    <line
                        key={conn.id}
                        x1={conn.x1}
                        y1={conn.y1}
                        x2={conn.x2}
                        y2={conn.y2}
                        className="network-connection"
                    />
                ))}

                {/* Nodes */}
                {networkData.nodes.map((layer, lIndex) =>
                    layer.map(node => (
                        <circle
                            key={node.id}
                            cx={node.x}
                            cy={node.y}
                            r={15}
                            className="network-node"
                        />
                    ))
                )}
            </svg>
        </div>
    );
};

export default NeuralNetwork;
