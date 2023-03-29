import React, { useRef } from "react";
import { Categories, FakePizza, PizzaItem, SortPopup } from "../components";
import qs from "qs";
import Pagination from "../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { sorts } from "../components/SortPopup";
import {
    setCategory,
    setSort,
    setCurrentPage,
    setFilters,
    sortType,
    setSearchValue,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const limit = 4;

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const { activeCategory, activeSort, currentPage, totalPages, searchValue } =
        useAppSelector((state) => state.filter);
    const { items, status } = useAppSelector((state) => state.pizza);
    const isMounted = useRef(false);

    const getPizzas = async () => {
        dispatch(
            fetchPizzas({
                activeCategory,
                activeSort,
                searchValue,
                currentPage,
                limit,
            })
        );
    };

    React.useEffect(() => {
        if (isMounted.current) {
            const query = qs.stringify(
                {
                    sort: activeSort.field,
                    sortOrder: activeSort.order,
                    category: activeCategory,
                    currentPage,
                },
                { addQueryPrefix: true }
            );
            navigate(`${query}`);
        }
        isMounted.current = true;
    }, [activeCategory, activeSort, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const cat = params.category === "" ? null : Number(params.category);
            const sort = sorts.find(
                (obj) =>
                    obj.field === params.sort && obj.order === params.sortOrder
            );
            if (sort) {
                dispatch(
                    setFilters({
                        searchValue: "",
                        activeCategory: cat,
                        activeSort: sort,
                        currentPage,
                        totalPages,
                    })
                );
            }
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }
        window.scrollTo(0, 0);
        isSearch.current = false;
    }, [activeCategory, activeSort, currentPage, searchValue]);

    const onActiveCategory = (category: number | null) => {
        dispatch(setCategory(category));
        dispatch(setSearchValue(''))
    };

    const changePage = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
    };

    const onActiveSort = (category: sortType) => {
        dispatch(setSort(category));
    };
    
    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories
                        activeCategory={activeCategory}
                        onActiveCategory={onActiveCategory}
                        setCurrentPage={changePage}
                    />
                    <SortPopup
                        activeSort={activeSort}
                        onActiveSort={onActiveSort}
                        setCurrentPage={changePage}
                    />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {status === "loading"
                        ? Array(10)
                              .fill(0)
                              .map((_, index) => <FakePizza key={index} />)
                        : items?.map((pizza: any) => (
                              <PizzaItem key={pizza.id} {...pizza} />
                          ))}
                </div>
                {totalPages > 1 && (
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        changePage={changePage}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
