import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addPizza, CartItem } from "../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
const localTypes = ["тонкое", "традиционное"];
const localSizes = [26, 30, 40];

type PizzaItemType = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    rating: number;
    sizes: number[];
    types: number[];
    priceAll: number[];
};

const PizzaItem: React.FC<PizzaItemType> = ({
    id,
    imageUrl,
    name,
    price,
    rating,
    sizes,
    types,
    priceAll,
}) => {
    const [activeSize, setActiveSize] = React.useState(sizes[0]);
    const [activeType, setActiveType] = React.useState(types[0]);
    const dispatch = useAppDispatch()
    const cartItem = useAppSelector((state) =>
        state.cart.items.find(
            (obj) =>
                obj.unique === `${activeSize}${localTypes[activeType]}${id}`
        )
    );
    const addedCount = cartItem ? cartItem.totalCount : 0;
    const onAddPizza = () => {
        const item: CartItem = {
            id,
            imageUrl,
            name,
            price: priceAll[activeSize],
            size: activeSize,
            type: localTypes[activeType],
            totalCount: 0,
            totalPrice: 0,
            unique: '',
        };
        dispatch(addPizza(item));
    };

    return (
        <div className="pizza-block">
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {localTypes.map((type, index) => (
                        <li
                            key={type}
                            className={classNames({
                                active: activeType === index,
                                disabled: !types.includes(index),
                            })}
                            onClick={() => setActiveType(index)}
                        >
                            {localTypes[index]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {localSizes.map((size) => (
                        <li
                            key={size}
                            className={classNames({
                                active: activeSize === size,
                                disabled: !sizes.includes(size),
                            })}
                            onClick={() => setActiveSize(size)}
                        >
                            {size} см.
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">
                    {priceAll?.[activeSize]} ₽
                </div>
                <div
                    onClick={onAddPizza}
                    className="button button--outline button--add"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </div>
            </div>
        </div>
    );
};

export default PizzaItem;
