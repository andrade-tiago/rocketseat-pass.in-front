import nlwUniteIcon from "../assets/img/nlw-unite-icon.svg"

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="Logo" />

      <nav>
        <ul className="flex gap-5">
          <li><a href="" className="font-medium text-sm text-zinc-400">Eventos</a></li>
          <li><a href="" className="font-medium text-sm">Participantes</a></li>
        </ul>
      </nav>
    </div>
  )
}