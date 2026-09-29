export function validateIssueForm(formData) {
  const errors = {};

  // Title
  if (!formData.title || !formData.title.trim()) {
    errors.title = "Issue title is required";
  } else if (formData.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters";
  } else if (formData.title.trim().length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  }

  // Category
  if (!formData.category || !formData.category.trim()) {
    errors.category = "Please select an issue category";
  }

  // Description
  if (!formData.description || !formData.description.trim()) {
    errors.description = "Detailed issue description is required";
  } else if (formData.description.trim().length < 15) {
    errors.description = "Description must be at least 15 characters to assist field teams";
  } else if (formData.description.trim().length > 1500) {
    errors.description = "Description cannot exceed 1500 characters";
  }

  // Location
  if (!formData.location || !formData.location.trim()) {
    errors.location = "Location or landmark is required";
  } else if (formData.location.trim().length < 3) {
    errors.location = "Location must be at least 3 characters";
  }

  // Priority
  if (!formData.priority) {
    errors.priority = "Priority level is required";
  }

  // Email format check if provided
  if (formData.reporterEmail && formData.reporterEmail.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.reporterEmail.trim())) {
      errors.reporterEmail = "Please enter a valid email address";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
