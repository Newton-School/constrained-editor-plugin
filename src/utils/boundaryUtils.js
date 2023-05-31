export const getEditorBoundaryExcludingBoundaryList = (
  editorBoundary,
  boundaryList
) => {
  const finalBoundaryList = [];
  const lastBoundaryDetails = editorBoundary;
  boundaryList.forEach((boundary, index) => {
    if (
      boundary.startLineNumber > lastBoundaryDetails.startLineNumber ||
      (boundary.startLineNumber === lastBoundaryDetails.startLineNumber &&
        boundary.startColumn > lastBoundaryDetails.startColumn)
    ) {
      finalBoundaryList.push({
        startLineNumber: lastBoundaryDetails.startLineNumber,
        startColumn: lastBoundaryDetails.startColumn,
        endLineNumber: boundary.startLineNumber,
        endColumn: boundary.startColumn,
      });
    }
    if (
      index === boundaryList.length - 1 &&
      (boundary.endLineNumber !== lastBoundaryDetails.endLineNumber ||
        boundary.endColumn !== lastBoundaryDetails.endColumn)
    ) {
      finalBoundaryList.push({
        startLineNumber: boundary.endLineNumber,
        startColumn: boundary.endColumn,
        endLineNumber: lastBoundaryDetails.endLineNumber,
        endColumn: lastBoundaryDetails.endColumn,
      });
    }
    lastBoundaryDetails.startLineNumber = boundary.endLineNumber;
    lastBoundaryDetails.startColumn = boundary.endColumn;
  });
  return finalBoundaryList;
};
