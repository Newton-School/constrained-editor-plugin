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
      finalBoundaryList.push([
        lastBoundaryDetails.startLineNumber,
        lastBoundaryDetails.startColumn,
        boundary.startLineNumber,
        boundary.startColumn,
      ]);
    }
    if (
      index === boundaryList.length - 1 &&
      (boundary.endLineNumber !== lastBoundaryDetails.endLineNumber ||
        boundary.endColumn !== lastBoundaryDetails.endColumn)
    ) {
      finalBoundaryList.push([
        boundary.endLineNumber,
        boundary.endColumn,
        lastBoundaryDetails.endLineNumber,
        lastBoundaryDetails.endColumn,
        ,
      ]);
    }
    lastBoundaryDetails.startLineNumber = boundary.endLineNumber;
    lastBoundaryDetails.startColumn = boundary.endColumn    ;
  });
  return finalBoundaryList;
};
