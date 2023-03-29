import { useMemo } from "react";
import cl from "./Pagination.module.scss";
import { getPagesArray } from "../../utils/pages";

type PaginationType = {
    totalPages: number;
    page: number;
    changePage: (a: number) => void;
};
const Pagination: React.FC<PaginationType> = ({
    totalPages,
    page,
    changePage,
}) => {
    let pagesArray = useMemo(() => getPagesArray(totalPages), [totalPages]);

    return (
        <div className={cl.page__wrapper}>
            {pagesArray?.map((p) => (
                <span
                    onClick={() => changePage(p + 1)}
                    key={p}
                    className={
                        page - 1 === p
                            ? `${cl.page__current} ${cl.page}`
                            : `${cl.page}`
                    }
                >
                    {p + 1}
                </span>
            ))}
        </div>
    );
};

export default Pagination;
