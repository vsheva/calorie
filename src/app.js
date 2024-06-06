import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item.js';
import './css/bootstrap.css';
import './css/style.css';

class App {
  constructor() {
    this._tracker = new CalorieTracker(); //! new class  call (create)
    this._loadEventListeners();
    this._tracker.loadItems(); //[]
  }

  _loadEventListeners() {
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));

    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));

    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));

    document
      .getElementById('filter-meals')
      .addEventListener('input', this._filterItems.bind(this, 'meal'));

    document
      .getElementById('filter-workouts')
      .addEventListener('input', this._filterItems.bind(this, 'workout'));

    document.getElementById('reset').addEventListener('click', this._reset.bind(this));

    document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === '' || calories.value === '') {
      alert('Fill in ALL fields');
      return;
    }

    if (type === 'meal') {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    }

    name.value = '';
    calories.value = '';

    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new Collapse(collapseItem, {
      toggle: true,
    });
  }

  _removeItem(type, e) {
    if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
      if (confirm('Do you want to delete?')) {
        const id = e.target.closest('.card').getAttribute('data-id');

        type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id);

        e.target.closest('.card').remove();
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();

    //!
    document.querySelectorAll(`#${type}-items .card`).forEach(el => {
      const textName = el.firstElementChild.firstElementChild.textContent;
      console.log(textName);
      //!
      if (textName.toLowerCase().indexOf(text) !== -1) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  }

  _reset() {
    this._tracker.reset();

    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';
    document.getElementById('filter-meals').value = '';
    document.getElementById('filter-workouts').value = '';
  }

  _setLimit(e) {
    e.preventDefault();

    let limit = +document.getElementById('limit').value; //! input string --> number

    if (limit === '') {
      alert('Please set up a limit');
      return;
    }

    this._tracker.setLimit(limit);
    limit = '';

    const modalWindow = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalWindow);
    modal.hide();
  }
}

const app = new App();
