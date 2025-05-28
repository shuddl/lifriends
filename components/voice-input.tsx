'use client'

import { useEffect, useState } from 'react'

interface VoiceInputProps {
  onText: (text: string) => void
}

export default function VoiceInput({ onText }: VoiceInputProps) {
  const [listening, setListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (SpeechRecognition) {
      const rec = new SpeechRecognition()
      rec.continuous = false
      rec.lang = 'en-US'
      rec.onresult = (e: SpeechRecognitionEvent) => {
        const text = e.results[0][0].transcript
        onText(text)
        setListening(false)
      }
      rec.onend = () => setListening(false)
      setRecognition(rec)
    }
  }, [onText])

  const toggle = () => {
    if (!recognition) return
    if (listening) {
      recognition.stop()
    } else {
      recognition.start()
      setListening(true)
    }
  }

  return (
    <button type="button" onClick={toggle} className="px-2 py-1 border rounded">
      {listening ? 'Stop' : 'Speak'}
    </button>
  )
}
