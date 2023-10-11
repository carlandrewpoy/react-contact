import { Button, Toast } from "flowbite-react"
import { useState, useEffect } from "react"
import { HiFire } from "react-icons/hi"

export default function CustomDismissal() {
  const [showToast, setShowToast] = useState(false)

  // Function to close the toast
  const closeToast = () => {
    setShowToast(false)
  }

  // Use useEffect to automatically close the toast after 2 seconds when it's shown
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(closeToast, 2000)
      return () => clearTimeout(timer) // Clear the timer if the component unmounts or the showToast state changes
    }
  }, [showToast])

  return (
    <div className="space-y-4">
      <Button onClick={() => setShowToast(!showToast)}>Toggle toast</Button>
      {showToast && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiFire className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Set yourself free.</div>
          <Toast.Toggle onDismiss={closeToast} />
        </Toast>
      )}
    </div>
  )
}
