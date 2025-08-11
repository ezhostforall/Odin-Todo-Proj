// Debug script to add test data for filtering
// Run this in the browser console

console.log('Adding test data...');

// Clear existing data
localStorage.removeItem('odin-tasks-app');

// Create test data
const testData = [
  {
    id: 'project-test-1',
    name: 'Test Project',
    description: 'A test project for filtering',
    tasks: [
      {
        id: 'task-1',
        title: 'Completed Task 1',
        due: '2025-01-15',
        notes: ['This is a completed task'],
        done: true,
        priority: 'high'
      },
      {
        id: 'task-2',
        title: 'Pending Task 1',
        due: '2025-08-15',
        notes: ['This is a pending task'],
        done: false,
        priority: 'normal'
      },
      {
        id: 'task-3',
        title: 'Pending Task 2',
        due: '2025-08-20',
        notes: ['Another pending task'],
        done: false,
        priority: 'low'
      },
      {
        id: 'task-4',
        title: 'Overdue Task',
        due: '2025-01-01',
        notes: ['This task is overdue'],
        done: false,
        priority: 'high'
      },
      {
        id: 'task-5',
        title: 'Completed Task 2',
        due: '2025-07-15',
        notes: ['Another completed task'],
        done: true,
        priority: 'normal'
      }
    ]
  }
];

// Save test data
localStorage.setItem('odin-tasks-app', JSON.stringify(testData));

console.log('Test data added! Refresh the page.');
console.log('Navigate to the Test Project to see the filtering in action.');
