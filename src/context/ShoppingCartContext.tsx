import { createContext, useContext, ReactNode, useState } from 'react'
import { ShoppingCart } from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
    children: ReactNode
}

type cartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {

    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseItemsQuantity: (id: number) => void
    decreaseItemsQuantity: (id: number) => void
    removeItems: (id: number) => void
    cartQuantity: number
    cartItems: cartItem[]
}

// tạo biến tạo context
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
    // tạo biến sử dụng context đã tạo
    return useContext(ShoppingCartContext)
}


export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [isOpen, SetIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<cartItem[]>('shopping-cart', [])




    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0)

    const openCart = () => SetIsOpen(true)
    const closeCart = () => SetIsOpen(false)

    // thêm item
    const getItemQuantity = (id: number) => cartItems.find(item => item.id === id)?.quantity || 0

    // tăng số lượng item
    const increaseItemsQuantity = (id: number) => {
        // check trong cart có item ko?
        setCartItems(currentItems => {
            // nếu trong cart chưa có item
            if (currentItems.find(item => item.id === id) == null) {
                // trả về mảng item hiện tại. trả về id và quantity thêm 1
                return [...currentItems, { id, quantity: 1 }]
                // nếu có item rồi thì check xem item đã chọn có bao nhiêu
            } else {
                return currentItems.map(item => {
                    // nếu item có rồi thì tăng quantity lên 1
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                        // nếu item chưa có thì + 1 item
                    } else {
                        return item
                    }
                })
            }
        })

    }

    // giảm số lượng item
    const decreaseItemsQuantity = (id: number) => {
        // check trong cart có item ko?
        setCartItems(currentItems => {
            // nếu có item
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                //    lọc ra những item khác với item đã chọn
                return currentItems.filter(item => item.id !== id)

            } else {
                return currentItems.map(item => {
                    // nếu item có hơn 1 thì trừ quantity xuống 1
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                        // nếu item chưa có thì giữ nguyên
                    } else {
                        return item
                    }
                })
            }
        })

    }
    // xóa item
    const removeItems = (id: number) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        // bao bọc biến tạo context bên ngoài
        <ShoppingCartContext.Provider value={{
            getItemQuantity, increaseItemsQuantity, decreaseItemsQuantity, removeItems, cartItems, cartQuantity, openCart, closeCart
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider >
    )
}
