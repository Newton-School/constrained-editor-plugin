export const getEditorBoundaryExcludingBoundaryList = (
  editorBoundary,
  boundaryList,
  content,
) => {
  const finalBoundaryList = [];
  const lastBoundaryDetails = editorBoundary;
  const contentValue = content.split('\n');
  boundaryList.forEach((boundary, index) => {
    if (
      boundary.startLineNumber > lastBoundaryDetails.startLineNumber ||
      (boundary.startLineNumber === lastBoundaryDetails.startLineNumber &&
        boundary.startColumn > lastBoundaryDetails.startColumn)
    ) {
      let newEndRow = boundary.startLineNumber;
      let newEndColumn = boundary.startColumn - 1;

      if (boundary.startColumn === 1) {
        newEndRow = boundary.startLineNumber - 1;
        newEndColumn =
          (contentValue[boundary.startLineNumber - 2]?.length || 0) + 1;
      }
      finalBoundaryList.push({
        startLineNumber: lastBoundaryDetails.startLineNumber,
        startColumn: lastBoundaryDetails.startColumn,
        endLineNumber: newEndRow,
        endColumn: newEndColumn,
      });
    }
    let newStartRow = boundary.endLineNumber;
    let newStartColumn = boundary.endColumn;

    if (contentValue[newStartRow - 2]?.length === 0) {
      newStartRow = boundary.startLineNumber + 1;
      newStartColumn = (contentValue[newStartRow - 1]?.length || 0) + 1;
    }
    lastBoundaryDetails.startLineNumber = newStartRow;
    lastBoundaryDetails.startColumn = newStartColumn;

    if (
      index === boundaryList.length - 1 &&
      (boundary.endLineNumber !== lastBoundaryDetails.endLineNumber ||
        boundary.endColumn !== lastBoundaryDetails.endColumn)
    ) {
      finalBoundaryList.push({
        startLineNumber: lastBoundaryDetails.startLineNumber,
        startColumn: lastBoundaryDetails.startColumn,
        endLineNumber: lastBoundaryDetails.endLineNumber,
        endColumn: lastBoundaryDetails.endColumn,
      });
    }
  });
  return finalBoundaryList;
};
