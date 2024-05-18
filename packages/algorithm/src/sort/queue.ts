import { isEven, isUndefined, swap } from "@src/utils";

/**
 * @description 获取父级下标
 */
const getParentIndex = (index: number) => {
  return Math.floor((index - 1) / 2);
};

/**
 * @description 获取左子节点下标
 */
const getLeftIndex = (index: number) => {
  return 2 * index + 1;
};



/**
 * @description 获取当前兄弟节点最大下标
 */
const getMaxSiblingIndex = (queue: number[], index: number,len=queue.length) => {
  if (isEven(index)) {
    const leftIndex = index - 1;
    const rightIndex = index;
    return queue[leftIndex] > queue[rightIndex] ? leftIndex : rightIndex;
  } else if(index+1>=len || isUndefined(queue[index + 1])) {
    return index;
  } else {
    const leftIndex = index;
    const rightIndex = index + 1;
    return queue[leftIndex] > queue[rightIndex] ? leftIndex : rightIndex;
  }
};


/**
 * @description 对优先队列进行从下而上有序化
 */
const swim = (queue: number[]) => {
  let currentIndex = queue.length - 1;
  let parentIndex = getParentIndex(currentIndex);

  while (parentIndex >= 0 && queue[parentIndex] < queue[currentIndex]) {

    swap(queue, currentIndex, parentIndex);

    currentIndex = parentIndex
    parentIndex = getParentIndex(currentIndex);
  }

};

/**
 * @description 对优先队列进行从上而下有序化
 */
export const sink = (queue: number[],currentIndex=0,len=queue.length) => {
  
  let leftIndex = getLeftIndex(currentIndex);

  while (currentIndex < len && leftIndex < len) {
    const maxSiblingIndex = getMaxSiblingIndex(queue, leftIndex,len);
    if (maxSiblingIndex <len && queue[maxSiblingIndex] > queue[currentIndex]) {
      swap(queue, currentIndex, maxSiblingIndex);
      currentIndex = maxSiblingIndex;
    } else  {
      break;
    }

    leftIndex = getLeftIndex(currentIndex);
  }
};

/**
 * @description 优先队列
 */
export const priorityQueue = (arr: number[]): PriorityQueueObject => {
  const queue = arr;

  const insert = (val: number) => {
    queue.push(val);
    swim(queue);
  };

  const delMax = () => {
    const lastItem = queue.pop();
    if (isUndefined(lastItem)) return;
    if(queue.length === 0) return;
    queue[0] = lastItem as number;
    sink(queue);
  };

  return {
    insert,
    delMax,
  };
};