import type { User } from "../types";

interface Pros {
  users: User[];
  color: boolean;
  handleDelete: (id: string) => void;
}

export default function TableUsers({ users, color, handleDelete }: Pros) {
  return (
    <main>
      <table style={{ width: "100%", marginTop: "50px" }}>
        <thead>
          <th>FOTO</th>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>PAIS</th>
          <th>ACCIONES</th>
        </thead>
        <tbody className={color ? "setColor" : ""}>
          {users.map((user) => {
            return (
              <tr key={user.login.md5}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => handleDelete(user.login.md5)}>
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
