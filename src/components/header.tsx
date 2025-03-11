import { useRouter } from '../contexts/router-provider';
import { NavLink } from './nav-link';

import nlwUniteIcon from '../assets/nlw-unite-icon.svg';

export function Header() {
  const { route, changeRoute } = useRouter()

  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW Unite" />
 
      <nav className="flex items-center gap-5">
        <NavLink 
          href="/eventos"
          onClick={() => changeRoute({ route: 'events' })}
          selected={route === 'events'}
        >
          Eventos
        </NavLink>

        <NavLink
          href="/participantes"
          onClick={() => changeRoute({ route: 'attendees' })}
          selected={route === 'attendees'}
        >
          Participantes
        </NavLink>

        <NavLink
          href="/criar/evento"
          onClick={() => changeRoute({ route: 'createEvent' })}
          selected={route === 'createEvent'}
        >
          Criar Evento
        </NavLink>

        <NavLink
          href="/criar/participante"
          onClick={() => changeRoute({ route: 'createAttendee' })}
          selected={route === 'createAttendee'}
        >
          Criar Participante
        </NavLink>
      </nav>
    </div>
  )
}