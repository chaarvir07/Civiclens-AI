import { useRef, useState } from 'react'
import { Upload, X, Image } from 'lucide-react'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 10 * 1024 * 1024

export default function ImageUpload({ onImageSelect, onImageRemove }) {
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const processFile = (file) => {
    setError('')
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('File must be JPG, PNG, or WEBP.')
      return
    }
    if (file.size > MAX_SIZE) {
      setError('File size exceeds 10 MB limit. Please compress the image.')
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    setFileName(file.name)
    setFileSize((file.size / 1024 / 1024).toFixed(1) + ' MB')
    onImageSelect(file)
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const handleRemove = () => {
    setPreview(null)
    setFileName('')
    setFileSize('')
    setError('')
    if (inputRef.current) inputRef.current.value = ''
    onImageRemove?.()
  }

  if (preview) {
    return (
      <div className="border border-slate-200 rounded-xl p-4 bg-white">
        <div className="flex items-start gap-4">
          <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg object-cover border border-slate-200 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{fileName}</p>
            <p className="text-xs text-slate-500 mt-1">{fileSize}</p>
            <p className="text-xs text-emerald-600 mt-1">✓ Image ready for analysis</p>
          </div>
          <button onClick={handleRemove} className="text-slate-400 hover:text-red-500 transition-colors p-1 shrink-0">
            <X size={18} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          dragging ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload size={22} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Drag & drop or click to upload</p>
            <p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP — max 10 MB</p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  )
}
