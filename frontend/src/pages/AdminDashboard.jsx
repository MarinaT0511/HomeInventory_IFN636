import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserList from "../components/UserList";

function AdminDashboard() {
    const handleSubmit = async (e) => {

    };
    return (
        <div class>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">Downloaded</Card.Subtitle>
                                    <Card.Title>10K</Card.Title>
                                    <Card.Text>
                                        +0.3% in this week
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">Current Users</Card.Subtitle>
                                    <Card.Title>10K</Card.Title>
                                    <Card.Text>
                                        +0.3% in this week
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Admin feature: User Management */}
            <div>
                <h1>User Management</h1>
                <div style={{ padding: "40px" }}>
                    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                            Add New Item
                        </button>
                    </form>
                    <UserList />
                </div>
            </div>
            {/* Admin feature: Category Management (Under Construction) */}
            <div>
                <h1>Category Management (Under Construction)</h1>
                <div style={{ padding: "40px" }}>
                    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                            Add New Item
                        </button>
                    </form>
                </div>
            </div>

        </div >
    );
}

export default AdminDashboard;