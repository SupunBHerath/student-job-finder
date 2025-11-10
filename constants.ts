
import { Job } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    title: 'Cafe Barista',
    company: 'Colombo Coffee House',
    location: 'Colombo',
    description: 'Prepare and serve coffee and other beverages to customers. Friendly and energetic personality required. Full training provided. Flexible hours available.',
    type: 'Part-time',
    featured: false,
  },
  {
    id: 4,
    title: 'Software Engineering Intern',
    company: 'Virtusa',
    location: 'Colombo',
    description: 'Join a dynamic team to assist senior developers in creating and maintaining web applications. A fantastic opportunity to gain real-world experience. Knowledge of React and Node.js preferred.',
    type: 'Internship',
    featured: true,
  },
  {
    id: 2,
    title: 'Sales Assistant',
    company: 'Kandy Fashion Outlet',
    location: 'Kandy',
    description: 'Assist customers with purchases, manage inventory, and maintain store appearance. Interest in fashion is a plus. Great for developing communication skills.',
    type: 'Part-time',
    featured: false,
  },
  {
    id: 3,
    title: 'University Library Helper',
    company: 'Peradeniya University Library',
    location: 'Kandy',
    description: 'Help students and faculty find resources, check books in and out, and organize shelves. A quiet and focused work environment.',
    type: 'Part-time',
    featured: false,
  },
  {
    id: 5,
    title: 'Tour Guide Assistant',
    company: 'Galle Fort Tours',
    location: 'Galle',
    description: 'Assist lead tour guides, provide information to tourists, and ensure a great experience. Must be fluent in English and passionate about Sri Lankan history.',
    type: 'Contract',
    featured: true,
  },
   {
    id: 6,
    title: 'Maths & Science Tutor',
    company: 'Negombo Tutors',
    location: 'Negombo',
    description: 'Help high school students understand complex concepts in O/L and A/L Mathematics and Science. Rewarding role with flexible scheduling.',
    type: 'Part-time',
    featured: false,
  },
  {
    id: 7,
    title: 'Data Entry Clerk',
    company: 'JK Holdings',
    location: 'Kurunegala',
    description: 'Accurately enter and update data into various systems. Strong typing skills and attention to detail required. Perfect for gaining office experience.',
    type: 'Part-time',
    featured: false,
  }
];

export const HOMETOWNS: string[] = ['All', 'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Kurunegala', 'Anuradhapura', 'Matara'];

export const JOB_TYPES: Job['type'][] = ['Part-time', 'Internship', 'Full-time', 'Contract'];