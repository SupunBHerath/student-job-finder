import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { JOB_TYPES, HOMETOWNS } from '../constants';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';

interface JobFormProps {
  onSubmit: (job: Omit<Job, 'id'> | Job) => void;
  initialData?: Job | null;
  onCancel?: () => void;
}

const initialFormState = {
  title: '',
  company: '',
  location: HOMETOWNS.find(h => h !== 'All') || '',
  description: '',
  type: JOB_TYPES[0],
  featured: false,
};

const JobForm: React.FC<JobFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
        setFormData(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-5">
      <h2 className="text-2xl font-bold text-dark mb-4 border-b pb-3">{initialData ? 'Edit Job Listing' : 'Add New Job'}</h2>
      <Input label="Job Title" id="title" name="title" value={formData.title} onChange={handleChange} required />
      <Input label="Company" id="company" name="company" value={formData.company} onChange={handleChange} required />
      <Select 
        label="Location" 
        id="location" 
        name="location" 
        options={HOMETOWNS.filter(h => h !== 'All')} 
        value={formData.location} 
        onChange={handleChange}
      />
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <Select label="Job Type" id="type" name="type" options={JOB_TYPES} value={formData.type} onChange={handleChange} />
      <div className="flex items-center justify-end space-x-3 pt-4">
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" variant="success">{initialData ? 'Update Job' : 'Add Job'}</Button>
      </div>
    </form>
  );
};

export default JobForm;
