import ProtectedRoute from '../../../components/ProtectedRoute';

export default function Home() {
    return (
        <ProtectedRoute roles={["ADMIN"]}>
            <div>Admin home</div>
        </ProtectedRoute>
    );
}
