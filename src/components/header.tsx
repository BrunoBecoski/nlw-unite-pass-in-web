import { useRouter } from '../contexts/router-provider';
import { NavLink } from './buttons/nav-link';

import nlwUniteIcon from '../assets/nlw-unite-icon.svg';

export function Header() {
  const { route, changeRoute } = useRouter()

  return (
    <div className="flex items-center gap-5 py-2">
      <NavLink
        href="/"
        onClick={() => changeRoute('home')}
      >
        <img src={nlwUniteIcon} alt="NLW Unite" />
      </NavLink>
 
      <nav className="flex items-center gap-5">
        <NavLink 
          href="/eventos"
          onClick={() => changeRoute('events')}
          selected={route === 'events'}
        >
          Eventos
        </NavLink>

        <NavLink
          href="/participantes"
          onClick={() => changeRoute('attendees')}
          selected={route === 'attendees'}
        >
          Participantes
        </NavLink>

        <NavLink
          href="/criar/participante"
          onClick={() => changeRoute('createAttendee')}
          selected={route === 'createAttendee'}
        >
          Criar Participante
        </NavLink>

        <NavLink
          href="/criar/evento"
          onClick={() => changeRoute('createEvent')}
          selected={route === 'createEvent'}
        >
          Criar Evento
        </NavLink>
      </nav>
    </div>
  )
}