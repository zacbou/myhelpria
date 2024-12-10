import React from 'react';
import { Globe } from 'lucide-react';
import type { GeoStats } from '../types';

interface GeoAnalyticsProps {
  geoStats: GeoStats[];
}

export default function GeoAnalytics({ geoStats }: GeoAnalyticsProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-gray-400" />
          Geographic Distribution
        </h3>
        <div className="mt-5">
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {geoStats.map((stat) => (
                <li key={stat.country} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{stat.country}</p>
                      <div className="mt-1 relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                          <div
                            style={{ width: `${stat.percentage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500">
                      {stat.visitors.toLocaleString()} visitors ({stat.percentage}%)
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}