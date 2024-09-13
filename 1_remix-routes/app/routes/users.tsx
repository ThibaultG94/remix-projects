import { Link, Outlet, useLoaderData } from "@remix-run/react";

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
        <div className="flex py-2 gap-x-4">
            <div>
                <h1 className="text-3xl">Liste des utilisateurs</h1>
                <ul>
                    {users.map((user) => (
                        <Link key={user.id} className="flex" to={`/users/${user.id}`}>{user.name}</Link>
                    ))}
                </ul>
            </div>
            <Outlet />
        </div>
    );
};

export default UsersPage;