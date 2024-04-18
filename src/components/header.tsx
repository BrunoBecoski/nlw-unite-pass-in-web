import { useUrl } from '../contexts/url-provider';
import { NavLink } from './nav-link';

import nlwUniteIcon from '../assets/nlw-unite-icon.svg';

export function Header() {
  const { setPathname } = useUrl()

  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW Unite" />
 
      <nav className="flex items-center gap-5">
        <NavLink 
          onClick={() => setPathname('/eventos')}
          href="/eventos"
        >
          Eventos
        </NavLink>
        <NavLink
          onClick={() => setPathname('/participantes')}
          href="/participantes"
        >
          Participantes
        </NavLink>
      </nav>
    </div>
  )
}