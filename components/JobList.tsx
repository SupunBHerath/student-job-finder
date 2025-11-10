
import React from 'react';
import { Job } from '../types';
import JobCard from './JobCard';
import SkeletonCard from './SkeletonCard';

interface JobListProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
  isLoading: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, onViewDetails, isLoading }) => {
  const featuredJobs = jobs.filter(job => job.featured);
  const regularJobs = jobs.filter(job => !job.featured);

  if (isLoading) {
    return (
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-700">No jobs found</h2>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <>
      {featuredJobs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-dark mb-6 flex items-center">
            <span className="text-yellow-400 mr-2">★</span> Featured Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} onViewDetails={onViewDetails} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold text-dark mb-6">All Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularJobs.map(job => (
            <JobCard key={job.id} job={job} onViewDetails={onViewDetails} />
          ))}
        </div>
      </section>
    </>
  );
};

export default JobList;