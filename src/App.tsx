import "./App.css";
import TableUsers from "./components/tableUsers";
import type { User } from "./types";
import { useEffect, useRef, useState, useMemo } from "react";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [color, setColor] = useState(false);
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState("");
  const originalUsers = useRef<User[]>([]);
  // USE REF SE USA PARA GUARDAR U COMPARTIR UN VALOR ENTRE RENDERIZADOS
  // PERO QUE AL CAMBIAR NO VUELVA A RENDERIZAR EL COMPONENTE

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((data) => data.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((error) => console.log(error));
  }, []);

  function handleColor() {
    setColor(!color);
  }

  function handleSort() {
    setSort(!sort);
  }

  function handleDelete(id: string) {
    const userFilter = users.filter((user) => user.login.md5 !== id);
    setUsers(userFilter);
  }

  function handleReset() {
    console.log(originalUsers.current);
    setUsers(originalUsers.current);
  }

  // CODIGO IMPLEMENTDADO CON USEMEMO (SE CONTROLA EN QUE MOMENTO SE DEBE VOLVER A CALCULAR CIERTO PROCESO)
  const userSorted = useMemo(() => {
    return sort
      ? [...users].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : users;
  }, [users, sort]);

  const userFiltered = useMemo(() => {
    return filter
      ? userSorted.filter((user) =>
          user.location.country
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase())
        )
      : userSorted;
  }, [filter, userSorted]);

  // CODIGO IMPLEMENTADO SIN USEMEMO (NO HAY UN CONTROL DEL NUMERO DE VECES QUE SE EJECUTAN LOS PROCESOS)
  // const userSorted = sort
  //   ? [...users].sort((a, b) => {
  //       return a.location.country.localeCompare(b.location.country);
  //     })
  //   : users;

  // const userFiltered = filter
  //   ? userSorted.filter((user) =>
  //       user.location.country
  //         .toLocaleLowerCase()
  //         .includes(filter.toLocaleLowerCase())
  //     )
  //   : userSorted;

  return (
    <div>
      <header>
        <button onClick={handleColor}>Colorear Filas</button>
        <button onClick={handleSort}>Ordenar por Pais</button>
        <button onClick={handleReset}>Restaurar</button>
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="INGRESA EL PAIS"
        />
      </header>
      <TableUsers
        users={userFiltered}
        color={color}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
