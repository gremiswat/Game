const draggables = document.querySelectorAll('.item');
const dropzones = document.querySelectorAll('.dropzone');
const pointCounter = document.querySelector('#pointcounter');
const errCounter = document.querySelector('#errcounter');

draggables.forEach(draggable => {
draggable.addEventListener('dragstart', () => {
  draggable.classList.add('dragging');
});

draggable.addEventListener('dragend', () => {
  draggable.classList.remove('dragging');
});
});

// Store the correct answers in an object
const correctAnswers = {
'dropzone-1': 'CD Room',
'dropzone-2': 'Protsessor',
'dropzone-3': 'HDD',
'dropzone-4': 'Toiteplok',
'dropzone-5': 'Videokaart',
'dropzone-6': 'Kuller',
'dropzone-7': 'Malupulk',
'dropzone-8': 'Audiokaart',
'dropzone-9': 'Emaplaat',
};

let wrongDrops = 0;
let rightDrops = 0;

dropzones.forEach(dropzone => {
dropzone.addEventListener('dragover', event => {
  event.preventDefault();
  dropzone.classList.add('hovered');
});
dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('hovered');
});
dropzone.addEventListener('drop', event => {
  event.preventDefault();
  const draggable = document.querySelector('.dragging');
  const droppedOn = event.target;
  // Check if the dropped item matches the correct answer
  if (correctAnswers[droppedOn.id] === draggable.innerText) {
    rightDrops++;
    draggable.classList.add('correct');
    draggable.setAttribute('draggable', 'false');
  } else {
    wrongDrops++;
  }
  pointCounter.textContent = `${rightDrops}`;
  errCounter.textContent = `${wrongDrops}`;
  score.textContent = `= ${rightDrops/wrongDrops}`;
  droppedOn.appendChild(draggable);
  dropzone.classList.remove('hovered');
});
});

function getDragAfterElement(dropzone, y) {
const draggableElements = [...dropzone.querySelectorAll('.item:not(.dragging)')];
return draggableElements.reduce(
  (closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return {
        offset: offset,
        element: child
      };
    } else {
      return closest;
    }
  }, {
    offset: Number.NEGATIVE_INFINITY
  }
).element;
}