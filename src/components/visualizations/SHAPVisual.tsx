import React from 'react';
import { VisualCard } from './VisualCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FeatureInfo {
  group: string;
  description: string;
  why: string;
  value?: string;
}

// Mapping of features to group and descriptions used for tooltips
const featureInfoMap: Record<string, FeatureInfo> = {
  'Flight Deviation': {
    group: 'Flight Data',
    description: 'How far the aircraft deviated from its planned route.',
    why: 'High flight deviation is often seen in evasive manoeuvres.',
    value: 'Large course change'
  },
  'Speed Increase': {
    group: 'Flight Data',
    description: 'Change in air speed relative to plan.',
    why: 'Rapid acceleration can signal intentional course change.',
    value: 'Significant increase'
  },
  'ATC Non-Response': {
    group: 'Communications',
    description: 'Lack of reply to Air Traffic Control calls.',
    why: 'Communication silence indicates possible hostile intent.',
    value: 'No reply'
  },
  'Geographic Vector': {
    group: 'Route',
    description: 'Current approach relative to critical infrastructure.',
    why: 'Approach vector may indicate an attack posture.',
    value: 'Aligned with targets'
  },
  'Time of Day': {
    group: 'Environmental',
    description: 'Operational context based on day or night.',
    why: 'Certain times correlate with higher threat activity.',
    value: 'Night hours'
  }
};

interface SHAPVisualProps {
  shapData?: Record<string, number>;
}

export const SHAPVisual: React.FC<SHAPVisualProps> = ({ shapData }) => {
  if (!shapData) return null;

  const features = Object.entries(shapData).sort(([, a], [, b]) => Math.abs(b) - Math.abs(a));
  const maxAbsValue = Math.max(...features.map(([, v]) => Math.abs(v)));

  // Group features by their source/type
  const grouped = features.reduce<Record<string, Array<[string, number]>>>(
    (acc, [feature, val]) => {
      const info = featureInfoMap[feature];
      const group = info ? info.group : 'Other';
      if (!acc[group]) acc[group] = [];
      acc[group].push([feature, val]);
      return acc;
    },
    {}
  );

  return (
    <VisualCard>
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-teal-400 mr-3" />
        <h3 className="text-lg font-semibold text-teal-300">SHAP Feature Importance</h3>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([group, feats]) => (
          <div key={group} className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400">{group}</h4>
            {feats.map(([feature, value]) => {
              const info = featureInfoMap[feature];
              return (
                <div key={feature} className="group relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {feature}
                    </span>
                    <div className="flex items-center">
                      {value > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                      )}
                      <span className={`text-sm font-bold ${value > 0 ? 'text-green-400' : 'text-red-400'}`}>{value.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="relative bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      style={{ width: `${(Math.abs(value) / maxAbsValue) * 100}%` }}
                      className={`h-full transition-all duration-500 ease-out ${value > 0 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
                    />
                  </div>

                  {info && (
                    <div className="absolute left-full top-1/2 ml-3 w-56 -translate-y-1/2 rounded-lg bg-slate-800 p-3 text-xs text-gray-300 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                      <p className="font-semibold text-white mb-1">{info.description}</p>
                      <p className="mb-1">{info.why}</p>
                      <p className="text-teal-300">Value: {info.value ?? value.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </VisualCard>
  );
};