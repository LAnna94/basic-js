const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error (`'arr' parameter must be an instance of the Array!`);
  }

  let value = arr.find(item => {
    if(typeof item === 'string') {
      return item;
    }
    })

    if(value === undefined) {
      return arr;
    }

  let newArr = [];

  arr.forEach(item => {
    if (typeof item === 'number') {
      newArr.push(item)
    }

    if (item === '--double-next' && arr.indexOf(item) !== arr.length - 1) {
      newArr.push(arr[arr.indexOf(item)+1])
    } else if (item === '--double-prev' && arr.indexOf(item) !== 0) {
      newArr.push(arr[arr.indexOf(item)-1])
    } else if (item === '--discard-next') {
      newArr.splice(arr.indexOf(item), 1)
    } else if (item === '--discard-prev') {
      newArr.splice(arr.indexOf(item) - 1, 1)
    }   
  })

  return newArr;
}

module.exports = {
  transform
};
