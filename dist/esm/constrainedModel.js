import{getEditorBoundaryExcludingBoundaryList}from"./utils/boundaryUtils.js";import deepClone from"./utils/deepClone.js";import enums from"./utils/enums.js";export const constrainedModel=function(e,n,t){const i=t.Range,r=function(e,n){const t=e.range,i=n.range;if(t[0]<i[0]||t[0]===i[0]&&t[3]<i[1])return-1};let o=deepClone(n).sort(r);const a=function(n){const t=e.getValue();n.forEach((function(e,n){const r=function(e,n){const t=n.split("\n"),i=t.length,r=[];return e.forEach((function(e,n){if(0===e)throw new Error("Range values cannot be zero");switch(n){case 0:if(e<0)throw new Error("Start Line of Range cannot be negative");if(e>i)throw new Error("Provided Start Line("+e+") is out of bounds. Max Lines in content is "+i);r[n]=e;break;case 1:{let i=e;const o=r[0],a=t[o-1].length;if(i<0){if(i=a-Math.abs(i),i<0)throw new Error("Provided Start Column("+e+") is out of bounds. Max Column in line "+o+" is "+a)}else if(i>a+1)throw new Error("Provided Start Column("+e+") is out of bounds. Max Column in line "+o+" is "+a);r[n]=i}break;case 2:{let t=e;if(t<0){if(t=i-Math.abs(e),t<0)throw new Error("Provided End Line("+e+") is out of bounds. Max Lines in content is "+i);t<r[0]&&console.warn("Provided End Line("+e+") is less than the start Line, the Restriction may not behave as expected")}else if(e>i)throw new Error("Provided End Line("+e+") is out of bounds. Max Lines in content is "+i);r[n]=t}break;case 3:{let i=e;const o=r[2],a=t[o-1].length;if(i<0){if(i=a-Math.abs(i),i<0)throw new Error("Provided End Column("+e+") is out of bounds. Max Column in line "+o+" is "+a)}else if(i>a+1)throw new Error("Provided Start Column("+e+") is out of bounds. Max Column in line "+o+" is "+a);r[n]=i}}})),r}(e.range,t),o=r[0],a=r[1],s=r[2],l=r[3];e._originalRange=r.slice(),e.range=new i(o,a,s,l),e.index=n,e.allowMultiline||(e.allowMultiline=i.spansMultipleLines(e.range)),e.label||(e.label=`[${o},${a} -> ${s}${l}]`)}))},s=function(){return o.reduce((function(e,n){return e[n.label]={allowMultiline:n.allowMultiline||!1,index:n.index,range:Object.assign({},n.range),originalRange:n._originalRange.slice()},e}),{})},l=function(){return Promise.resolve().then((function(){e.editInRestrictedArea=!0,e.undo(),e.editInRestrictedArea=!1,e._hasHighlight&&e._oldDecorationsSource&&(e.deltaDecorations(e._oldDecorations,e._oldDecorationsSource),e._oldDecorationsSource.forEach((function(n){n.range=e.getDecorationRange(n.id)})))}))},u=function(n,t,i,r,a,s){let l=t.endLineNumber,u=t.endColumn;n.prevRange=t,n.range=t.setEndPosition(i,r);const d=o.length;let c=a.length;const g=r-u,f=i-l,m=e._currentCursorPositions||[],b=m.length;if(c!==b&&(a=a.filter((function(e){const n=e.range;for(let e=0;e<b;e++){const t=m[e];if(n.startLineNumber===t.startLineNumber&&n.endLineNumber===t.endLineNumber&&n.startColumn===t.startColumn&&n.endColumn===t.endColumn)return!0}return!1})),c=a.length),0!==f){for(let e=n.index+1;e<d;e++){const n=o[e],t=n.range;l===t.startLineNumber&&(t.startColumn+=g),l===t.endLineNumber&&(t.endColumn+=g),t.startLineNumber+=f,t.endLineNumber+=f,n.range=t}for(let e=s+1;e<c;e++){const n=a[e],t=n.range,i=t.toString(),r=rangeMap[i];delete rangeMap[i],l===t.startLineNumber&&(t.startColumn+=g),l===t.endLineNumber&&(t.endColumn+=g),t.startLineNumber+=f,t.endLineNumber+=f,n.range=t,rangeMap[t.toString()]=r}}else{for(let e=n.index+1;e<d;e++){const n=o[e],t=n.range;if(t.startLineNumber>l)break;t.startColumn+=g,t.endColumn+=g,n.range=t}for(let e=s+1;e<c;e++){const n=a[e],t=n.range,i=t.toString(),r=rangeMap[i];if(delete rangeMap[i],t.startLineNumber>l){rangeMap[t.toString()]=r;break}t.startColumn+=g,t.endColumn+=g,n.range=t,rangeMap[t.toString()]=r}}},d=function(){console.debug("handler for unhandled promise rejection")},c=function(e){for(let n in e){const t=e[n];t.range=t.prevRange}},g=function(e,n){return!e.allowMultiline&&n.includes("\n")},f=function(e,n,t){return e.validate&&!e.validate(n,t,e.lastInfo)},m={_isRestrictedModel:!0,_isRestrictedValueValid:!0,_editableRangeChangeListener:[],_isCursorAtCheckPoint:function(n){n.some((function(n){const t=n.lineNumber,i=n.column,r=o.length;for(let n=0;n<r;n++){const r=o[n].range;if(r.startLineNumber===t&&r.startColumn===i||r.endLineNumber===t&&r.endColumn===i)return e.pushStackElement(),!0}}))},_currentCursorPositions:[]};a(o),e._hasHighlight=!1,m._restrictionChangeListener=e.onDidChangeContent((function(n){const t=n.isUndoing;if(e._isRestrictedValueValid=!0,t&&e.editInRestrictedArea)e.editInRestrictedArea&&(e._isRestrictedValueValid=!1);else{const t=n.changes.sort(r),i={},a=o.length;if(t.every((function(e){const n=e.range,t=n.toString();i[t]=null;for(let r=0;r<a;r++){const a=o[r];if(a.range.containsRange(n))return!g(a,e.text)&&(i[t]=a,!0)}return!1}))){t.forEach((function(e,n){const r=e.range,o=i[r.toString()],a=o.range,s=e.text||"",l=(s.match(/\n/g)||[]).length,d=s.split(/\n/g).pop().length,c=r.endLineNumber-r.startLineNumber,g=r.endColumn-r.startColumn;let f=a.endLineNumber,m=a.endColumn,b=0;a.endLineNumber!==r.startLineNumber&&a.endLineNumber!==r.endLineNumber||(b+=a.endColumn-r.startColumn+1);const h=function(e,n){const t={},i=e.range;return""===e.text?t.isDeletion=!0:i.startLineNumber===i.endLineNumber&&i.startColumn===i.endColumn?t.isAddition=!0:t.isReplacement=!0,t.startLineOfRange=i.startLineNumber===n.startLineNumber,t.startColumnOfRange=i.startColumn===n.startColumn,t.endLineOfRange=i.endLineNumber===n.endLineNumber,t.endColumnOfRange=i.endColumn===n.endColumn,t.middleLineOfRange=!t.startLineOfRange&&!t.endLineOfRange,n.startLineNumber===n.endLineNumber?t.rangeIsSingleLine=!0:t.rangeIsMultiLine=!0,t}(e,a);o.lastInfo=h,(h.isAddition||h.isReplacement)&&(h.rangeIsSingleLine&&(0===l?m+=d:(f+=l,h.startColumnOfRange?m+=d:m=h.endColumnOfRange?d+1:d+b)),h.rangeIsMultiLine&&(f+=l,h.endLineOfRange&&(0===l?m+=d:m=b+d))),(h.isDeletion||h.isReplacement)&&(h.rangeIsSingleLine&&(m-=g),h.rangeIsMultiLine&&(h.endLineOfRange?(f-=c,m-=g):f-=c)),u(o,a,f,m,t,n)}));const n=e.getValueInEditableRanges(),r={};for(let e in i){const t=i[e],o=t.range,a=t.label||o.toString(),s=n[a];if(f(t,s,o))return c(i),void l();r[a]=s}e._hasHighlight&&e._oldDecorationsSource.forEach((function(n){n.range=e.getDecorationRange(n.id)})),function(n,t){const i=s();e._editableRangeChangeListener.forEach((function(r){r.call(e,n,t,i)}))}(r,n)}else l()}})),window.onerror=d;const b={editInRestrictedArea:!1,getCurrentEditableRanges:s,getValueInEditableRanges:function(){return o.reduce((function(n,t){return n[t.label]=e.getValueInRange(t.range),n}),{})},disposeRestrictions:function(){return e._restrictionChangeListener.dispose(),window.removeEventListener("error",d),delete e.editInRestrictedArea,delete e.disposeRestrictions,delete e.getValueInEditableRanges,delete e.updateValueInEditableRanges,delete e.updateRestrictions,delete e.getCurrentEditableRanges,delete e.toggleHighlightOfEditableAreas,delete e._hasHighlight,delete e._isRestrictedModel,delete e._isCursorAtCheckPoint,delete e._currentCursorPositions,delete e._editableRangeChangeListener,delete e._restrictionChangeListener,delete e._oldDecorations,delete e._oldDecorationsSource,e},onDidChangeContentInEditableRange:function(n){"function"==typeof n&&e._editableRangeChangeListener.push(n)},offDidChangeContentInEditableRange:function(n){if("function"==typeof n){const t=e._editableRangeChangeListener.indexOf(n);-1!==t&&e._editableRangeChangeListener.splice(t,1)}},updateRestrictions:function(e){o=deepClone(e).sort(r),a(o)},updateValueInEditableRanges:function(n,t){if("object"!=typeof n||Array.isArray(n))throw new Error("Value must be an object");{t="boolean"==typeof t&&t;const i=o.reduce((function(e,n){return n.label&&(e[n.label]=n),e}),{});for(let r in n){const o=i[r];if(o){const i=n[r];if(g(o,i))throw new Error("Multiline change is not allowed for "+r);const a=deepClone(o.range);if(a.endLine=a.startLine+i.split("\n").length-1,a.endColumn=i.split("\n").pop().length,f(o,i,a))throw new Error("Change is invalidated by validate function of "+r);e.applyEdits([{forceMoveMarkers:!!t,range:o.range,text:i}])}else console.error("No restriction found for "+r)}}},toggleHighlightOfEditableAreas:function(n){if(e._hasHighlight)e.deltaDecorations(e._oldDecorations,[]),delete e._oldDecorations,delete e._oldDecorationsSource,e._hasHighlight=!1;else{const i=n.cssClassForSingleLine||enums.SINGLE_LINE_HIGHLIGHT_CLASS,r=n.cssClassForMultiLine||enums.MULTI_LINE_HIGHLIGHT_CLASS,a=n.cssClassForRestrictedArea||enums.RESTRICTED_AREA_HIGHLIGHT_CLASS,s=o.map((function(e){const n={range:e.range,options:{className:e.allowMultiline?r:i,allowMultiline:!1}};return e.label&&(n.hoverMessage=e.label),n}));getEditorBoundaryExcludingBoundaryList(e.getFullModelRange(),o.map((e=>e.range)),e.getValue()).forEach((e=>{s.push({range:e,options:{className:a,stickiness:t.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges},lable:"Cannot Change this Section"})})),e._oldDecorations=e.deltaDecorations([],s),e._oldDecorationsSource=s.map((function(n,t){return Object.assign({},n,{id:e._oldDecorations[t]})})),e._hasHighlight=!0}}};for(let n in m)Object.defineProperty(e,n,{enumerable:!1,configurable:!0,writable:!0,value:m[n]});for(let n in b)Object.defineProperty(e,n,{enumerable:!1,configurable:!0,writable:!0,value:b[n]});return e};export default constrainedModel;