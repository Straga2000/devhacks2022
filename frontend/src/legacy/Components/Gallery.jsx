import {ListGroup} from "react-bootstrap";

export default function Gallery(itemList) {

    return (
        <ListGroup horizontal style={{overflowY: "hidden", overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "0"}}>
            {itemList.props.map((item) => {return <ListGroup.Item style={{borderWidth: "0"}}>{item}</ListGroup.Item>})}
        </ListGroup>
    )
}