import React, { useState } from 'react';
import { VisualCard } from './VisualCard';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { shapFeatureInfo } from '../../data/featureMeta';

interface SHAPVisualProps {
  shapData?: Record<string, number>;
}

export const SHAPVisual: React.FC<SHAPVisualProps> = ({ shapData }) => {
  const [activeFeature, setActiveFeature] = useState<{
    name: string;
    value: number;
    group: string;
    explanation?: string;
    why?: string;
    actual?: string;
  } | null>(null);

  if (!shapData) return null;

  const features = Object.entries(shapData)
    .map(([name, value]) => {
      const meta = shapFeatureInfo[name] || { group: 'Other' };
      return { name, value, group: meta.group, explanation: meta.explanation, why: meta.why, actual: meta.value };
    })
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  const maxAbsValue = Math.max(...features.map(f => Math.abs(f.value)));

  const grouped = features.reduce<Record<string, typeof features>>( (acc, f) => {
    acc[f.group] = acc[f.group] ? [...acc[f.group], f] : [f];
    return acc;
  }, {} );

  return (
    <VisualCard>
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-teal-400 mr-3" />
        <h3 className="text-lg font-semibold text-teal-300">
          SHAP Feature Importance
        </h3>
      </div>
      
      <div className="space-y-6">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group}>
            <h4 className="text-sm font-semibold text-gray-200 mb-2">{group}</h4>
            <div className="space-y-4">
              {items.map(({ name, value, explanation, why, actual }) => (
                <div
                  key={name}
                  className="group cursor-pointer"
                  onClick={() => setActiveFeature({ name, value, group, explanation, why, actual })}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {name}
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
                      className={`
                        h-full transition-all duration-500 ease-out
                        ${value > 0 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'}
                      `}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeFeature && (
        <div className="mt-6 bg-slate-700/60 p-4 rounded-lg text-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white font-semibold">{activeFeature.name}</h4>
            <button
              className="text-gray-400 text-xs hover:text-white"
              onClick={() => setActiveFeature(null)}
            >
              Close
            </button>
          </div>
          {activeFeature.explanation && (
            <p className="text-gray-300 mb-2">{activeFeature.explanation}</p>
          )}
          {activeFeature.why && (
            <p className="text-gray-400 italic mb-2">{activeFeature.why}</p>
          )}
          {activeFeature.actual && (
            <p className="text-gray-400">Value: {activeFeature.actual}</p>
          )}
        </div>
      )}
    </VisualCard>
  );
};