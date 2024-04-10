import nlwUniteIcon from "../assets/img/nlw-unite-icon.svg"
import { NavLink } from "./nav-link"

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="Logo" />

      <nav className="flex gap-5">
          <a href="" className="font-medium text-sm text-zinc-400">Eventos</a>
          <NavLink>Participantes</NavLink>
      </nav>
    </div>
  )
}