const ascendingOrder = async (array) => {
  const sorted = await array.sort(function (x, y) {
    return x.startOffset - y.startOffset;
  });
  const sortedWithIds = await addIds(sorted);
  return sortedWithIds;
};

const addIds = (array) => {
  let index = 0;
  array.forEach((element) => {
    element.id = index;
    index++;
  });
  return array;
};

export const highlightRework = async (arr) => {
  let array = await ascendingOrder(arr);

  for (let i = 0; i < array.length + 1; i++) {
    if (!array[i + 1]) {
      break;
    }
    if (array[i].endOffset <= array[i + 1].startOffset) {
      console.log("We Chillin");
    } else if (
      array[i].priority > array[i + 1].priority &&
      array[i + 1].endOffset > array[i].endOffset
    ) {
      array[i + 1].startOffset = array[i].endOffset;
    } else if (
      array[i].priority > array[i + 1].priority &&
      array[i + 1].endOffset <= array[i].endOffset
    ) {
      array.splice(i + 1, 1);
    } else if (
      array[i].priority < array[i + 1].priority &&
      array[i].endOffset <= array[i + 1].endOffset
    ) {
      array[i].endOffset = array[i + 1].startOffset;
    } else if (
      array[i].priority < array[i + 1].priority &&
      array[i].endOffset >= array[i + 1].endOffset &&
      array[i + 2]
    ) {
      const newHighlightOffSet = array[i].endOffset;
      array[i].endOffset = array[i + 1].startOffset;

      const newHighlight = {
        startOffset: array[i + 1].endOffset,
        endOffset: newHighlightOffSet,
        color: array[i].color,
        priority: array[i].priority,
      };

      array.splice(i + 2, 0, newHighlight);
    }
  }
  return array;
};

export const styledText = (string, highlights) => {
  let reconstructedString = "";
  let index = 0;
  let endString = "";
  if (highlights[highlights.length - 1].endOffset < string.length) {
    endString = string.slice(highlights[highlights.length - 1].endOffset);
  }
  for (let i = 0; i < highlights.length; i++) {
    let normalString = "";
    let highlightString = "";

    if (highlights[i].startOffset > 1) {
      normalString = string.slice(index, highlights[i].startOffset);
      highlightString = string.slice(
        highlights[i].startOffset,
        highlights[i].endOffset
      );
      index = highlights[i].endOffset;

      reconstructedString +=
        normalString + addColorWithSpan(highlights[i].color, highlightString);
    } else if (highlights[i].startOffset === 1) {
      normalString = string.slice(0, 1);
      index = highlights[i].endOffset;
      highlightString = string.slice(
        highlights[i].startOffset,
        highlights[i].endOffset
      );

      reconstructedString +=
        normalString + addColorWithSpan(highlights[i].color, highlightString);
    } else if (highlights[i].startOffset === 0) {
      highlightString = string.slice(
        highlights[i].startOffset,
        highlights[i].endOffset
      );
      index = highlights[i].endOffset;
      normalString = string.slice(index, highlights[i].startOffset);

      reconstructedString +=
        addColorWithSpan(highlights[i].color, highlightString) + normalString;
    }
  }
  if (endString) {
    reconstructedString += endString;
    return reconstructedString;
  }

  return reconstructedString;
};

const addColorWithSpan = (color, text) => {
  return `<span ` + `style="background:` + color + `;">` + text + `</span>`;
};
