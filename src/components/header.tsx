import { useRouter } from '../contexts/router-provider';
import { NavLink } from './nav-link';

import nlwUniteIcon from '../assets/nlw-unite-icon.svg';

export function Header() {
  const { currentRoute, toHome, toEvents, toAttendees } = useRouter()

  return (
    <div className="flex items-center gap-5 py-2">
      <NavLink
        href="/"
        onClick={toHome}
      >
        <img src={nlwUniteIcon} alt="NLW Unite" />
      </NavLink>
 
      <nav className="flex items-center gap-5">
        <NavLink 
          href="/eventos"
          onClick={toEvents}
          selected={currentRoute === 'events'}
        >
          Eventos
        </NavLink>

        <NavLink
          href="/participantes"
          onClick={toAttendees}
          selected={currentRoute === 'attendees'}
        >
          Participantes
        </NavLink>
      </nav>
    </div>
  )
}