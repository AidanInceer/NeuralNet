// State
let layers = [4, 6, 6, 4, 3];

const networkContainer = document.getElementById('network-container');
const controlsContainer = document.getElementById('controls-container');

// Constants
const width = 800;
const height = 500;
const padding = 50;

function renderNetwork() {
    // Clear previous
    networkContainer.innerHTML = '';

    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const nodes = [];

    // Calculate positions
    const layerSpacingX = layers.length > 1 ? (width - 2 * padding) / (layers.length - 1) : 0;

    layers.forEach((nodeCount, layerIndex) => {
        const layerNodes = [];
        const layerSpacingY = nodeCount > 1 ? (height - 2 * padding) / (nodeCount - 1) : 0;

        for (let i = 0; i < nodeCount; i++) {
            layerNodes.push({
                x: padding + layerIndex * layerSpacingX,
                y: nodeCount > 1 ? padding + i * layerSpacingY : height / 2,
                id: `l${layerIndex}-n${i}`
            });
        }
        nodes.push(layerNodes);
    });

    // Draw Connections
    for (let l = 0; l < nodes.length - 1; l++) {
        const currentLayer = nodes[l];
        const nextLayer = nodes[l + 1];

        currentLayer.forEach(startNode => {
            nextLayer.forEach(endNode => {
                const line = document.createElementNS(ns, 'line');
                line.setAttribute('x1', startNode.x);
                line.setAttribute('y1', startNode.y);
                line.setAttribute('x2', endNode.x);
                line.setAttribute('y2', endNode.y);
                line.classList.add('network-connection');
                svg.appendChild(line);
            });
        });
    }

    // Draw Nodes
    nodes.forEach(layer => {
        layer.forEach(node => {
            const circle = document.createElementNS(ns, 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', 15);
            circle.classList.add('network-node');
            svg.appendChild(circle);
        });
    });

    networkContainer.appendChild(svg);
}

function renderControls() {
    controlsContainer.innerHTML = '';

    // Global Controls
    const globalDiv = document.createElement('div');
    globalDiv.className = 'global-controls';

    const addLayerBtn = document.createElement('button');
    addLayerBtn.textContent = 'Add Layer';
    addLayerBtn.className = 'btn primary';
    addLayerBtn.onclick = () => {
        layers.push(3);
        update();
    };

    const removeLayerBtn = document.createElement('button');
    removeLayerBtn.textContent = 'Remove Layer';
    removeLayerBtn.className = 'btn danger';
    removeLayerBtn.disabled = layers.length <= 1;
    removeLayerBtn.onclick = () => {
        if (layers.length > 1) {
            layers.pop();
            update();
        }
    };

    globalDiv.appendChild(addLayerBtn);
    globalDiv.appendChild(removeLayerBtn);
    controlsContainer.appendChild(globalDiv);

    // Layer Controls
    const layersWrapper = document.createElement('div');
    layersWrapper.className = 'layer-controls-wrapper';

    layers.forEach((count, idx) => {
        const layerControl = document.createElement('div');
        layerControl.className = 'layer-control';

        const label = document.createElement('span');
        label.textContent = `Layer ${idx + 1}`;

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        const addNodeBtn = document.createElement('button');
        addNodeBtn.textContent = '+';
        addNodeBtn.className = 'btn small';
        addNodeBtn.disabled = count >= 15;
        addNodeBtn.onclick = () => {
            if (layers[idx] < 15) {
                layers[idx]++;
                update();
            }
        };

        const countSpan = document.createElement('span');
        countSpan.textContent = count;

        const removeNodeBtn = document.createElement('button');
        removeNodeBtn.textContent = '-';
        removeNodeBtn.className = 'btn small';
        removeNodeBtn.disabled = count <= 1;
        removeNodeBtn.onclick = () => {
            if (layers[idx] > 1) {
                layers[idx]--;
                update();
            }
        };

        btnGroup.appendChild(addNodeBtn);
        btnGroup.appendChild(countSpan);
        btnGroup.appendChild(removeNodeBtn);

        layerControl.appendChild(label);
        layerControl.appendChild(btnGroup);
        layersWrapper.appendChild(layerControl);
    });

    controlsContainer.appendChild(layersWrapper);
}

function update() {
    renderNetwork();
    renderControls();
}

// Initial render
update();
