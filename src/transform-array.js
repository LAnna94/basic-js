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

  let newArr = [];
  let skipElement = false;

  arr.forEach((item, index) => {
    if(skipElement) {
      skipElement = false;
      return
    }

    switch(item) {
      case '--discard-next':
        if (index < arr.length - 1) {
          skipElement = true;
        }
      break;

      case '--discard-prev':
        if (index > 0 && newArr.length > 0 && arr[index - 2] !== '--discard-next') {
          newArr.pop()
        }
      break;

      case '--double-next':
        if (index < arr.length - 1) {
          newArr.push(arr[index + 1])
        }
      break;

      case '--double-prev':
        if (index > 0 && arr[index - 2] !== '--discard-next') {
          newArr.push(arr[index - 1])
        }
      break;

      default: 
        newArr.push(item)
    }
  })

  return newArr;
}

module.exports = {
  transform
};
