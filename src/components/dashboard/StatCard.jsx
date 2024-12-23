import React from 'react';

const StatCard = ({ title, value, icon: Icon, footer }) => {
  return (
    <div className="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-xl">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="bg-gray-50 p-3 rounded-lg">
              <Icon className="h-6 w-6 text-gray-700" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-600 truncate">
                {title}
              </dt>
              <dd className="text-lg font-semibold text-gray-900">
                {value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {footer && (
        <div className="bg-gray-50 px-6 py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

export default StatCard;
