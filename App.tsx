
import React, { useState, useMemo, useEffect } from 'react';
import { Job, View, User } from './types';
import { INITIAL_JOBS, HOMETOWNS } from './constants';
import Header from './components/Header';
import JobList from './components/JobList';
import JobFilter from './components/JobFilter';
import AdminPanel from './components/AdminPanel';
import JobDetailModal from './components/JobDetailModal';
import LoginPage from './components/LoginPage';
import WhatsAppButton from './components/WhatsAppButton';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('student');
  const [selectedHometown, setSelectedHometown] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate initial data fetching
    if (currentUser) {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }
  }, [currentUser]);

  const filteredJobs = useMemo(() => {
    setIsLoading(true);
    let filtered = jobs;

    if (selectedHometown !== 'All') {
      filtered = filtered.filter(job => job.location === selectedHometown);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(lowercasedTerm) ||
          job.company.toLowerCase().includes(lowercasedTerm) ||
          job.description.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    // Simulate filtering delay for skeleton loaders
    setTimeout(() => setIsLoading(false), 300);

    return filtered;
  }, [jobs, selectedHometown, searchTerm]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView(user.role === 'admin' ? 'admin' : 'student');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSetCurrentView = (view: View) => {
    if (view === 'admin' && currentUser?.role !== 'admin') {
      return; // Prevent students from accessing admin view
    }
    setCurrentView(view);
  };

  const handleAddJob = (job: Omit<Job, 'id'>) => {
    const newJob: Job = {
      ...job,
      id: Date.now(),
      featured: false,
    };
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(prevJobs =>
      prevJobs.map(job => (job.id === updatedJob.id ? updatedJob : job))
    );
    setEditingJob(null);
  };

  const handleDeleteJob = (jobId: number) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setCurrentView('admin'); // Switch to admin view to show the form
  };
  
  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'student':
        return (
          <div className="container mx-auto p-4 md:p-6 animate-fade-in">
            <JobFilter
              hometowns={HOMETOWNS}
              selectedHometown={selectedHometown}
              onSelectHometown={setSelectedHometown}
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />
            <JobList 
                jobs={filteredJobs} 
                onViewDetails={handleViewJobDetails} 
                isLoading={isLoading} 
            />
          </div>
        );
      case 'admin':
        return (
          <div className="container mx-auto p-4 md:p-6 animate-fade-in">
            <AdminPanel
              jobs={jobs}
              onAddJob={handleAddJob}
              onUpdateJob={handleUpdateJob}
              onDeleteJob={handleDeleteJob}
              onEditJob={handleEditJob}
              editingJob={editingJob}
              clearEditingJob={() => setEditingJob(null)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light font-sans flex flex-col">
      <Header 
        currentView={currentView} 
        setCurrentView={handleSetCurrentView}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-dark text-gray-400 py-6 mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Student Part-Time Job Finder. All rights reserved.</p>
            <p className="text-sm mt-1">Empowering students across Sri Lanka.</p>
        </div>
      </footer>
      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
      {currentUser && <WhatsAppButton />}
    </div>
  );
};

export default App;