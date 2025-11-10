
import React from 'react';
import { Job } from '../types';
import Button from './common/Button';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const typeColors: { [key in Job['type']]: string } = {
    'Part-time': 'bg-blue-100 text-primary',
    'Internship': 'bg-green-100 text-success',
    'Full-time': 'bg-purple-100 text-purple-800',
    'Contract': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col relative transform hover:-translate-y-1">
      {job.featured && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          ★ Featured
        </div>
      )}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-dark mb-2">{job.title}</h3>
        <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="font-medium">{job.company}</span>
            </p>
            <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {job.location}
            </p>
        </div>
        <p className="text-gray-700 mt-4 text-sm leading-relaxed line-clamp-2">{job.description}</p>
      </div>
      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeColors[job.type]}`}>
            {job.type}
        </span>
        <Button onClick={() => onViewDetails(job)} className="text-sm py-1 px-3">
            View Details
        </Button>
      </div>
    </div>
  );
};

export default JobCard;