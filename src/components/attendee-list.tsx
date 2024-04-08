import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"

export function AttendeeList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 w-72 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input className="bg-transparent text-sm flex-1 outline-none border-0 p-0 focus:ring-0" placeholder="Buscar participante..." />
        </div>
      </div>

      <div className="border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-sm font-semibold text-left">
                <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-orange-400" />
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Código</th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Participante</th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Data de inscrição</th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Data do check-in</th>
              <th className="py-3 px-4 text-sm font-semibold text-left"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-sm text-zinc-500 w-16">
                    <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-orange-400 focus:ring-2" />
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-500">1238</td>
                  <td className="py-3 px-4 text-sm text-zinc-500">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-zinc-300">Tiago Andrade</span>
                      <span>tiagoandradedejoao@gmail.com</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-500">7 dias atrás</td>
                  <td className="py-3 px-4 text-sm text-zinc-500">3 dias atrás</td>
                  <td className="py-3 px-4 text-sm text-zinc-500 w-16">
                    <button className="bg-black/20 border-white/10 rounded-md p-1.5">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-3 px-4 text-sm text-zinc-500" colSpan={3}>
                Mostrando 10 de 228 itens
              </td>
              <td className="py-3 px-4 text-sm text-zinc-500 text-right" colSpan={3}>
                <div className="inline-flex items-center gap-8">
                  <span>Página 1 de 23</span>

                  <div className="flex gap-1.5">
                    <button className="bg-white/10 border-white/10 rounded-md p-1.5">
                      <ChevronsLeft className="size-4" />
                    </button>
                    <button className="bg-white/10 border-white/10 rounded-md p-1.5">
                      <ChevronLeft className="size-4" />
                    </button>
                    <button className="bg-white/10 border-white/10 rounded-md p-1.5">
                      <ChevronRight className="size-4" />
                    </button>
                    <button className="bg-white/10 border-white/10 rounded-md p-1.5">
                      <ChevronsRight className="size-4" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
