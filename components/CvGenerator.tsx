
import React, { useState } from 'react';
import { generateCv } from '../services/geminiService';
import { CvData, WorkExperience, Education } from '../types';
import Input from './common/Input';
import Button from './common/Button';
import Spinner from './common/Spinner';

const initialCvData: CvData = {
  fullName: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+94 77 123 4567',
  linkedIn: 'linkedin.com/in/johndoe',
  summary: 'A highly motivated and detail-oriented computer science undergraduate with a passion for web development and problem-solving. Eager to apply academic knowledge and gain hands-on experience in a dynamic tech environment.',
  workExperience: [
    { company: 'Virtusa', role: 'Software Engineering Intern', startDate: '2023-06', endDate: '2023-09', description: '- Collaborated with a team to develop features for a client-facing web application.\n- Wrote unit tests and fixed bugs.' },
  ],
  education: [
    { institution: 'University of Colombo School of Computing', degree: 'BSc in Computer Science', startDate: '2021-01', endDate: 'Present' },
  ],
  skills: 'JavaScript, React, Node.js, Python, SQL, Git, Agile methodologies',
};

const CvGenerator: React.FC = () => {
  const [formData, setFormData] = useState<CvData>(initialCvData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCv, setGeneratedCv] = useState<string | null>(null);
  const [copyText, setCopyText] = useState('Copy to Clipboard');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = (index: number, section: 'workExperience' | 'education', e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newSection = [...prev[section]];
      newSection[index] = { ...newSection[index], [name]: value };
      return { ...prev, [section]: newSection };
    });
  };

  const addEntry = (section: 'workExperience' | 'education') => {
    setFormData(prev => ({
      ...prev,
      [section]: [
        ...prev[section],
        section === 'workExperience'
          ? { company: '', role: '', startDate: '', endDate: '', description: '' }
          : { institution: '', degree: '', startDate: '', endDate: '' }
      ]
    }));
  };

  const removeEntry = (index: number, section: 'workExperience' | 'education') => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedCv(null);
    try {
      const cv = await generateCv(formData);
      setGeneratedCv(cv);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!generatedCv) return;
    navigator.clipboard.writeText(generatedCv);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy to Clipboard'), 2000);
  };

  const renderSectionHeader = (title: string) => (
    <h3 className="text-xl font-bold text-dark mt-6 mb-3 border-b pb-2">{title}</h3>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 text-center">AI CV Generator</h2>
        <p className="text-center text-secondary mb-6">Enter your details below and let AI craft a professional CV for you.</p>
        
        <form onSubmit={handleSubmit}>
          {renderSectionHeader('Personal Details')}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="LinkedIn Profile URL" name="linkedIn" value={formData.linkedIn} onChange={handleChange} />
          </div>

          {renderSectionHeader('Professional Summary')}
          <textarea name="summary" value={formData.summary} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="A brief summary about your professional self..." />

          {renderSectionHeader('Work Experience')}
          {formData.workExperience.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg mb-4 relative bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company" name="company" value={exp.company} onChange={e => handleDynamicChange(index, 'workExperience', e)} required />
                <Input label="Role / Title" name="role" value={exp.role} onChange={e => handleDynamicChange(index, 'workExperience', e)} required />
                <Input label="Start Date" name="startDate" type="month" value={exp.startDate} onChange={e => handleDynamicChange(index, 'workExperience', e)} />
                <Input label="End Date" name="endDate" type="month" value={exp.endDate} onChange={e => handleDynamicChange(index, 'workExperience', e)} />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description / Achievements</label>
                <textarea name="description" value={exp.description} onChange={e => handleDynamicChange(index, 'workExperience', e)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Describe your responsibilities and achievements..." />
              </div>
              <button type="button" onClick={() => removeEntry(index, 'workExperience')} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={() => addEntry('workExperience')}>+ Add Experience</Button>

          {renderSectionHeader('Education')}
          {formData.education.map((edu, index) => (
            <div key={index} className="p-4 border rounded-lg mb-4 relative bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Institution" name="institution" value={edu.institution} onChange={e => handleDynamicChange(index, 'education', e)} required />
                <Input label="Degree / Certificate" name="degree" value={edu.degree} onChange={e => handleDynamicChange(index, 'education', e)} required />
                <Input label="Start Date" name="startDate" type="month" value={edu.startDate} onChange={e => handleDynamicChange(index, 'education', e)} />
                <Input label="End Date" name="endDate" type="month" value={edu.endDate} onChange={e => handleDynamicChange(index, 'education', e)} />
              </div>
              <button type="button" onClick={() => removeEntry(index, 'education')} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={() => addEntry('education')}>+ Add Education</Button>

          {renderSectionHeader('Skills')}
          <textarea name="skills" value={formData.skills} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="e.g., JavaScript, React, Public Speaking, Teamwork..." />
          
          <div className="mt-8 text-center">
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto text-lg px-8 py-3">
              {isLoading ? <Spinner /> : 'Generate My CV'}
            </Button>
          </div>
        </form>
      </div>

      {isLoading && <div className="text-center"><Spinner /><p className="mt-2 text-secondary italic">AI is writing your CV...</p></div>}
      {error && <div className="mt-6 bg-red-100 border border-danger text-danger px-4 py-3 rounded-xl text-center" role="alert">{error}</div>}
      
      {generatedCv && (
        <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-dark">Your Generated CV</h2>
            <Button onClick={handleCopyToClipboard} variant="success">{copyText}</Button>
          </div>
          <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none p-4 bg-gray-50 rounded-md border">
             <pre className="whitespace-pre-wrap font-sans">{generatedCv}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CvGenerator;
