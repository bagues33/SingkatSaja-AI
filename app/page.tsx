'use client'

import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function SingkatSajaAI() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    onError: (error) => {
      console.error('Error in chat:', error)
    }
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[900px]">
        <CardHeader>
          <CardTitle>SingkatSaja AI</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <div className="w-1/2 pr-4">
            <img src="/singkatsaja.webp" alt="SingkatSaja AI" className="w-full h-auto mb-4 rounded" />
            <p className="text-lg font-semibold mb-2">
              Selamat datang di SingkatSaja AI!
            </p>
            <p className="text-sm text-gray-500">
              SingkatSaja AI adalah sebuah agen AI untuk meresume konten di media berita. Masukkan konten berita dan dapatkan ringkasannya.
            </p>
          </div>
          <div className="w-1/2 pl-4 flex flex-col justify-between">
            <div className="flex flex-col space-y-2 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div key={index} className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
                  {message.content}
                </div>
              ))}
            </div>
            <div>
            <textarea 
                value={input} 
                onChange={handleInputChange} 
                placeholder="Masukkan konten berita di sini..." 
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Button onClick={handleSubmit} disabled={isLoading} className="mt-2">
                {isLoading ? <ReloadIcon className="animate-spin" /> : 'Ringkas'}
              </Button>
              {error && (
                <Alert className="mt-2">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}