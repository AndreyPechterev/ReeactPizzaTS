import React,{useEffect} from "react";
import cl from "./Search.module.scss";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useAppDispatch } from "../../redux/store";
import { useLocation } from "react-router-dom";
const Search: React.FC = () => {
    const dispatch = useAppDispatch();
    const [localSearch, setLocalSearch] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);
const location = useLocation();
    const onClickClear = () => {
        setLocalSearch("");
        inputRef.current?.focus();
        dispatch(setSearchValue(""));
    };

    useEffect(() => {
      setLocalSearch('')
    }, [location])
    

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value
        setLocalSearch(value);
        updateSearchValue(value);
    };

    const updateSearchValue = React.useCallback(
        debounce((value: string) => {
            dispatch(setSearchValue(value));
        }, 1000),
        []
    );

    return (
        <div className={cl.root}>
            <svg
                className={cl.icon}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title />
                <g id="search">
                    <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
                </g>
            </svg>
            <input
                ref={inputRef}
                className={cl.input}
                placeholder="Поиск пиццы"
                value={localSearch}
                onChange={onChangeInput}
            />

            {localSearch && (
                <svg
                    onClick={onClickClear}
                    viewBox="0 0 32 32"
                    className={cl.clear}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title />
                    <g data-name="Layer 2" id="Layer_2">
                        <path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z" />
                        <path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
                    </g>
                </svg>
            )}
        </div>
    );
};

export default Search;
