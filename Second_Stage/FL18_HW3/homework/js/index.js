'use strict';

/**
 * Class
 * @constructor
 * @param size - size of pizza
 * @param type - type of pizza
 * @throws {PizzaException} - in case of improper use
 */
class Pizza {
  constructor(size, type) {
    if (!size || !type) {
      throw new PizzaException().log.ONE_ARGUMENT_ERROR;
    } else if (!allowedSizes.includes(size)) {
      throw new PizzaException().log.SIZE_ERROR;
    } else if (!allowedTypes.includes(type)) {
      throw new PizzaException().log.TYPE_ERROR;
    }

    this.SIZE = size;
    this.TYPE = type;
    this.EXTRA_INGREDIENTS = [];
    this._price = 0;
  }

  getPrice() {
    switch (this.SIZE) {
      case 'S':
        this._price += 50;
        break;
      case 'M':
        this._price += 75;
        break;
      case 'L':
        this._price += 100;
        break;
      default:
        throw new PizzaException().log.SIZE_ERROR;
    }

    switch (this.TYPE) {
      case 'VEGGIE':
        this._price += 50;
        break;
      case 'MARGHERITA':
        this._price += 75;
        break;
      case 'PEPPERONI':
        this._price += 100;
        break;
      default:
        throw new PizzaException().log.TYPE_ERROR;
    }

    for (let ingredient of this.EXTRA_INGREDIENTS) {
      if (ingredient === 'TOMATOES') {
        this._price += 5;
      } else if (ingredient === 'CHEESE') {
        this._price += 7;
      } else if (ingredient === 'MEAT') {
        this._price += 9;
      }
    }

    return this._price;
  }

  addExtraIngredient(...ingredient) {
    if (!allowedExtraIngredients.includes(...ingredient)) {
      throw new PizzaException().log.INGREDIENT_ERROR;
    } else if (ingredient.length > 1) {
      throw new PizzaException().log.INGREDIENT_AMOUNT_ERROR;
    } else if (this.EXTRA_INGREDIENTS.includes(...ingredient)) {
      throw new PizzaException().log.INGREDIENT_DUPLICATE_ERROR;
    } else if (this.TYPE === Pizza.TYPE_VEGGIE && ingredient[0] === Pizza.EXTRA_MEAT) {
      throw new PizzaException().log.INGREDIENT_INCOMPATIBILITY_ERROR;
    }


    this.EXTRA_INGREDIENTS.push(...ingredient);
  }

  getSize() {
    return this.SIZE;
  }

  removeExtraIngredient(ingredient) {
    this.EXTRA_INGREDIENTS = this.EXTRA_INGREDIENTS.filter(ingredientItem => ingredientItem !== ingredient);
  }

  getExtraIngredients() {
    return this.EXTRA_INGREDIENTS;
  }

  getPizzaInfo() {
    console.log(`Size: ${this.SIZE}, type: ${this.TYPE}; extra ingredients: ${this.getExtraIngredients().length
      ? this.getExtraIngredients().toString()
      : 'none'}; price: ${this.getPrice()} UAH`);
  }
}

class PizzaException extends Error {
  constructor(message) {
    super(message);
    this.log = {
      TYPE_ERROR: 'Invalid type',
      SIZE_ERROR: 'Invalid size',
      ONE_ARGUMENT_ERROR: 'Required two arguments, given: 1',
      INGREDIENT_ERROR: 'Invalid ingredient',
      INGREDIENT_AMOUNT_ERROR: 'Required two arguments, given: 1',
      INGREDIENT_DUPLICATE_ERROR: 'Duplicate ingredient',
      INGREDIENT_INCOMPATIBILITY_ERROR: 'Invalid ingredient (cannot add meat to vegan pizza)'
    }
  }
}

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = 'S';
Pizza.SIZE_M = 'M';
Pizza.SIZE_L = 'L';

Pizza.TYPE_VEGGIE = 'VEGGIE';
Pizza.TYPE_MARGHERITA = 'MARGHERITA';
Pizza.TYPE_PEPPERONI = 'PEPPERONI';

Pizza.EXTRA_TOMATOES = 'TOMATOES';
Pizza.EXTRA_CHEESE = 'CHEESE';
Pizza.EXTRA_MEAT = 'MEAT';

/* Allowed properties */
const allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
const allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];
const allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT];

/**
 * Provides information about an error while working with a pizza.
 * details are stored in the log property.
 * @constructor
 */

/* It should work */
// // small pizza, type: veggie
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// // add extra meat
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// // check price
// console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// // check price
// console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// // check pizza size
// console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// // remove extra ingredient
// pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
// console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
// console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

// examples of errors
// let pizza = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Invalid ingredient