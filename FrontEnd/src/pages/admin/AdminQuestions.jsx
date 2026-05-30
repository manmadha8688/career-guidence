import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, ChevronRight, X, Check } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminSubjects, getAdminConcepts, getConceptQuestions, createQuestion, updateQuestion, deleteQuestion } from '../../api/api'
import toast from 'react-hot-toast'

const DIFFICULTY = ['EASY', 'MEDIUM', 'HARD']
const LETTERS = ['A', 'B', 'C', 'D']

const emptyForm = () => ({
  text: '', options: ['', '', '', ''], correctIndex: 0, explanation: '', difficulty: 'MEDIUM'
})

export default function AdminQuestions() {
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [concepts, setConcepts] = useState([])
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [questions, setQuestions] = useState([])
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAdminSubjects().then(r => setSubjects(r.data)).catch(() => toast.error('Failed to load subjects'))
  }, [])

  const selectSubject = (s) => {
    setSelectedSubject(s)
    setSelectedConcept(null)
    setQuestions([])
    getAdminConcepts(s.id).then(r => setConcepts(r.data)).catch(() => toast.error('Failed to load concepts'))
  }

  const selectConcept = (c) => {
    setSelectedConcept(c)
    loadQuestions(c.id)
  }

  const loadQuestions = (conceptId) => {
    getConceptQuestions(conceptId).then(r => setQuestions(r.data)).catch(() => toast.error('Failed to load questions'))
  }

  const openAdd = () => {
    setForm(emptyForm())
    setEditId(null)
    setModal('add')
  }

  const openEdit = (q) => {
    setForm({ text: q.text, options: [...q.options], correctIndex: q.correctIndex, explanation: q.explanation || '', difficulty: q.difficulty || 'MEDIUM' })
    setEditId(q.id)
    setModal('edit')
  }

  const handleSave = async () => {
    if (!form.text.trim()) return toast.error('Question text required')
    if (form.options.some(o => !o.trim())) return toast.error('All 4 options required')
    if (!form.explanation.trim()) return toast.error('Explanation required')
    setSaving(true)
    try {
      const payload = {
        conceptId: selectedConcept.id,
        subjectId: selectedConcept.subjectId || selectedSubject?.id,
        text: form.text,
        options: form.options,
        correctIndex: form.correctIndex,
        explanation: form.explanation,
        difficulty: form.difficulty
      }
      if (modal === 'add') {
        await createQuestion(payload)
        toast.success('Question added')
      } else {
        await updateQuestion(editId, payload)
        toast.success('Question updated')
      }
      setModal(null)
      loadQuestions(selectedConcept.id)
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this question?')) return
    try {
      await deleteQuestion(id)
      toast.success('Deleted')
      setQuestions(prev => prev.filter(q => q.id !== id))
    } catch { toast.error('Failed to delete') }
  }

  const setOption = (i, val) => setForm(f => { const opts = [...f.options]; opts[i] = val; return { ...f, options: opts } })

  return (
    <AppLayout title="Question Bank">
      <div style={{ display: 'grid', gridTemplateColumns: '220px 220px 1fr', gap: '1rem', height: 'calc(100vh - 140px)' }}>

        {/* Subjects panel */}
        <div className="card" style={{ overflow: 'auto', padding: '0.75rem' }}>
          <div className="font-semibold text-sm mb-2" style={{ color: 'var(--text-muted)' }}>SUBJECTS</div>
          {subjects.map(s => (
            <div key={s.id}
              className={`sidebar-link ${selectedSubject?.id === s.id ? 'active' : ''}`}
              style={{ borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', cursor: 'pointer', marginBottom: '0.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => selectSubject(s)}
            >
              <span>{s.icon}</span>
              <span className="text-sm truncate" style={{ flex: 1 }}>{s.title}</span>
              <ChevronRight size={13} />
            </div>
          ))}
        </div>

        {/* Concepts panel */}
        <div className="card" style={{ overflow: 'auto', padding: '0.75rem' }}>
          <div className="font-semibold text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
            {selectedSubject ? 'CONCEPTS' : 'SELECT SUBJECT'}
          </div>
          {concepts.map(c => (
            <div key={c.id}
              className={`sidebar-link ${selectedConcept?.id === c.id ? 'active' : ''}`}
              style={{ borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', cursor: 'pointer', marginBottom: '0.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => selectConcept(c)}
            >
              <span className="text-sm truncate" style={{ flex: 1 }}>{c.title}</span>
              <ChevronRight size={13} />
            </div>
          ))}
        </div>

        {/* Questions panel */}
        <div style={{ overflow: 'auto' }}>
          {!selectedConcept ? (
            <div className="card flex-center" style={{ height: '200px', color: 'var(--text-muted)' }}>
              Select a concept to manage questions
            </div>
          ) : (
            <>
              <div className="flex-between mb-2">
                <h2 className="font-semibold" style={{ fontSize: '1rem' }}>
                  {selectedConcept.title}
                  <span className="badge badge-neutral" style={{ marginLeft: '0.5rem' }}>{questions.length} questions</span>
                  {questions.length < 10 && <span className="badge" style={{ marginLeft: '0.25rem', background: '#FEF3C7', color: '#92400E' }}>Need {10 - questions.length} more</span>}
                </h2>
                <button className="btn btn-primary btn-sm" onClick={openAdd}>
                  <Plus size={14} /> Add Question
                </button>
              </div>

              {questions.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No questions yet. Add at least 10 to enable quizzes.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {questions.map((q, i) => (
                    <div key={q.id} className="card" style={{ padding: '1rem' }}>
                      <div className="flex-between mb-1">
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className="text-xs text-muted">Q{i + 1}</span>
                          <span className={`badge ${q.difficulty === 'EASY' ? 'badge-success' : q.difficulty === 'HARD' ? 'badge-danger' : 'badge-info'}`}
                            style={{ fontSize: '0.7rem' }}>{q.difficulty}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(q)}><Edit2 size={13} /></button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(q.id)}><Trash2 size={13} /></button>
                        </div>
                      </div>
                      <div className="font-semibold text-sm mb-1">{q.text}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {q.options?.map((opt, oi) => (
                          <span key={oi} className={`option-badge ${oi === q.correctIndex ? 'option-correct' : 'option-neutral'}`}>
                            {LETTERS[oi]}. {opt}{oi === q.correctIndex ? ' ✓' : ''}
                          </span>
                        ))}
                      </div>
                      {q.explanation && <div className="explanation-box mt-1">💡 {q.explanation}</div>}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal" style={{ width: '100%', maxWidth: 600 }}>
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Add Question' : 'Edit Question'}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal(null)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Question Text *</label>
                <textarea className="form-input" rows={3} value={form.text}
                  onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="Enter question..." />
              </div>

              <div className="form-group">
                <label className="form-label">Options (mark the correct one)</label>
                {form.options.map((opt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, correctIndex: i }))}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', border: `2px solid ${form.correctIndex === i ? 'var(--success)' : 'var(--border)'}`,
                        background: form.correctIndex === i ? 'var(--success)' : 'transparent',
                        color: form.correctIndex === i ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}
                    >
                      {form.correctIndex === i ? <Check size={14} /> : LETTERS[i]}
                    </button>
                    <input className="form-input" style={{ flex: 1 }} value={opt}
                      onChange={e => setOption(i, e.target.value)} placeholder={`Option ${LETTERS[i]}`} />
                  </div>
                ))}
                <div className="text-xs text-muted">Click the circle button to mark the correct answer</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Difficulty</label>
                  <select className="form-input" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}>
                    {DIFFICULTY.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Explanation *</label>
                <textarea className="form-input" rows={2} value={form.explanation}
                  onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} placeholder="Explain why the correct answer is right..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? <span className="loading-spinner" /> : null}
                {saving ? 'Saving…' : modal === 'add' ? 'Add Question' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
