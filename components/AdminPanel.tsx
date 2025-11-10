
import React, { useState, useMemo } from 'react';
import { Job } from '../types';
import JobForm from './JobForm';
import DashboardStats from './DashboardStats';

interface AdminPanelProps {
  jobs: Job[];
  onAddJob: (job: Omit<Job, 'id'>) => void;
  onUpdateJob: (job: Job) => void;
  onDeleteJob: (jobId: number) => void;
  onEditJob: (job: Job) => void;
  editingJob: Job | null;
  clearEditingJob: () => void;
}

type SortKey = keyof Pick<Job, 'title' | 'company' | 'location'>;
type SortDirection = 'asc' | 'desc';

const AdminPanel: React.FC<AdminPanelProps> = ({ jobs, onAddJob, onUpdateJob, onDeleteJob, onEditJob, editingJob, clearEditingJob }) => {
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSubmit = (jobData: Omit<Job, 'id'> | Job) => {
    if ('id' in jobData) {
      onUpdateJob(jobData as Job);
    } else {
      onAddJob(jobData);
    }
  };

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [jobs, sortKey, sortDirection]);
  
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const SortableHeader: React.FC<{ sortKeyName: SortKey, children: React.ReactNode }> = ({ sortKeyName, children }) => (
    <th 
      scope="col" 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => handleSort(sortKeyName)}
    >
      <div className="flex items-center">
        {children}
        {sortKey === sortKeyName && (
          <span className="ml-2">{sortDirection === 'asc' ? '▲' : '▼'}</span>
        )}
      </div>
    </th>
  );

  return (
    <>
      <DashboardStats jobs={jobs} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-1">
          <JobForm
            onSubmit={handleSubmit}
            initialData={editingJob}
            onCancel={editingJob ? clearEditingJob : undefined}
          />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-dark mb-4">Manage Jobs</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableHeader sortKeyName="title">Title</SortableHeader>
                  <SortableHeader sortKeyName="company">Company</SortableHeader>
                  <SortableHeader sortKeyName="location">Location</SortableHeader>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedJobs.map(job => (
                  <tr key={job.id} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button onClick={() => onEditJob(job)} className="text-secondary hover:text-primary p-2 rounded-full hover:bg-gray-200 transition-colors" title="Edit Job">
                          <span className="sr-only">Edit</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button onClick={() => onDeleteJob(job.id)} className="text-secondary hover:text-danger p-2 rounded-full hover:bg-gray-200 transition-colors" title="Delete Job">
                          <span className="sr-only">Delete</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;