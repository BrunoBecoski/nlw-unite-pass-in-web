interface FormInputProps {
  label: string
  value?: string
  errorMessage?: string
  setValue: (value: string) => void
}

export function FormInput({ label, value, errorMessage, setValue }: FormInputProps) {
  return (
    <label>
      {label}:
      
      <input 
        className="text-black" 
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <span className="text-red-500">{errorMessage}</span>
    </label>
  )
}