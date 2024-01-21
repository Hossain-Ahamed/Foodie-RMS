import React from "react";
import { Pagination } from "@nextui-org/react";

export default function CategoryPagination({size}) {
    return (
        <Pagination showControls total={size.length} initialPage={1} />
    );
}
