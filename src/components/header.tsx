import { useRouter } from '../contexts/router-provider';
import { NavLink } from './nav-link';

import nlwUniteIcon from '../assets/nlw-unite-icon.svg';

export function Header() {
  const { route, setRoute } = useRouter()

  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW Unite" />
 
      <nav className="flex items-center gap-5">
        <NavLink 
          onClick={() => setRoute('/eventos')}
          href="/eventos"
          selected={route === '/eventos'}
        >
          Eventos
        </NavLink>
        <NavLink
          onClick={() => setRoute('/evento/unite-summit/participantes')}
          href="/participantes"
          selected={route === '/evento/unite-summit/participantes'}
        >
          Participantes
        </NavLink>
      </nav>
    </div>
  )
}