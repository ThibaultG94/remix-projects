import { useLoaderData } from "@remix-run/react";

type User = {
    id: number;
    name: string;
};

export const loader = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json() as User[];
    return users
};

const UsersPage = () => {
    const users = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;