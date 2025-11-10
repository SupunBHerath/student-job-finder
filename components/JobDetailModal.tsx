
import React from 'react';
import { Job } from '../types';
import Button from './common/Button';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  const typeColors: { [key in Job['type']]: string } = {
    'Part-time': 'bg-blue-100 text-primary',
    'Internship': 'bg-green-100 text-success',
    'Full-time': 'bg-purple-100 text-purple-800',
    'Contract': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-dark">{job.title}</h2>
              <p className="text-secondary mt-1">{job.company} • {job.location}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 flex-grow">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark mb-2">Job Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark mb-2">Job Type</h3>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${typeColors[job.type]}`}>
              {job.type}
            </span>
          </div>
        </div>
        
        <div className="bg-light p-6 flex justify-end items-center space-x-4">
            <Button variant="secondary" onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Close</Button>
            <Button onClick={() => alert('Redirecting to application page...')}>
                Apply on Company Site
            </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;