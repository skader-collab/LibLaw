import { Link } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const topics = [
  {
    title: 'Property Law',
    icon: HomeIcon,
    description: 'Real estate, landlord-tenant issues, and property rights',
    path: '/topics/property',
  },
  {
    title: 'Family Law',
    icon: UserGroupIcon,
    description: 'Marriage, divorce, custody, and family matters',
    path: '/topics/family',
  },
  {
    title: 'Employment Law',
    icon: BriefcaseIcon,
    description: 'Workplace rights, contracts, and employment issues',
    path: '/topics/employment',
  },
  {
    title: 'Business Law',
    icon: BuildingOfficeIcon,
    description: 'Business formation, contracts, and corporate law',
    path: '/topics/business',
  },
  {
    title: 'Civil Rights',
    icon: ScaleIcon,
    description: 'Constitutional rights, discrimination, and civil liberties',
    path: '/topics/civil-rights',
  },
  {
    title: 'Healthcare Law',
    icon: HeartIcon,
    description: 'Medical law, patient rights, and healthcare regulations',
    path: '/topics/healthcare',
  },
];

const TopicsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link
              key={topic.title}
              to={topic.path}
              className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <Icon className="h-8 w-8 text-primary group-hover:text-green-600 transition-colors duration-200" />
                <h3 className="ml-3 text-xl font-semibold text-gray-900">{topic.title}</h3>
              </div>
              <p className="text-gray-600">{topic.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopicsPage;
