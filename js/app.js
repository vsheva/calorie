class CalorieTracker {
    constructor() {
        this._calorieLimit = 3000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
    }

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories+=meal.calories;
    }

    addWorkout(workouts) {
        this._workouts.push(workouts);
        this._totalCalories+=workouts.calories;
    }
}


class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name=name;
        this.calories= calories;
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name=name;
        this.calories= calories;
    }
}

const tracker = newCaloriesTracker()