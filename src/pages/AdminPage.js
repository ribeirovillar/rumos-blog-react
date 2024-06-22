import React, { useEffect, useState } from 'react';
import AdminService from '../services/AdminService';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './AdminPage.css';

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

function Button({ onClick, children, className }) {
    return <button onClick={onClick} className={className}>{children}</button>;
}

function UsersTable({ users, onPromote, onRevoke }) {
    return (
        <table className="usersTable">
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
                        <td className="userActions">
                            <button className="userActions" onClick={() => onPromote(user.id)}>Promote</button>
                            <button className="userActions" onClick={() => onRevoke(user.id)}>Revoke</button>
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
        <div className="adminPageContainer">
            <div>
                <div className="adminHeader">
                    <h1>Admin Page</h1>
                    <div className="actionButtons">
                        <Button className="actionButton" onClick={navigateToLanding}>Back to Landing Page</Button>
                        <Button className="logoutButton" onClick={logout}>Logout</Button>
                    </div>
                </div>

                <UsersTable users={users} onPromote={promoteUser} onRevoke={revokeUser} />
            </div>
        </div>
    );
}

export default AdminPage;