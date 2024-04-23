import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import relativeTime from "dayjs/plugin/relativeTime"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableCell } from "./table/table-cell"
import { TableRow } from "./table/table-row"
import { ChangeEvent, useEffect, useState } from "react"
import { api } from "../services/api"

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface Attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    return url.searchParams.get("search") ?? ""
  })

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    const page = url.searchParams.get("page")
    return page ? Number(page) : 1
  })

  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [total, setTotal] = useState(0)

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const params = new URLSearchParams()
    params.set("pageIndex", String(page - 1))

    if (search.length) {
      params.set("query", search)
    }

    api.get("events/3a123da9-e45b-46d0-ab8f-1d993a040e11/attendees", {
      params: params,
    })
      .then(response => {
        setAttendees(response.data.attendees)
        setTotal(response.data.total)
      })
  }, [page, search])

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set("page", String(page))

    window.history.pushState({}, "", url)
    setPage(page)
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set("query", search)

    window.history.pushState({}, "", url)
    setSearch(search)
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
  }
  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }
  function goToFirstPage() {
    setCurrentPage(1)
  }
  function goToLastPage() {
    setCurrentPage(page + 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 w-72 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent text-sm flex-1 outline-none border-0 p-0 focus:ring-0"
            placeholder="Buscar participante..."
            value={search}
            onChange={onSearchInputChanged}
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader className="w-12">
              <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-orange-400 focus:ring-2" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader className="w-16" />
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => {
            return (
              <TableRow key={attendee.id}>
                <TableCell style={{ width: 48 }}>
                  <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10 text-orange-400 focus:ring-orange-400 focus:ring-2" />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-zinc-300">
                      {attendee.name}
                    </span>
                    <span>
                      {attendee.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt
                    ? dayjs().to(attendee.checkedInAt)
                    : <span className="text-zinc-700">não realizado</span>}
                </TableCell>
                <TableCell style={{ width: 64 }}>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} {total === 1 ? "item": "itens"}
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>Página {page} de {totalPages}</span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
