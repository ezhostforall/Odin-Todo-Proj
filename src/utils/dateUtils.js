export function formatDate(date) {
  if (!date) return 'No due date';
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function parseDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }
  
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date;
}

export function sanitizeDue(due) {
  if (!due) return null;
  if (typeof due === 'string') return due;
  if (due instanceof Date && !isNaN(due.getTime())) {
    return due.toISOString().slice(0, 10);
  }
  return null;
}
