import React, { useEffect, useState } from 'react';
import AdminService from '../services/AdminService';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function useUsers() {
    const [users, setUsers] = useState([]);
    const adminService = new AdminService();

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        const response = await adminService.getAllUsers();
        setUsers(response.data);
    }

    async function promoteUser(userId) {
        await adminService.promoteUserToAdmin(userId);
        fetchUsers();
    }

    async function revokeUser(userId) {
        await adminService.revokeAdminFromUser(userId);
        fetchUsers();
    }

    return { users, promoteUser, revokeUser };
}

function useNavigation() {
    const navigate = useNavigate();
    const authService = new AuthService();

    async function logout() {
        authService.logout();
        navigate('/login');
    }

    async function navigateToLanding() {
        navigate('/landing');
    }

    return { logout, navigateToLanding };

}

function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}

function UsersTable({ users, onPromote, onRevoke }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.roles.join(', ')}</td>
                        <td>
                            <Button onClick={() => onPromote(user.id)}>Promote to Admin</Button>
                            <Button onClick={() => onRevoke(user.id)}>Revoke Admin</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function AdminPage() {
    const { users, promoteUser, revokeUser } = useUsers();
    const { logout, navigateToLanding } = useNavigation();

    return (
        <div>
            <h1>Admin Page</h1>
            <Button onClick={navigateToLanding}>Back to Landing Page</Button>
            <Button onClick={logout}>Logout</Button>
            <UsersTable users={users} onPromote={promoteUser} onRevoke={revokeUser} />
        </div>
    );
}

export default AdminPage;