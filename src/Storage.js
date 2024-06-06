class Storage {
  //calorie limit
  static getCalorieLimit(defaultCalorieLimit = 2000) {
    let calorieLimit;

    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = defaultCalorieLimit;
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit');
    }
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }

  // total calories
  static getTotalCalories(defaultTotalCalories = 0) {
    let totalCalories;

    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = defaultTotalCalories;
    } else {
      totalCalories = +localStorage.getItem('totalCalories');
    }
    return totalCalories;
  }

  static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }

  //meals []
  static getMeals() {
    let meals;

    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals')); //parse in Array
    }
    return meals;
  }

  static saveMeal(meal) {
    //const meals = this.getMeals.bind.this(); //!
    const meals = Storage.getMeals(); //!
    console.log(meals);
    meals.push(meal); //!
    localStorage.setItem('meals', JSON.stringify(meals)); //!
  }

  //!
  static removeMeal(id) {
    let meals = Storage.getMeals();

    meals = meals.filter(meal => meal.id !== id);
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  //workouts []
  static getWorkouts() {
    let workouts;

    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    return workouts;
  }

  static saveWorkout(workout) {
    let workouts = Storage.getWorkouts(); //[]
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    let workouts = Storage.getWorkouts();

    workouts = workouts.filter(workout => workout.id !== id);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.removeItem('totalCalories');
    localStorage.removeItem('meals');
    localStorage.removeItem('workouts');
    //localStorage.clear();
  }
}

export default Storage;
