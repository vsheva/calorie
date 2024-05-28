class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    console.log(id);
    const index = this._meals.findIndex(meal => meal.id === id);

    if (index !== -1) {
      this._totalCalories -= this._meals[index].calories;
      const removed = this._meals.slice(index, index + 1);
      this._meals = this._meals.filter(meal => meal.name !== removed[0].name);
      this._render();
    }
  }

  removeWorkout(id) {
    console.log(id);
    const index = this._workouts.findIndex(workout => {
      //  console.log(id);// нет
      //   console.log(workout.id);
      return workout.id === id;
    });

    //console.log(index); //-1
    //console.log(this._workouts);
    if (index !== -1) {
      this._totalCalories += this._workouts[index].calories;
      const removed = this._workouts.slice(index, index + 1);
      console.log(removed);
      this._workouts = this._workouts.filter(workout => workout.name !== removed[0].name);
      this._render();
    }
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._render();
  }

  setLimit(limit) {
    this._calorieLimit = limit;
    this._displayCaloriesLimit();
    this._render();
  }

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById('calories-limit');
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumed = document.getElementById('calories-consumed');

    const consumed = this._meals.reduce((acc, meal) => acc + meal.calories, 0);
    caloriesConsumed.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');

    const burned = this._workouts.reduce((acc, workout) => acc + workout.calories, 0);
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const progressEl = document.getElementById('calorie-progress');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');

      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;

    const width = Math.min(percentage, 100);
    progressEl.style.width = width + '%';
  }

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.classList.add('card', 'my-2');
    mealEl.setAttribute('data-id', meal.id);

    mealEl.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                   ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
    `;
    mealsEl.appendChild(mealEl);
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);

    workoutEl.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                   ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
    `;
    workoutsEl.appendChild(workoutEl);
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = +calories;
  }
}

// const tracker = new CalorieTracker();

// const breakfast = new Meal('Breakfast', 400);
// tracker.addMeal(breakfast);
// const lunch = new Meal('Lunch', 350);
// tracker.addMeal(lunch);

// const run = new Workout('Fast Run', 320);
// tracker.addWorkout(run);

class App {
  constructor() {
    this._tracker = new CalorieTracker();
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
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }

  _removeItem(type, e) {
    if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
      if (confirm('Do you want to delete?')) {
        const id = e.target.closest('.card').getAttribute('data-id');

        console.log(id);

        // type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id);

        type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id);

        e.target.closest('.card').remove();
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    console.log(text);

    //!!
    document.querySelectorAll(`#${type}-items .card`).forEach(el => {
      const textName = el.firstElementChild.firstElementChild.textContent;
      console.log(textName);
      //!!
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

    let limit = +document.getElementById('limit').value; //! input is always string -----> we need number

    if (limit === '') {
      alert('Please set up a limit');
      return;
    }

    this._tracker.setLimit(limit);
    limit = '';

    const modalWindow = document.getElementById('limit-modal');
    const modal = bootstrap.Modal.getInstance(modalWindow);
    modal.hide();
  }
}

const app = new App();
