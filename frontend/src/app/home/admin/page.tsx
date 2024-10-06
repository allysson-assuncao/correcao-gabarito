import ProtectedRoute from '../../../components/ProtectedRoute';

export default function Home() {
    return (
        <ProtectedRoute role={"ADMIN"}>
            <div>Admin home</div>
        </ProtectedRoute>
    );
}
