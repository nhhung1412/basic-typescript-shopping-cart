
import { Card, Button } from 'react-bootstrap'
import formatCurrency from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'

type CardItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

const CardItem = ({ id, name, price, imgUrl }: CardItemProps) => {

    const {
        getItemQuantity,
        increaseItemsQuantity,
        decreaseItemsQuantity,
        removeItems
    } = useShoppingCart()

    const quantity = getItemQuantity(id)

    return (
        <Card>
            <Card.Img
                variant='top'
                src={imgUrl}
                style={{ height: "200px", objectFit: "cover" }} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='fs-3'>{name}</span>
                    <span className='ms-3 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 0 ? (
                        <Button className='w-100' onClick={() => increaseItemsQuantity(id)}>
                            <span><i className="fa-solid fa-cart-plus"></i></span>
                            <span className='text-capitalize'> Add to cart</span>
                        </Button>
                    ) : (
                        <div className='d-flex flex-column justify-content-center align-items-center' style={{ gap: '0.5rem' }}>
                            <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                                <Button onClick={() => decreaseItemsQuantity(id)}><i className="fa-solid fa-minus"></i></Button>
                                <div><span className='fs-3'>{quantity}</span> in cart</div>
                                <Button onClick={() => increaseItemsQuantity(id)}><i className="fa-solid fa-plus"></i></Button>
                            </div>
                            <Button onClick={() => removeItems(id)} className='btn-danger btn-sm'>Remove</Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardItem