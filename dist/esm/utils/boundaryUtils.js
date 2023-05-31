export const getEditorBoundaryExcludingBoundaryList = (
  editorBoundary,
  boundaryList
) => {
  const finalBoundaryList = [];
  const lastBoundaryDetails = editorBoundary;
  boundaryList.forEach((boundary, index) => {
    if (
      boundary[0] > lastBoundaryDetails[0] ||
      (boundary[0] === lastBoundaryDetails[0] &&
        boundary[1] > lastBoundaryDetails[1])
    ) {
      finalBoundaryList.push([
        lastBoundaryDetails[0],
        lastBoundaryDetails[1],
        boundary[0],
        boundary[1],
      ]);
    }
    if (
      index === boundaryList.length - 1 &&
      (boundary[2] !== lastBoundaryDetails[2] ||
        boundary[3] !== lastBoundaryDetails[3])
    ) {
      finalBoundaryList.push([
        boundary[2],
        boundary[3],
        lastBoundaryDetails[2],
        lastBoundaryDetails[3],
      ]);
    }
    lastBoundaryDetails[0] = boundary[2];
    lastBoundaryDetails[1] = boundary[3];
  });
  return finalBoundaryList;
};
