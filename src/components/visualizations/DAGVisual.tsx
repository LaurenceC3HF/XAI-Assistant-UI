import React, { useState } from 'react';
import { DAGData } from '../../types';
import { VisualCard } from './VisualCard';
import { GitBranch } from 'lucide-react';
import { dagNodeInfo, groupColors } from '../../data/featureMeta';

interface DAGVisualProps {
  dagData?: DAGData;
}

export const DAGVisual: React.FC<DAGVisualProps> = ({ dagData }) => {
  const [activeNode, setActiveNode] = useState<{
    id: string;
    label: string;
    group: string;
    description?: string;
    why?: string;
    whatIf?: string;
  } | null>(null);

  if (!dagData || !dagData.nodes || !dagData.edges) return null;

  const nodePositions = dagData.nodes.reduce((acc, node, i) => ({
    ...acc,
    [node.id]: {
      x: `${(i + 1) * (100 / (dagData.nodes.length + 1))}%`,
      y: '50%'
    }
  }), {} as Record<string, { x: string; y: string }>);

  const groups = Array.from(new Set(dagData.nodes.map(n => (dagNodeInfo[n.id]?.group || 'Other'))));

  return (
    <VisualCard>
      <div className="flex items-center mb-6">
        <GitBranch className="w-6 h-6 text-yellow-400 mr-3" />
        <h3 className="text-lg font-semibold text-yellow-300">
          Causal Decision Graph
        </h3>
      </div>
      
      <div className="relative h-64 bg-slate-900/30 rounded-lg p-4 overflow-hidden">
        {/* Nodes */}
                {dagData.nodes.map(node => {
          const meta = dagNodeInfo[node.id] || { group: 'Other' };
          const color = groupColors[meta.group] || '#6b7280';
          return (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: nodePositions[node.id].x, top: nodePositions[node.id].y }}
              onClick={() => setActiveNode({ id: node.id, label: node.label, group: meta.group, description: meta.description, why: meta.why, whatIf: meta.whatIf })}
            >
              <div
                className="bg-slate-700 border-2 px-4 py-3 rounded-lg text-center text-sm font-medium text-white shadow-lg transition-all duration-300"
                style={{ borderColor: color }}
              >
                <div className="flex items-center justify-center">
                  <GitBranch className="w-4 h-4 mr-2" style={{ color }} />
                  {node.label}
                </div>
              </div>
            </div>
              );
        })}

        {/* Edges */}
        <svg width="100%" height="100%" className="absolute top-0 left-0 pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#64748b"
                className="transition-colors duration-300"
              />
            </marker>
          </defs>
          
          {dagData.edges
            .filter(edge => nodePositions[edge.from] && nodePositions[edge.to])
            .map((edge, i) => {
              const fromPos = nodePositions[edge.from];
              const toPos = nodePositions[edge.to];
              return (
                <line
                  key={i}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke="#64748b"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  className="transition-colors duration-300 hover:stroke-blue-400"
                />
              );
            })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {groups.map(g => (
          <div key={g} className="flex items-center text-xs text-gray-300">
            <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: groupColors[g] || '#6b7280' }} />
            {g}
          </div>
        ))}
      </div>

      {activeNode && (
        <div className="mt-4 bg-slate-700/60 p-4 rounded-lg text-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white font-semibold">{activeNode.label}</h4>
            <button className="text-gray-400 text-xs hover:text-white" onClick={() => setActiveNode(null)}>
              Close
            </button>
          </div>
          {activeNode.description && (
            <p className="text-gray-300 mb-2">{activeNode.description}</p>
          )}
          {activeNode.why && (
            <p className="text-gray-400 italic mb-2">{activeNode.why}</p>
          )}
          {activeNode.whatIf && (
            <p className="text-gray-400">What if: {activeNode.whatIf}</p>
          )}
        </div>
      )}
    </VisualCard>
  );
};
