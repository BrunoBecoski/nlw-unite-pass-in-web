interface FormInputProps {
  label: string
  value?: string
  errorMessage?: string
  setValue: (value: string) => void
}

export function FormInput({ label, value, errorMessage, setValue }: FormInputProps) {
  return (
    <label className="flex flex-col gap-2 ">
      {label}
      
      <input 
        className="bg-transparent border border-white/50 p-2 text-sm rounded-md
          focus:border-orange-400 
        " 
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <span className="text-red-500 text-right">{errorMessage}</span>
    </label>
  )
}