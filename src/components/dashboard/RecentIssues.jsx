import React from "react";
import { Link } from "react-router-dom";
import IssueCard from "../issues/IssueCard.jsx";
import { ArrowRight, Flame } from "lucide-react";

export default function RecentIssues({ issues = [], title = "Recent Civic Complaints" }) {
  const displayList = issues.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {title}
          </h3>
        </div>
        <Link
          to="/issues"
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <span>Explore All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayList.map((issue) => (
          <IssueCard key={issue._id || issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
