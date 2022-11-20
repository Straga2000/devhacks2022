import {Container, Row} from "react-bootstrap";

function Error()
{
    return (
        <Container className="flex w-100">
            <Row style={{height: "350px"}}/>
            <Row style={{justifyContent: "center", justifyItems: "center", display: "grid"}}>
                <h3 style={{color: "white"}}>
                    The page you were looking for was not found
                </h3>
                <h2 className="glow">Error 404</h2>
            </Row>
        </Container>
            )
}

export default Error