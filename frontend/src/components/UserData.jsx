import React, { useEffect, useState } from "react";

const UserData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="user-list">
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userID}>
              <td>{u.userID}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.contactNumber}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
