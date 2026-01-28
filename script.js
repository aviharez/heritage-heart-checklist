document.addEventListener('DOMContentLoaded', function() {
  initializeTracker();
});

function initializeTracker() {
  // load saved state from local storage
  loadState();

  // initialize event listener
  initializeCheckboxes();
  initializeButtons();

  // update all count and progress
  updateAllProgress();
}

// initialize checkbox event listeners
function initializeCheckboxes() {
  const checkboxes = document.querySelectorAll('.task-checkbox');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      handleCheckboxChange(this);
    });
  });
}

// initialize button event listeners
function initializeButtons() {
  const resetBtn = document.getElementById('resetBtn');
  const printBtn = document.getElementById('printBtn');

  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllTasks);
  }

  if (printBtn) {
    printBtn.addEventListener('click', printChecklist);
  }
}

// handle checkbox state change
function handleCheckboxChange(checkbox) {
  // add visual feedback
  const taskItem = checkbox.closest('.task-item');
  if (taskItem) {
    taskItem.style.transform = 'scale(0.98)';
    setTimeout(() => {
      taskItem.style.transform = 'scale(1)';
    }, 150);
  }

  // update progress displays
  updateAllProgress();

  // save state to local storage
  saveState();

  const section = checkbox.closest('.checklist-section');
  if (section && isSectionComplete(section)) {
    celebrateCompletion(section);
  }
}

// update all progress indicator
function updateAllProgress() {
  updateOverallProgress();
  updateSectionProgress();
}

// update overall progress cards
function updateOverallProgress() {
  const allCheckboxes = document.querySelectorAll('.task-checkbox');
  const checkedCheckboxes = document.querySelectorAll('.task-checkbox:checked');

  const total = allCheckboxes.length;
  const completed = checkedCheckboxes.length;

  const remaining = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // update dom element 
  const completedCount = document.getElementById('completedCount');
  const remainingCount = document.getElementById('remainingCount');
  const progressPercent = document.getElementById('progressPercent');

  if (completedCount) {
    completedCount.textContent = completed;
  }

  if (remainingCount) {
    remainingCount.textContent = remaining
  }

  if (progressPercent) {
    progressPercent.textContent = percentage + '%';
  }
}

// update individual section progress
function updateSectionProgress() {
  const sections = document.querySelectorAll('.checklist-section');

  sections.forEach(section => {
    const checkboxes = section.querySelectorAll('.task-checkbox');
    const checkedCheckboxes = section.querySelectorAll('.task-checkbox:checked');

    const total = checkboxes.length;
    const completed = checkedCheckboxes.length;

    const progressElement = section.querySelector('.section-progress');
    if (progressElement) {
      progressElement.textContent = `${completed}/${total}`;

      // add complete class if all tasks are done
      if (completed === total && total > 0) {
        progressElement.classList.add('complete');
      } else {
        progressElement.classList.remove('complete');
      }
    }
  });
}

// check if a section is complete
function isSectionComplete(section) {
  const checkboxes = section.querySelectorAll('.task-checkbox');
  const checkedCheckboxes = section.querySelectorAll('.task-checkbox:checked');
  
  return checkboxes.length > 0 && checkboxes.length === checkedCheckboxes.length;
}

// celebrate section completion
function celebrateCompletion(section) {
  const sectionHeader = section.querySelector('.section-header');
  if (sectionHeader) {
    // add celebration animation
    sectionHeader.style.animation = 'none';
    setTimeout(() => {
      sectionHeader.style.animation = 'pulse 0.5s ease';
    }, 10);
  }
}

// save state to local storage
function saveState() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const state = {};
  
  checkboxes.forEach((checkbox, index) => {
    state[`task-${index}`] = checkbox.checked;
  });
  
  try {
    localStorage.setItem('transitionTrackerState', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// load state from local storage
function loadState() {
  try {
    const savedState = localStorage.getItem('transitionTrackerState');
    if (savedState) {
      const state = JSON.parse(savedState);
      const checkboxes = document.querySelectorAll('.task-checkbox');
      
      checkboxes.forEach((checkbox, index) => {
        const key = `task-${index}`;
        if (state[key] !== undefined) {
          checkbox.checked = state[key];
        }
      });
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
}

// reset all tasks
function resetAllTasks() {
  // confirm with user
  const confirmed = confirm('Are you sure you want to reset all tasks? This action cannot be undone.');
  
  if (!confirmed) {
    return;
  }
  
  // uncheck all checkboxes
  const checkboxes = document.querySelectorAll('.task-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // update all progress
  updateAllProgress();
  
  // clear localStorage
  try {
    localStorage.removeItem('transitionTrackerState');
  } catch (e) {
    console.error('Failed to clear state:', e);
  }
  
  // show feedback
  showNotification('All tasks have been reset');
}

// print checklist
function printChecklist() {
  window.print();
}

// show notification
function showNotification(message) {
  // create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #8B6F47;
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideDown 0.3s ease;
  `;
  
  // add to page
  document.body.appendChild(notification);
  
  // remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// add custom animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;
document.head.appendChild(style);