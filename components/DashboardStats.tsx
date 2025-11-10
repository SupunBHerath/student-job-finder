import React, { useMemo } from 'react';
import { Job } from '../types';
import { HOMETOWNS, JOB_TYPES } from '../constants';

interface DashboardStatsProps {
  jobs: Job[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105">
        <div className="bg-primary-light p-3 rounded-full text-primary">
            {icon}
        </div>
        <div>
            <p className="text-sm text-secondary font-medium">{title}</p>
            <p className="text-2xl font-bold text-dark">{value}</p>
        </div>
    </div>
);

const DashboardStats: React.FC<DashboardStatsProps> = ({ jobs }) => {

    const jobsByLocation = useMemo<{ [key: string]: number }>(() => {
        const counts: { [key: string]: number } = {};
        HOMETOWNS.filter(h => h !== 'All').forEach(hometown => counts[hometown] = 0);
        jobs.forEach(job => {
            if(counts[job.location] !== undefined) {
                counts[job.location]++;
            }
        });
        return counts;
    }, [jobs]);

    const jobsByType = useMemo<{ [key: string]: number }>(() => {
        const counts: { [key: string]: number } = {};
        JOB_TYPES.forEach(type => counts[type] = 0);
        jobs.forEach(job => {
            if(counts[job.type] !== undefined) {
                counts[job.type]++;
            }
        });
        return counts;
    }, [jobs]);

  return (
    <div>
        <h2 className="text-3xl font-bold text-dark mb-4">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard title="Total Jobs" value={jobs.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
            <StatCard title="Featured Jobs" value={jobs.filter(j => j.featured).length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>} />
            <StatCard title="Locations" value={Object.keys(jobsByLocation).length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-dark mb-3">Jobs by Location</h3>
                <div className="space-y-2">
                    {Object.entries(jobsByLocation).map(([location, count]) => (
                        <div key={location}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-secondary">{location}</span>
                                <span className="text-dark font-semibold">{count}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${(count / Math.max(...Object.values(jobsByLocation), 1)) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-dark mb-3">Jobs by Type</h3>
                <div className="space-y-2">
                    {Object.entries(jobsByType).map(([type, count]) => (
                        <div key={type}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-secondary">{type}</span>
                                <span className="text-dark font-semibold">{count}</span>
                            </div>
                             <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-success h-2 rounded-full" style={{ width: `${(count / Math.max(...Object.values(jobsByType), 1)) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default DashboardStats;
