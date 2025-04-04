"use client";

export const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white rounded-lg shadow overflow-hidden"
        >
          {/* Image placeholder */}
          <div className="bg-gray-200 h-48 w-full"></div>

          {/* Content placeholder */}
          <div className="p-4 space-y-3">
            <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
            <div className="flex space-x-2">
              <div className="bg-gray-200 h-4 w-4 rounded-full"></div>
              <div className="bg-gray-200 h-4 w-20 rounded"></div>
            </div>
            <div className="flex space-x-2">
              <div className="bg-gray-200 h-4 w-4 rounded-full"></div>
              <div className="bg-gray-200 h-4 w-24 rounded"></div>
            </div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
            <div className="pt-4">
              <div className="bg-gray-200 h-10 w-full rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="text-center p-4">
        <div className="bg-gray-200 h-10 w-3/4 mx-auto rounded"></div>
        <div className="bg-gray-200 h-6 w-1/2 mx-auto mt-2 rounded"></div>
      </div>
    ))}
  </div>
);
