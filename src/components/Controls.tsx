import React from 'react';

interface ControlsProps {
    layers: number[];
    setLayers: React.Dispatch<React.SetStateAction<number[]>>;
}

const Controls: React.FC<ControlsProps> = ({ layers, setLayers }) => {
    const addLayer = () => {
        setLayers([...layers, 3]); // Default new layer with 3 nodes
    };

    const removeLayer = () => {
        if (layers.length > 1) {
            setLayers(layers.slice(0, -1));
        }
    };

    const addNode = (index: number) => {
        const newLayers = [...layers];
        if (newLayers[index] < 15) { // Max limit
            newLayers[index] += 1;
            setLayers(newLayers);
        }
    };

    const removeNode = (index: number) => {
        const newLayers = [...layers];
        if (newLayers[index] > 1) { // Min limit
            newLayers[index] -= 1;
            setLayers(newLayers);
        }
    };

    return (
        <div className="controls-container">
            <div className="global-controls">
                <button onClick={addLayer} className="btn primary">Add Layer</button>
                <button onClick={removeLayer} className="btn danger" disabled={layers.length <= 1}>Remove Layer</button>
            </div>

            <div className="layer-controls-wrapper">
                {layers.map((count, idx) => (
                    <div key={idx} className="layer-control">
                        <span>Layer {idx + 1}</span>
                        <div className="btn-group">
                            <button onClick={() => addNode(idx)} className="btn small">+</button>
                            <span>{count}</span>
                            <button onClick={() => removeNode(idx)} className="btn small" disabled={count <= 1}>-</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Controls;
