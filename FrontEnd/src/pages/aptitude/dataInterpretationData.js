// Data Interpretation lessons — kept in the FRONTEND (not the DB) because DI is
// inherently visual: a real chart/table/venn has to be RENDERED, not stored as
// text. Each topic is an exam-grade lesson: concept → how to read → speed tricks
// → traps → every question type → a worked example → 4 practice sheets
// (Easy → Hard) whose charts stay pinned on screen while the questions scroll.
//
// Each topic lives in its own module under ./di/ (one file per chart type) so
// content can grow without limit. Lesson shape (see any di/*.js):
//   intro, howToRead[{step,detail}], speedTips[], traps[],
//   questionTypes[{name,how}], visual{note, charts:[chart, chart2?]},
//   worked{question, steps:[{action,why}], answer},
//   sheets[{title, difficulty, note, charts:[…], questions:[{question,answer,solution}]}]
// `chart` descriptors are consumed by <DIChart/> in AptitudeCharts.jsx.

import barGraphs from './di/bar-graphs'
import lineGraphs from './di/line-graphs'
import pieCharts from './di/pie-charts'
import tables from './di/tables'
import caselets from './di/caselets'
import tabularDi from './di/tabular-di'
import graphicalDi from './di/graphical-di'
import mixedDi from './di/mixed-data-interpretation'
import vennDi from './di/venn-diagram-di'

export const DI_LESSONS = {
  'bar-graphs': barGraphs,
  'line-graphs': lineGraphs,
  'pie-charts': pieCharts,
  'tables': tables,
  'caselets': caselets,
  'tabular-di': tabularDi,
  'graphical-di': graphicalDi,
  'mixed-data-interpretation': mixedDi,
  'venn-diagram-di': vennDi,
}

export function hasDILesson(topicId) {
  return !!DI_LESSONS[topicId]
}
