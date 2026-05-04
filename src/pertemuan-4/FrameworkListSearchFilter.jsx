import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="p-8">
      <input
        type="text"
        name="searchTerm"
        placeholder="Search framework..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <select
        name="selectedTag"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">All Tags</option>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      {frameworkData.map((item) => (
    <div
      key={item.id}
      className="group relative border border-gray-100 rounded-3xl p-6 bg-white 
                 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] 
                 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] 
                 hover:-translate-y-1.5 transition-all duration-300 ease-out"
    >
      {/* Accent Bar on Hover */}
      <div className="absolute top-0 left-0 w-1.5 h-0 bg-blue-500 group-hover:h-full transition-all duration-300 rounded-l-3xl" />

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
            {item.name}
          </h2>
          <p className="text-sm font-medium text-gray-400">
            By <span className="text-gray-600">{item.details.developer}</span>
          </p>
        </div>
        
        {/* External Link Icon Style */}
        <a
          href={item.details.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          title="Visit Website"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <p className="mt-4 text-gray-600 leading-relaxed">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {item.tags.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-1.5 text-xs font-semibold rounded-xl border border-transparent
                       bg-blue-50 text-blue-700 group-hover:bg-blue-100 group-hover:border-blue-200 transition-all"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  ))}
    </div>
  );
}
