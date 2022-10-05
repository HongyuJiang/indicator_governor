import G6 from '@antv/g6';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getStatRule } from '../../data.index';
import { structuringList } from '../util'

let graph = null;

function handleNodeClick(event) {
    const item = event.item;
    graph.focusItem(item, true, {
      easing: 'easeCubic',
      duration: 500,
    });
  }

const draw = (data, ref) => {

    const width = 1300;
    const height = 800;

    if (!graph) {
        graph = new G6.TreeGraph({
            container: ReactDOM.findDOMNode(ref.current),
            width,
            height,
            linkCenter: true,
            modes: {
                default: [
                    {
                        type: 'collapse-expand',
                        onChange: function onChange(item, collapsed) {
                            const data = item.getModel();
                            data.collapsed = collapsed;
                            return true;
                        },
                        
                    },
                    'drag-canvas',
                    'zoom-canvas',
                ],
            },
            defaultNode: {
                size: 20,
                anchorPoints: [
                  [0, 0.5],
                  [1, 0.5],
                ],
              },
              defaultEdge: {
                type: 'cubic-horizontal',
            },
            layout: {
                direction: 'LR', // H / V / LR / RL / TB / BT
                nodeSep: 30,
                rankSep: 150,
              },
        });

        graph.node(function (node) {
            return {
              label: node.name,
              labelCfg: {
                position: node.children && node.children.length > 0 ? 'left' : 'right',
                offset: 5,
              },
            };
          });

        graph.data(data);
        graph.render();
        graph.fitView();
        graph.on('node:click', handleNodeClick);

    }
}

const hierachyTree = (props) => {

    const ref = React.useRef(null);

    useEffect(() => {
        if(ref) {
            getStatRule().then((graphData) => {
                const graph = structuringList(graphData.data)
                draw(graph, ref)
            })
        }   
    }, [ref])

    return (
        <div ref={ref} />
    )
};

export default hierachyTree;