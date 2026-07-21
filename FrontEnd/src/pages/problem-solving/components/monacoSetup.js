// Bundled Monaco (npm, not CDN → no CSP issues), configured once. Exports the
// @monaco-editor/react <Editor> wired to the local instance with a locally
// bundled worker and only the languages Code Gym uses.
// monaco-editor's exports map rewrites `monaco-editor/<x>` → `esm/vs/<x>.js`.
import * as monaco from 'monaco-editor/editor/editor.api'
import editorWorker from 'monaco-editor/editor/editor.worker?worker'
import 'monaco-editor/languages/definitions/python/register'
import 'monaco-editor/languages/definitions/java/register'
import 'monaco-editor/languages/definitions/cpp/register' // registers c + cpp
import Editor, { loader } from '@monaco-editor/react'

self.MonacoEnvironment = { getWorker: () => new editorWorker() }
loader.config({ monaco })

export default Editor
