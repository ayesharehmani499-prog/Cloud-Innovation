import React from "react";
import FilterBar from "../common/FilterBar.jsx";

export default function IssueFilters({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  selectedDepartment,
  onDepartmentChange,
  sortBy,
  onSortChange,
  onClearFilters
}) {
  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedStatus !== "All" ||
    selectedPriority !== "All" ||
    selectedDepartment !== "All" ||
    sortBy !== "newest";

  return (
    <FilterBar
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
      selectedStatus={selectedStatus}
      onStatusChange={onStatusChange}
      selectedPriority={selectedPriority}
      onPriorityChange={onPriorityChange}
      selectedDepartment={selectedDepartment}
      onDepartmentChange={onDepartmentChange}
      sortBy={sortBy}
      onSortChange={onSortChange}
      onClearFilters={onClearFilters}
      hasActiveFilters={hasActiveFilters}
    />
  );
}
