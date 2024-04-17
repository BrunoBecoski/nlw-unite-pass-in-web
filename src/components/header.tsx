import { NavLink } from './nav-link';

import nlwUniteIcon from '../assets/nlw-unite-icon.svg';

interface HeaderProps {
  setPage: (value: string) => void
}

export function Header({ setPage }: HeaderProps) {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW Unite" />
 
      <nav className="flex items-center gap-5">
        <NavLink onClick={() => setPage('events')} href="/eventos">Eventos</NavLink>
        <NavLink onClick={() => setPage('attendees')} href="/participantes">Participantes</NavLink>
      </nav>
    </div>
  )
}