
import React from 'react';
import Select from './common/Select';
import Input from './common/Input';

interface JobFilterProps {
  hometowns: string[];
  selectedHometown: string;
  onSelectHometown: (hometown: string) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

const JobFilter: React.FC<JobFilterProps> = ({ hometowns, selectedHometown, onSelectHometown, searchTerm, onSearch }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
            <Input 
                label="Search by keyword (e.g. 'Sales', 'Virtusa')"
                id="search-term"
                value={searchTerm}
                onChange={e => onSearch(e.target.value)}
                placeholder="Search jobs..."
            />
        </div>
        <div>
            <Select
                label="Filter by Hometown"
                id="hometown-filter"
                options={hometowns}
                value={selectedHometown}
                onChange={e => onSelectHometown(e.target.value)}
            />
        </div>
      </div>
    </div>
  );
};

export default JobFilter;