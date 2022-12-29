import storeItems from "../data/items.json"
import { Row, Col } from "react-bootstrap"
import CardItem from '../components/CardItem'

const Store = () => {
    return (
        <>
            <div>Store</div>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map((item) => (
                    <Col key={item.id}>
                        <CardItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Store