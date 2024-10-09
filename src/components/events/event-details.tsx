import { useRouter } from "../../contexts/router-provider"

export function EventDetails() {
  const { slug } = useRouter()
  return (
    <h1>Detalhes do evento {slug}</h1>
  )
}