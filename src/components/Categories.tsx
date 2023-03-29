const categories = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

type CategoriesProps = {
    activeCategory: number | null;
    onActiveCategory: (a: number | null) => void;
    setCurrentPage: (a: number) => void;
};
const Categories: React.FC<CategoriesProps> = ({
    activeCategory,
    onActiveCategory,
    setCurrentPage,
}) => {
    return (
        <div className="categories">
            <ul>
                <li
                    className={activeCategory === null ? "active" : ""}
                    onClick={() => onActiveCategory(null)}
                >
                    Все
                </li>
                {categories.map((item, index) => (
                    <li
                        key={item}
                        onClick={() => {
                            onActiveCategory(index);
                            setCurrentPage(1);
                        }}
                        className={activeCategory === index ? "active" : ""}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
