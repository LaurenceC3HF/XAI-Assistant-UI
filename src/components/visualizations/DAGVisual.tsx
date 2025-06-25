import React from 'react';
import { DAGData } from '../../types';
import { VisualCard } from './VisualCard';
import { GitBranch } from 'lucide-react';

const groupColors = [
  'border-blue-500',
  'border-green-500',
  'border-yellow-500',
  'border-purple-500'
];

interface DAGVisualProps {
  dagData?: DAGData;
}

export const DAGVisual: React.FC<DAGVisualProps> = ({ dagData }) => {
  if (!dagData || !dagData.nodes || !dagData.edges) return null;

  const groups = Array.from(new Set(dagData.nodes.map(n => n.group).filter(Boolean))) as string[];
  const colorMap: Record<string, string> = {};
  groups.forEach((g, i) => { colorMap[g] = groupColors[i % groupColors.length]; });

  const nodePositions = dagData.nodes.reduce((acc, node, i) => ({
    ...acc,
    [node.id]: {
      x: `${(i + 1) * (100 / (dagData.nodes.length + 1))}%`,
      y: '50%'
    }
  }), {} as Record<string, { x: string; y: string }>);

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
        {dagData.nodes.map((node) => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: nodePositions[node.id].x,
              top: nodePositions[node.id].y
            }}
          >
            <div
              className={`relative bg-slate-700 border-2 px-4 py-3 rounded-lg text-center text-sm font-medium text-white shadow-lg transition-all duration-300 ${node.group ? colorMap[node.group] : 'border-blue-500'} group-hover:shadow-blue-500/25`}
            >
              <div className="flex items-center justify-center">
                <GitBranch className="w-4 h-4 mr-2 text-blue-400" />
                {node.label}
              </div>
              {(node.description || node.importance) && (
                <div className="absolute left-full top-1/2 ml-3 w-56 -translate-y-1/2 rounded-lg bg-slate-800 p-3 text-xs text-gray-300 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                  {node.description && <p className="font-semibold text-white mb-1">{node.description}</p>}
                  {node.importance && <p className="mb-1">{node.importance}</p>}
                  {node.whatIf && <p className="italic text-gray-400">What if: {node.whatIf}</p>}
                </div>
              )}
            </div>
          </div>
        ))}

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

        {groups.length > 0 && (
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-4 text-xs">
            {groups.map(g => (
              <div key={g} className="flex items-center text-gray-300">
                <span className={`w-3 h-3 mr-2 rounded-full ${colorMap[g]}`}></span>
                {g}
              </div>
            ))}
          </div>
        )}
      </div>
    </VisualCard>
  );
};