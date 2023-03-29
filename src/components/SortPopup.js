// import { useEffect, useRef, useState } from "react";
// import { sortType } from "../redux/slices/filterSlice";

// export const sorts: sortType[] = [
//     { name: "популярности 🠕", field: "rating", order: "asc" },
//     { name: "популярности 🠗", field: "rating", order: "desc" },
//     { name: "цене 🠕", field: "price", order: "asc" },
//     { name: "цене 🠗", field: "price", order: "desc" },
//     { name: "алфавиту 🠕", field: "name", order: "asc" },
//     { name: "алфавиту 🠗", field: "name", order: "desc" },
// ];

// type SortPopupType = {
//     activeSort: sortType;
//     onActiveSort: (a: sortType) => void;
//     setCurrentPage: (a: number) => void;
// };

// function SortPopup({
//     activeSort,
//     onActiveSort,
//     setCurrentPage,
// }: SortPopupType) {
//     const [popupOpen, setPopupOpen] = useState(false);
//     const sortRef = useRef<HTMLSpanElement>(null);

//     useEffect(() => {
//         const handleOutsideClick = (e: MouseEvent) => {
//             const _e = e as MouseEvent & { path: Node[] };
//             if (sortRef.current && !_e.path.includes(sortRef.current))
//                 setPopupOpen(false);
//         };

//         document.body.addEventListener("click", handleOutsideClick);

//         return () =>
//             document.body.removeEventListener("click", handleOutsideClick);
//     }, []);

//     return (
//         <div className="sort">
//             <div className="sort__label">
//                 <svg
//                     className={popupOpen ? "rotated" : ""}
//                     width="10"
//                     height="6"
//                     viewBox="0 0 10 6"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path
//                         d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
//                         fill="#2C2C2C"
//                     />
//                 </svg>
//                 <b>Сортировка по:</b>
//                 <span ref={sortRef} onClick={() => setPopupOpen(!popupOpen)}>
//                     {activeSort.name}
//                 </span>
//             </div>
//             {popupOpen && (
//                 <div className="sort__popup">
//                     <ul>
//                         {sorts.map((sort) => (
//                             <li
//                                 key={sort.name}
//                                 onClick={() => {
//                                     onActiveSort(sort);
//                                     setCurrentPage(1);
//                                 }}
//                                 className={
//                                     activeSort.name === sort.name
//                                         ? "active"
//                                         : ""
//                                 }
//                             >
//                                 {sort.name}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SortPopup;
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../redux/slices/filterSlice";
// import { sortType } from "../redux/slices/filterSlice";

export const sorts = [
    { name: "популярности 🠕", field: "rating", order: "asc" },
    { name: "популярности 🠗", field: "rating", order: "desc" },
    { name: "цене 🠕", field: "price", order: "asc" },
    { name: "цене 🠗", field: "price", order: "desc" },
    { name: "алфавиту 🠕", field: "name", order: "asc" },
    { name: "алфавиту 🠗", field: "name", order: "desc" },
];

function SortPopup({activeSort, onActiveSort, setCurrentPage}) {
    const dispatch = useDispatch()
    const [popupOpen, setPopupOpen] = useState(false);
    const sortRef = useRef();
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.composedPath().includes(sortRef.current)) setPopupOpen(false);
        };
        document.body.addEventListener("click", handleOutsideClick);

        return () =>
            document.body.removeEventListener("click", handleOutsideClick);
    }, []);
    return (
        <div className="sort">
            <div className="sort__label">
                <svg
                    className={popupOpen ? "rotated" : ""}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span ref={sortRef} onClick={() => setPopupOpen(!popupOpen)}>
                    {activeSort.name}
                </span>
            </div>
            {popupOpen && (
                <div className="sort__popup">
                    <ul>
                        {sorts.map((sort) => (
                            <li
                                key={sort.name}
                                onClick={() => {
                                    onActiveSort(sort);
                                    setCurrentPage(1);
                                    dispatch(setSearchValue(''))
                                    
                                }}
                                className={
                                    activeSort.name === sort.name
                                        ? "active"
                                        : ""
                                }
                            >
                                {sort.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SortPopup;
